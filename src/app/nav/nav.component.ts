import { Component, OnInit } from '@angular/core'
import { BungieAuthService } from '../bungie-auth/bungie-auth.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public searchString: string

  constructor(public bungieAuth: BungieAuthService) {}

  ngOnInit() {
    this.searchString = ''
  }

  login(): void {
    this.bungieAuth.login()
  }

  logout(): void {
    this.bungieAuth.logout()
  }
}
