import { NgModule, InjectionToken } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { BungieAuthInterceptor } from './bungie-auth.interceptor'
import { BungieOAuthStorage } from './bungie-auth.storage'

export const OAuthBungieService = new InjectionToken('bungie service')

@NgModule({
  declarations: [],
  imports: [CommonModule, OAuthModule.forRoot()],
  providers: [
    BungieOAuthStorage,
    {
      provide: OAuthBungieService,
      useClass: OAuthService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BungieAuthInterceptor,
      multi: true,
    },
  ],
})
export class BungieAuthModule {}
