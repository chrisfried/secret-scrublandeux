import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks'
import { BehaviorSubject } from 'rxjs'
import { environment } from '../../environments/environment'
import { OAuthBungieService } from './bungie-auth.module'
import { BungieOAuthStorage } from './bungie-auth.storage'

@Injectable({
  providedIn: 'root',
})
export class BungieAuthService {
  hasValidAccessToken$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(OAuthBungieService) private oAuthService: OAuthService,
    private route: ActivatedRoute
  ) {
    this.oAuthService.setStorage(new BungieOAuthStorage())
    this.oAuthService.configure({
      issuer: 'https://www.bungie.net/en/OAuth/Authorize',
      loginUrl: 'https://www.bungie.net/en/OAuth/Authorize',
      tokenEndpoint: 'https://www.bungie.net/Platform/App/OAuth/token/',
      redirectUri: environment.bungie.redirect,
      clientId: environment.bungie.clientId,
      responseType: 'code',
      scope: '',
    })
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler()
    this.tryLogin()
  }

  async tryLogin() {
    this.route.queryParams.subscribe(async (url) => {
      if (url.state && url.state === localStorage.getItem('bungie-nonce')) {
        await this.oAuthService.tryLoginCodeFlow()
      }
      if (this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.setupAutomaticSilentRefresh()
        this.hasValidAccessToken$.next(true)
      }
    })
  }

  async login() {
    await this.oAuthService.createAndSaveNonce()
    this.document.location.href = `https://www.bungie.net/en/OAuth/Authorize?response_type=code&client_id=${
      environment.bungie.clientId
    }&state=${localStorage.getItem('bungie-nonce')}`
  }

  logout() {
    this.oAuthService.logOut()
    this.hasValidAccessToken$.next(false)
  }
}
