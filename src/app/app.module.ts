import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdsenseModule } from 'ng2-adsense';

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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FrontPageComponent,
    SearchComponent,
    GuardianComponent,
    AddTimePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    HttpModule,
    RoutesModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7822250090731539',
      adSlot: 9015826003
    })
  ],
  providers: [BungieHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
