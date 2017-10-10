import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BungieHttpService } from './services/bungie-http.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BungieHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
