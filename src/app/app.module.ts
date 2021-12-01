import { HttpClientModule } from '@angular/common/http'
import { LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxIndexedDBModule } from 'ngx-indexed-db'
import { AppComponent } from './app.component'
import { BungieAuthModule } from './bungie-auth/bungie-auth.module'
import { BungieStatusComponent } from './bungie-status/bungie-status.component'
import { FooterComponent } from './footer/footer.component'
import { FrontPageComponent } from './front-page/front-page.component'
import { DayModalComponent } from './guardian/day-modal/day-modal.component'
import { GuardianComponent } from './guardian/guardian.component'
import { Guardian3DComponent } from './guardian3d/guardian3d.component'
import { ManifestPipe } from './manifest/manifest.pipe'
import { NavComponent } from './nav/nav.component'
import { ActivitiesTotalHoursPipe } from './pipes/activities-total-hours.pipe'
import { ActivitiesTotalTimePipe } from './pipes/activities-total-time.pipe'
import { AddTimePipe } from './pipes/add-time.pipe'
import { CurrentStreakPipe } from './pipes/current-streak.pipe'
import { HoursPlayedPipe } from './pipes/hours-played.pipe'
import { LoadingReducePipe } from './pipes/loading-reduce.pipe'
import { LongestStreaksPipe } from './pipes/longest-streaks.pipe'
import { MilestonePipe } from './pipes/milestone.pipe'
import { ParseMinutesPlayedPipe } from './pipes/parse-minutes-played.pipe'
import { RoutesModule } from './routes/routes.module'
import { registerLocaleData } from '@angular/common'
import localeEn from '@angular/common/locales/en'
import localeFr from '@angular/common/locales/fr'
import localeEs from '@angular/common/locales/es'
import localePtBr from '@angular/common/locales/pt'
import localeZhCht from '@angular/common/locales/zh'
import localeZhChs from '@angular/common/locales/zh'
import localeDe from '@angular/common/locales/de'
import localeJa from '@angular/common/locales/ja'
import localeKo from '@angular/common/locales/ko'
import localeIt from '@angular/common/locales/it'
import localeRu from '@angular/common/locales/ru'
import localePl from '@angular/common/locales/pl'
// import { SearchComponent } from './search/search.component'

let lang = 'en'
registerLocaleData(localeEn)
navigator.languages.some((l) => {
  switch (l.toLowerCase()) {
    case 'pt-br':
      registerLocaleData(localePtBr)
      lang = l
      return true
    case 'zh-cht':
      registerLocaleData(localeZhCht)
      lang = l
      return true
    case 'zh-chs':
      registerLocaleData(localeZhChs)
      lang = l
      return true
    case 'fr':
      registerLocaleData(localeFr)
      lang = l
      return true
    case 'es':
      registerLocaleData(localeEs)
      lang = l
      return true
    case 'de':
      registerLocaleData(localeDe)
      lang = l
      return true
    case 'it':
      registerLocaleData(localeIt)
      lang = l
      return true
    case 'ja':
      registerLocaleData(localeJa)
      lang = 'ja'
      return true
    case 'ru':
      registerLocaleData(localeRu)
      lang = l
      return true
    case 'pl':
      registerLocaleData(localePl)
      lang = l
      return true
    case 'ko':
      registerLocaleData(localeKo)
      lang = l
      return true
  }
  switch (l.toLowerCase().split('-')[0]) {
    case 'fr':
      registerLocaleData(localeFr)
      lang = l
      return true
    case 'es':
      registerLocaleData(localeEs)
      lang = l
      return true
    case 'de':
      registerLocaleData(localeDe)
      lang = l
      return true
    case 'it':
      registerLocaleData(localeIt)
      lang = l
      return true
    case 'ja':
      registerLocaleData(localeJa)
      lang = 'ja'
      return true
    case 'ru':
      registerLocaleData(localeRu)
      lang = l
      return true
    case 'pl':
      registerLocaleData(localePl)
      lang = l
      return true
    case 'ko':
      registerLocaleData(localeKo)
      lang = l
      return true
  }
})

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FrontPageComponent,
    GuardianComponent,
    Guardian3DComponent,
    AddTimePipe,
    DayModalComponent,
    ManifestPipe,
    ActivitiesTotalTimePipe,
    ParseMinutesPlayedPipe,
    ActivitiesTotalHoursPipe,
    HoursPlayedPipe,
    FooterComponent,
    BungieStatusComponent,
    MilestonePipe,
    LoadingReducePipe,
    CurrentStreakPipe,
    LongestStreaksPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    RoutesModule,
    BungieAuthModule,
    NgxIndexedDBModule.forRoot({
      name: 'GtDb',
      version: 1,
      objectStoresMeta: [
        {
          store: 'pgcrs',
          storeConfig: {
            keyPath: 'instanceId',
            autoIncrement: false,
          },
          storeSchema: [
            {
              name: 'instanceId',
              keypath: 'instanceId',
              options: {
                unique: true,
              },
            },
            {
              name: 'period',
              keypath: 'period',
              options: {
                unique: false,
              },
            },
            {
              name: 'response',
              keypath: 'response',
              options: {
                unique: false,
              },
            },
          ],
        },
      ],
    }),
  ],
  entryComponents: [DayModalComponent],
  providers: [{ provide: LOCALE_ID, useValue: lang }],
  bootstrap: [AppComponent],
})
export class AppModule {}
