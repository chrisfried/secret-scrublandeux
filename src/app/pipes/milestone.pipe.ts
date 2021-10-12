import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'milestone',
})
export class MilestonePipe implements PipeTransform {
  transform(date: any, args?: any): any {
    switch (args) {
      case 'class':
        switch (date) {
          case '2017-9-6':
          case '2017-09-06':
          case '2017-10-24':
          case '2017-12-5':
          case '2017-12-05':
          case '2018-5-8':
          case '2018-05-08':
          case '2018-9-4':
          case '2018-09-04':
          case '2018-12-4':
          case '2018-12-04':
          case '2019-3-5':
          case '2019-03-05':
          case '2019-6-4':
          case '2019-06-04':
          case '2019-10-1':
          case '2019-10-01':
          case '2019-12-10':
          case '2020-3-10':
          case '2020-03-10':
          case '2020-6-9':
          case '2020-06-09':
          case '2020-11-10':
          case '2021-2-9':
          case '2021-02-09':
          case '2021-5-11':
          case '2021-05-11':
          case '2021-8-24':
          case '2021-08-24':
          case '2021-12-7':
          case '2021-12-07':
          case '2022-2-22':
          case '2022-02-22':
            return 'release'
          case '2017-9-13':
          case '2017-09-13':
          case '2017-12-6':
          case '2017-12-06':
          case '2018-5-11':
          case '2018-05-11':
          case '2018-9-14':
          case '2018-09-14':
          case '2018-12-7':
          case '2018-12-07':
          case '2019-6-4':
          case '2019-06-04':
          case '2019-10-5':
          case '2019-10-05':
          case '2020-11-21':
          case '2021-5-22':
          case '2021-05-22':
            return 'raid'
          case '2018-7-8':
          case '2018-07-08':
          case '2018-7-20':
          case '2018-07-20':
          case '2018-7-31':
          case '2018-07-31':
          case '2018-12-4':
          case '2018-12-04':
          case '2018-12-7':
          case '2018-12-07':
          case '2018-12-11':
          case '2018-12-18':
          case '2019-1-8':
          case '2019-01-08':
          case '2019-1-29':
          case '2019-01-29':
          case '2019-2-5':
          case '2019-02-05':
          case '2019-3-5':
          case '2019-03-05':
          case '2019-3-8':
          case '2019-03-08':
          case '2019-3-12':
          case '2019-03-12':
          case '2019-3-15':
          case '2019-03-15':
          case '2019-3-19':
          case '2019-03-19':
          case '2019-3-26':
          case '2019-03-26':
          case '2019-4-2':
          case '2019-04-02':
          case '2019-4-9':
          case '2019-04-09':
          case '2019-4-16':
          case '2019-04-16':
          case '2019-6-4':
          case '2019-06-04':
          case '2019-6-11':
          case '2019-06-11':
          case '2019-6-18':
          case '2019-06-18':
          case '2019-6-25':
          case '2019-06-25':
          case '2019-7-2':
          case '2019-07-02':
          case '2019-7-9':
          case '2019-07-09':
          case '2019-7-30':
          case '2019-07-30':
          case '2019-10-5':
          case '2019-10-05':
          case '2019-10-22':
          case '2019-10-29':
          case '2019-11-19':
          case '2019-12-17':
          case '2020-1-7':
          case '2020-01-07':
          case '2020-1-28':
          case '2020-01-28':
          case '2020-2-4':
          case '2020-02-04':
          case '2020-2-11':
          case '2020-02-11':
          case '2020-3-13':
          case '2020-03-13':
          case '2020-3-17':
          case '2020-03-17':
          case '2020-3-24':
          case '2020-03-24':
          case '2020-4-7':
          case '2020-04-07':
          case '2020-4-21':
          case '2020-04-21':
          case '2020-6-6':
          case '2020-06-06':
          case '2020-7-7':
          case '2020-07-07':
          case '2020-8-11':
          case '2020-08-11':
          case '2020-9-8':
          case '2020-09-08':
          case '2020-10-6':
          case '2020-10-06':
          case '2020-11-9':
          case '2020-11-09':
          case '2020-11-17':
          case '2020-12-15':
          case '2021-2-16':
          case '2021-02-16':
          case '2021-2-23':
          case '2021-02-23':
          case '2021-3-23':
          case '2021-03-23':
          case '2021-4-20':
          case '2021-04-20':
          case '2021-5-7':
          case '2021-05-07':
          case '2021-5-18':
          case '2021-05-18':
          case '2021-5-25':
          case '2021-05-25':
          case '2021-6-1':
          case '2021-06-01':
          case '2021-6-8':
          case '2021-06-08':
          case '2021-6-29':
          case '2021-06-29':
          case '2021-7-6':
          case '2021-07-06':
          case '2021-8-10':
          case '2021-08-10':
          case '2021-8-31':
          case '2021-08-31':
          case '2021-9-7':
          case '2021-09-07':
          case '2021-10-12':
            return 'event'
          default:
            return ''
        }
      case 'text':
        switch (date) {
          case '2017-9-6':
          case '2017-09-06':
            return ' | Destiny 2 Console'
          case '2017-9-13':
          case '2017-09-13':
            return ' | Leviathan Raid'
          case '2017-10-24':
            return ' | Destiny 2 PC'
          case '2017-12-5':
          case '2017-12-05':
            return ' | Launch: Curse of Osiris'
          case '2017-12-6':
          case '2017-12-06':
            return ' | Eater of Worlds Raid Lair'
          case '2018-5-8':
          case '2018-05-08':
            return ' | Launch: Warmind'
          case '2018-5-11':
          case '2018-05-11':
            return ' | Spire of Stars Raid Lair'
          case '2018-7-8':
          case '2018-07-08':
            return ' | Moments of Triumph'
          case '2018-7-20':
          case '2018-07-20':
            return ' | The Whisper'
          case '2018-7-31':
          case '2018-07-31':
            return ' | Solstice of Heroes'
          case '2018-9-4':
          case '2018-09-04':
            return ' | Launch: Forsaken | Season of the Outlaw'
          case '2018-9-14':
          case '2018-09-14':
            return ' | Last Wish Raid'
          case '2018-12-4':
          case '2018-12-04':
            return ' | Season of the Forge | Volundr Forge'
          case '2018-12-7':
          case '2018-12-07':
            return ' | Scourge of the Past Raid | Gofannon Forge'
          case '2018-12-11':
            return ' | The Dawning'
          case '2018-12-18':
            return ' | Izanami Forge'
          case '2019-1-8':
          case '2019-01-08':
            return ' | Niobe Labs'
          case '2019-1-29':
          case '2019-01-29':
            return ' | The Draw Quest'
          case '2019-2-5':
          case '2019-02-05':
            return ' | Crimson Days'
          case '2019-3-5':
          case '2019-03-05':
            return ' | Season of the Drifter | Gambit Prime: New Arcadia & Reckoning Tier 1'
          case '2019-3-8':
          case '2019-03-08':
            return ' | Reckoning Tier 2'
          case '2019-3-12':
          case '2019-03-12':
            return ' | Gambit Prime: Deep Six | Exotic Quest: Thorn'
          case '2019-3-15':
          case '2019-03-15':
            return ' | Invitations of the Nine | Reckoning Tier 3'
          case '2019-3-19':
          case '2019-03-19':
            return " | Gambit Prime: Legion's Folly"
          case '2019-3-26':
          case '2019-03-26':
            return ' | Gambit Prime: Emerald Coast'
          case '2019-4-2':
          case '2019-04-02':
            return ' | Gambit Prime: All Maps'
          case '2019-4-9':
          case '2019-04-09':
            return ' | Arc Week'
          case '2019-4-16':
          case '2019-04-16':
            return ' | The Revelry'
          case '2019-6-4':
          case '2019-06-04':
            return ' | Season of Opulence | Menagerie & Crown of Sorrow Raid'
          case '2019-6-11':
          case '2019-06-11':
            return ' | New Menagerie Boss | Exotic Quest: Truth'
          case '2019-6-18':
          case '2019-06-18':
            return ' | New Menagerie Boss | Iron Banner Quest'
          case '2019-6-25':
          case '2019-06-25':
            return ' | Menagerie Heroic Mode'
          case '2019-7-2':
          case '2019-07-02':
            return ' | Exotic Quest: Lumina'
          case '2019-7-9':
          case '2019-07-09':
            return ' | Tribute Hall | Moments of Triumph'
          case '2019-7-30':
          case '2019-07-30':
            return ' | Solstice of Heroes'
          case '2019-10-1':
          case '2019-10-01':
            return ' | Launch: Shadowkeep | Season of Undying'
          case '2019-10-5':
          case '2019-10-05':
            return ' | Garden of Salvation | Vex Offensive'
          case '2019-10-22':
            return ' | Exotic Quest: Leviathan\'s Breath | Master Nightmare Hunts'
          case '2019-10-29':
            return ' | Festival of the Lost | Pit of Heresy Dungeon | Exotic Quest: Xenophage'
          case '2019-11-19':
            return ' | Vex Offensive: Final Assault'
          case '2019-12-10':
            return ' | Season of Dawn'
          case '2019-12-17':
            return ' | The Dawning'
          case '2020-1-7':
          case '2020-01-07':
            return " | Exotic Quest: Devil's Ruin"
          case '2020-1-28':
          case '2020-01-28':
            return ' | Exotic Quest: Bastion'
          case '2020-2-4':
          case '2020-02-04':
            return ' | Empyrean Foundation'
          case '2020-2-11':
          case '2020-02-11':
            return ' | Crimson Days'
          case '2020-3-10':
          case '2020-03-10':
            return ' | Season of the Worthy | Seraph Bunker: EDZ'
          case '2020-3-13':
          case '2020-03-13':
            return ' | Trials of Osiris Returns'
          case '2020-3-17':
          case '2020-03-17':
            return ' | Exotic Quest: The Fourth Horseman'
          case '2020-3-24':
          case '2020-03-24':
            return ' | Seraph Bunker: Moon'
          case '2020-4-7':
          case '2020-04-07':
            return ' | Seraph Bunker: Io'
          case '2020-4-21':
          case '2020-04-21':
            return ' | Guardian Games | Grandmaster Ordeal'
          case '2020-6-6':
          case '2020-06-06':
            return " | Live Event: Almighty's Destruction"
          case '2020-6-9':
          case '2020-06-09':
            return ' | Season of Arrivals | Contact Event: Io | Prophecy Dungeon'
          case '2020-7-7':
          case '2020-07-07':
            return ' | Moments of Triumph | Exotic Quest: Ruinous Effigy | Contact Event: Titan'
          case '2020-8-11':
          case '2020-08-11':
            return ' | Solstice of Heroes'
          case '2020-9-8':
          case '2020-09-08':
            return " | Exotic Quest: Traveler's Chosen"
          case '2020-10-6':
          case '2020-10-06':
            return ' | Festival of the Lost'
          case '2020-11-9':
          case '2020-11-09':
            return ' | Live Event: Traveler Reforged'
          case '2020-11-10':
            return ' | Launch: Beyond Light | Season of the Hunt'
          case '2020-11-17':
            return ' | Wrathborn Hunts'
          case '2020-11-21':
            return ' | Deep Stone Crypt Raid'
          case '2020-12-15':
            return ' | The Dawning'
          case '2021-2-9':
          case '2021-02-09':
            return ' | Season of the Chosen | H.E.L.M. Opens | Behemoth & Hailstone Battlegrounds'
          case '2021-2-16':
          case '2021-02-16':
            return ' | Foothold Battleground | Exotic Quest: Presage'
          case '2021-2-23':
          case '2021-02-23':
            return ' | Oracle Battleground'
          case '2021-3-23':
          case '2021-03-23':
            return ' | Proving Grounds Strike'
          case '2021-4-20':
          case '2021-04-20':
            return ' | Guardian Games'
          case '2021-5-7':
          case '2021-05-07':
            return ' | Guardian Games Closing Ceremony'
          case '2021-5-11':
          case '2021-05-11':
            return ' | Season of the Splicer | Override: Europa'
          case '2021-5-18':
          case '2021-05-18':
            return ' | Override: Moon'
          case '2021-5-22':
          case '2021-05-22':
            return ' | Vault of Glass Raid'
          case '2021-5-25':
          case '2021-05-25':
            return ' | Override: Tangled Shore | Expunge: Labyrinth'
          case '2021-6-1':
          case '2021-06-01':
            return ' | Expunge: Styx'
          case '2021-6-8':
          case '2021-06-08':
            return ' | Expunge: Tartarus'
          case '2021-6-29':
          case '2021-06-29':
            return ' | Expunge: Delphi'
          case '2021-7-6':
          case '2021-07-06':
            return ' | Solstice of Heroes'
          case '2021-8-10':
          case '2021-08-10':
            return ' | Season of the Splicer Epilogue'
          case '2021-8-24':
          case '2021-08-24':
            return ' | Season of the Lost | Exotic Quest: Ager\'s Scepter | Shattered Realm: Forest of Echoes'
          case '2021-8-31':
          case '2021-08-31':
            return ' | Shattered Realm: Debris of Dreams'
          case '2021-9-7':
          case '2021-09-07':
            return ' | Shattered Realm: Ruins of Wrath'
          case '2021-10-12':
            return ' | Festival of the Lost'
          case '2021-12-7':
          case '2021-12-07':
            return ' | Bungie 30th Anniversary Expansion'
          case '2022-2-22':
          case '2022-02-22':
            return ' | Launch: The Witch Queen'
          default:
            return ''
        }
      default:
        return ''
    }
  }
}
