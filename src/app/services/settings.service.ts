import { Injectable } from '@angular/core'
import { UserInfoCard } from 'bungie-api-ts/user'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class SettingsService {
  private _dark: boolean

  public activeProfiles: BehaviorSubject<UserInfoCard[]>
  public userLang: {
    language?: string
  }
  public userLangObs: BehaviorSubject<{
    language?: string
  }>
  public dark: BehaviorSubject<boolean>

  constructor() {
    if (localStorage.getItem('gt.DARK') !== null) {
      this._dark = JSON.parse(localStorage.getItem('gt.DARK')) || false
    } else {
      this._dark = true
    }

    this.activeProfiles = new BehaviorSubject([])
    this.dark = new BehaviorSubject(this._dark)

    this.userLang = {
      language: 'en',
    }
    if (JSON.parse(localStorage.getItem('gt.LANGUAGE'))) {
      this.userLang = JSON.parse(localStorage.getItem('gt.LANGUAGE'))
    } else if (navigator.language) {
      switch (navigator.language.substr(0, 2)) {
        case 'fr':
          this.userLang.language = 'fr'
          break
        case 'es':
          this.userLang.language = 'es'
          break
        case 'de':
          this.userLang.language = 'de'
          break
        case 'it':
          this.userLang.language = 'it'
          break
        case 'ja':
          this.userLang.language = 'ja'
          break
        case 'pt':
          this.userLang.language = 'pt-br'
          break
        case 'ru':
          this.userLang.language = 'ru'
          break
        case 'pl':
          this.userLang.language = 'pl'
          break
        case 'ko':
          this.userLang.language = 'pl'
          break
        case 'zh':
          this.userLang.language = 'zh-cht'
          break
      }
      switch (navigator.language) {
        case 'es-mx':
          this.userLang.language = 'es-mx'
          break
        case 'zh-chs':
          this.userLang.language = 'zh-chs'
          break
      }
    }
    this.userLangObs = new BehaviorSubject(this.userLang)
  }

  toggleDark() {
    this._dark = !this._dark
    this.dark.next(this._dark)
    localStorage.setItem('gt.DARK', JSON.stringify(this._dark))
  }

  set setLanguage(language) {
    this.userLang.language = language
    localStorage.setItem('gt.LANGUAGE', JSON.stringify(this.userLang))
    this.userLangObs.next(this.userLang)
  }
}
