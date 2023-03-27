import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'destiny-webring',
  templateUrl: './webring.component.html',
  styleUrls: ['./webring.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
})
export class WebringComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(WebringSheetComponent)
  }
}

@Component({
  selector: 'destiny-webring-sheet',
  standalone: true,
  templateUrl: './webring-sheet.component.html',
  imports: [CommonModule, MatListModule],
})
export class WebringSheetComponent {
  links = [
    {
      url: 'https://guardian.theater/',
      name: 'Guardian Theater',
      description: 'Find yourself in Twitch and Xbox videos',
      icon: './assets/webring/gt.png',
    },
    {
      url: 'https://d2srl.club/',
      name: 'SRL²',
      description: '2: Synchronized Random Loadouts',
      icon: './assets/webring/srl2.png',
    },
    {
      url: 'https://github.com/chrisfried/secret-scrublandeux',
      name: 'Scrublandeux on GitHub',
      description: "The source isn't pretty, but it's open",
      icon: './assets/webring/github-mark-white.png',
    },
    {
      url: 'https://mastodon.chateaude.luxe/@chrisfried',
      name: 'Chris Fried',
      description: 'Follow me on Mastodon',
      icon: './assets/webring/logo-purple.svg',
    },
  ]

  constructor(private _bottomSheetRef: MatBottomSheetRef<WebringSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss()
    event.preventDefault()
  }
}
