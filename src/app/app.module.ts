import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AppComponent } from './app.component';
import { BungieStatusComponent } from './bungie-status/bungie-status.component';
import { FooterComponent } from './footer/footer.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { DayModalComponent } from './guardian/day-modal/day-modal.component';
import { GuardianComponent } from './guardian/guardian.component';
import { NavComponent } from './nav/nav.component';
import { ActivitiesTotalHoursPipe } from './pipes/activities-total-hours.pipe';
import { ActivitiesTotalTimePipe } from './pipes/activities-total-time.pipe';
import { AddTimePipe } from './pipes/add-time.pipe';
import { CurrentStreakPipe } from './pipes/current-streak.pipe';
import { DestinyHashPipe } from './pipes/destiny-hash.pipe';
import { HoursPlayedPipe } from './pipes/hours-played.pipe';
import { LoadingReducePipe } from './pipes/loading-reduce.pipe';
import { LongestStreaksPipe } from './pipes/longest-streaks.pipe';
import { MilestonePipe } from './pipes/milestone.pipe';
import { ParseMinutesPlayedPipe } from './pipes/parse-minutes-played.pipe';
import { RoutesModule } from './routes/routes.module';
import { SearchComponent } from './search/search.component';
import { BungieHttpService } from './services/bungie-http.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FrontPageComponent,
    SearchComponent,
    GuardianComponent,
    AddTimePipe,
    DayModalComponent,
    DestinyHashPipe,
    ActivitiesTotalTimePipe,
    ParseMinutesPlayedPipe,
    ActivitiesTotalHoursPipe,
    HoursPlayedPipe,
    FooterComponent,
    BungieStatusComponent,
    MilestonePipe,
    LoadingReducePipe,
    CurrentStreakPipe,
    LongestStreaksPipe
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
    Angulartics2Module.forRoot()
  ],
  entryComponents: [DayModalComponent],
  providers: [BungieHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
