import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BungieHttpService } from './services/bungie-http.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { SearchComponent } from './search/search.component';

import { RoutesModule } from './routes/routes.module';
import { GuardianComponent } from './guardian/guardian.component';
import { AddTimePipe } from './pipes/add-time.pipe';

import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { DayModalComponent } from './guardian/day-modal/day-modal.component';
import { DestinyHashPipe } from './pipes/destiny-hash.pipe';
import { ActivitiesTotalTimePipe } from './pipes/activities-total-time.pipe';
import { ParseMinutesPlayedPipe } from './pipes/parse-minutes-played.pipe';
import { ActivitiesTotalHoursPipe } from './pipes/activities-total-hours.pipe';
import { HoursPlayedPipe } from './pipes/hours-played.pipe';
import { FooterComponent } from './footer/footer.component';
import { BungieStatusComponent } from './bungie-status/bungie-status.component';
import { MilestonePipe } from './pipes/milestone.pipe';
import { LoadingReducePipe } from './pipes/loading-reduce.pipe';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { CurrentStreakPipe } from './pipes/current-streak.pipe';
import { LongestStreaksPipe } from './pipes/longest-streaks.pipe';

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
    HttpModule,
    RoutesModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  entryComponents: [
    DayModalComponent
  ],
  providers: [BungieHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
