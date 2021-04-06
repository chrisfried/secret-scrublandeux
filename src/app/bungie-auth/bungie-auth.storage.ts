import { OAuthStorage } from 'angular-oauth2-oidc'
import { Injectable } from '@angular/core'

@Injectable()
export class BungieOAuthStorage extends OAuthStorage {
  getItem(key: string) {
    return localStorage.getItem(`bungie-${key}`)
  }
  removeItem(key: string) {
    return localStorage.removeItem(`bungie-${key}`)
  }
  setItem(key: string, value: string) {
    return localStorage.setItem(`bungie-${key}`, value)
  }
}
