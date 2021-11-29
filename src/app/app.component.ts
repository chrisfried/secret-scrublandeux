import { Component } from '@angular/core'
import { BungieAuthService } from './bungie-auth/bungie-auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  calendar: 'gregorian' | 'bungie'
  calendarChange(calendar: 'gregorian' | 'bungie') {
    this.calendar = calendar
  }
  constructor(public bungieAuth: BungieAuthService) {}
}
