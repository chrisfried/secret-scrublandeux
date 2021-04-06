import { Component } from '@angular/core'
import { BungieAuthService } from './bungie-auth/bungie-auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public bungieAuth: BungieAuthService) {}
}
