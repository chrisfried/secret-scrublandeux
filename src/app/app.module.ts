import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
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
// import { SearchComponent } from './search/search.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FrontPageComponent,
//     SearchComponent,
    GuardianComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
