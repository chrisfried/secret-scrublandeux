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
          case '2022-5-24':
          case '2022-05-24':
          case '2022-8-23':
          case '2022-08-23':
          case '2022-12-6':
          case '2022-12-06':
          case '2023-2-28':
          case '2023-02-28':
          case '2023-5-23':
          case '2023-05-23':
          case '2024-06-4':
          case '2024-6-4':
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
          case '2022-3-5':
          case '2022-03-05':
          case '2022-8-26':
          case '2022-08-26':
          case '2023-3-10':
          case '2023-03-10':
          case '2024-06-07':
          case '2024-6-7':
            return 'raid'
          case '2017-12-19':
          case '2018-2-13':
          case '2018-02-13':
          case '2018-7-8':
          case '2018-07-08':
          case '2018-7-20':
          case '2018-07-20':
          case '2018-7-31':
          case '2018-07-31':
          case '2018-9-25':
          case '2018-09-25':
          case '2018-10-16':
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
          case '2021-12-14':
          case '2022-2-15':
          case '2022-02-15':
          case '2022-3-1':
          case '2022-03-01':
          case '2022-3-22':
          case '2022-03-22':
          case '2022-5-3':
          case '2022-05-03':
          case '2022-5-27':
          case '2022-05-27':
          case '2022-5-31':
          case '2022-05-31':
          case '2022-7-12':
          case '2022-07-12':
          case '2022-7-19':
          case '2022-07-19':
          case '2022-9-6':
          case '2022-09-06':
          case '2022-11-15':
          case '2022-10-18':
          case '2022-12-9':
          case '2022-12-09':
          case '2022-12-13':
          case '2023-1-3':
          case '2023-01-03':
          case '2023-1-31':
          case '2023-01-31':
          case '2023-3-7':
          case '2023-03-07':
          case '2023-3-21':
          case '2023-03-21':
          case '2023-4-4':
          case '2023-04-04':
          case '2023-4-25':
          case '2023-04-25':
          case '2023-5-2':
          case '2023-05-02':
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
          case '2017-10-10':
            return ' | Iron Banner'
          case '2017-10-24':
            return ' | Destiny 2 PC'
          case '2017-12-5':
          case '2017-12-05':
            return ' | Launch: Curse of Osiris'
          case '2017-12-6':
          case '2017-12-06':
            return ' | Eater of Worlds Raid Lair'
          case '2017-12-19':
            return ' | The Dawning'
          case '2018-1-30':
          case '2018-01-30':
            return ' | Iron Banner'
          case '2018-2-13':
          case '2018-02-13':
            return ' | Crimson Days'
          case '2018-3-6':
          case '2018-03-06':
            return ' | Iron Banner'
          case '2018-4-17':
          case '2018-04-17':
            return ' | Iron Banner'
          case '2018-5-8':
          case '2018-05-08':
            return ' | Launch: Warmind'
          case '2018-5-11':
          case '2018-05-11':
            return ' | Spire of Stars Raid Lair'
          case '2018-5-22':
          case '2018-05-22':
            return ' | Iron Banner'
          case '2018-6-19':
          case '2018-06-19':
            return ' | Iron Banner'
          case '2018-7-8':
          case '2018-07-08':
            return ' | Moments of Triumph'
          case '2018-7-10':
          case '2018-07-10':
            return ' | Iron Banner'
          case '2018-7-20':
          case '2018-07-20':
            return ' | The Whisper'
          case '2018-7-31':
          case '2018-07-31':
            return ' | Solstice of Heroes'
          case '2018-8-14':
          case '2018-08-14':
            return ' | Iron Banner'
          case '2018-9-4':
          case '2018-09-04':
            return ' | Launch: Forsaken | Season of the Outlaw'
          case '2018-9-14':
          case '2018-09-14':
            return ' | Last Wish Raid'
          case '2018-9-18':
          case '2018-09-18':
            return ' | Iron Banner'
          case '2018-9-25':
          case '2018-09-25':
            return ' | Shattered Throne Dungeon'
          case '2018-10-16':
            return ' | Festival of the Lost | Iron Banner'
          case '2018-11-13':
            return ' | Iron Banner'
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
          case '2018-12-25':
            return ' | Iron Banner'
          case '2019-1-8':
          case '2019-01-08':
            return ' | Niobe Labs'
          case '2019-1-15':
          case '2019-01-15':
            return ' | Iron Banner'
          case '2019-1-29':
          case '2019-01-29':
            return ' | Exotic Quest: The Last Word'
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
            return ' | Gambit Prime: Emerald Coast | Iron Banner'
          case '2019-4-2':
          case '2019-04-02':
            return ' | Gambit Prime: All Maps'
          case '2019-4-9':
          case '2019-04-09':
            return ' | Arc Week'
          case '2019-5-14':
          case '2019-05-14':
            return ' | Iron Banner'
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
            return ' | New Menagerie Boss | Iron Banner'
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
          case '2019-8-27':
          case '2019-08-27':
            return ' | Iron Banner'
          case '2019-9-17':
          case '2019-09-17':
            return ' | Iron Banner'
          case '2019-10-1':
          case '2019-10-01':
            return ' | Launch: Shadowkeep | Season of Undying'
          case '2019-10-5':
          case '2019-10-05':
            return ' | Garden of Salvation Raid | Vex Offensive'
          case '2019-10-15':
            return ' | Iron Banner'
          case '2019-10-22':
            return " | Exotic Quest: Leviathan's Breath | Master Nightmare Hunts"
          case '2019-10-29':
            return ' | Festival of the Lost | Pit of Heresy Dungeon | Exotic Quest: Xenophage'
          case '2019-11-5':
          case '2019-11-05':
            return ' | Iron Banner'
          case '2019-11-19':
            return ' | Vex Offensive: Final Assault'
          case '2019-11-26':
            return ' | Iron Banner'
          case '2019-12-10':
            return ' | Season of Dawn'
          case '2019-12-17':
            return ' | The Dawning'
          case '2019-12-24':
            return ' | Iron Banner'
          case '2020-1-7':
          case '2020-01-07':
            return " | Exotic Quest: Devil's Ruin"
          case '2020-1-21':
          case '2020-01-21':
            return ' | Iron Banner'
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
            return ' | Seraph Bunker: Moon | Iron Banner'
          case '2020-4-7':
          case '2020-04-07':
            return ' | Seraph Bunker: Io'
          case '2020-4-14':
          case '2020-04-14':
            return ' | Iron Banner'
          case '2020-4-21':
          case '2020-04-21':
            return ' | Guardian Games | Grandmaster Nightfalls'
          case '2020-6-6':
          case '2020-06-06':
            return " | Live Event: Almighty's Destruction"
          case '2020-6-9':
          case '2020-06-09':
            return ' | Season of Arrivals | Contact Event: Io | Prophecy Dungeon'
          case '2020-6-30':
          case '2020-06-30':
            return ' | Iron Banner'
          case '2020-7-7':
          case '2020-07-07':
            return ' | Moments of Triumph | Exotic Quest: Ruinous Effigy | Contact Event: Titan'
          case '2020-8-4':
          case '2020-08-04':
            return ' | Iron Banner'
          case '2020-8-11':
          case '2020-08-11':
            return ' | Solstice of Heroes'
          case '2020-9-8':
          case '2020-09-08':
            return " | Exotic Quest: Traveler's Chosen | Iron Banner"
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
          case '2020-12-8':
          case '2020-12-08':
            return ' | Exotic Quest: Hawkmoon | Iron Banner'
          case '2020-12-15':
            return ' | The Dawning'
          case '2020-12-24':
            return ' | Iron Banner'
          case '2021-2-9':
          case '2021-02-09':
            return ' | Season of the Chosen | H.E.L.M. Opens | Behemoth & Hailstone Battlegrounds'
          case '2021-2-16':
          case '2021-02-16':
            return " | Foothold Battleground | Exotic Quest: Dead Man's Tale"
          case '2021-2-23':
          case '2021-02-23':
            return ' | Oracle Battleground | Iron Banner'
          case '2021-3-23':
          case '2021-03-23':
            return ' | Proving Grounds Strike | Iron Banner'
          case '2021-4-13':
          case '2021-04-13':
            return ' | Iron Banner'
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
            return ' | Override: Moon | Iron Banner'
          case '2021-5-22':
          case '2021-05-22':
            return ' | Vault of Glass Reprised Raid'
          case '2021-5-25':
          case '2021-05-25':
            return ' | Override: Tangled Shore | Expunge: Labyrinth'
          case '2021-6-1':
          case '2021-06-01':
            return ' | Expunge: Styx'
          case '2021-6-8':
          case '2021-06-08':
            return ' | Expunge: Tartarus | Iron Banner'
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
            return " | Season of the Lost | Exotic Quest: Ager's Scepter | Shattered Realm: Forest of Echoes"
          case '2021-8-31':
          case '2021-08-31':
            return ' | Shattered Realm: Debris of Dreams | Iron Banner'
          case '2021-9-7':
          case '2021-09-07':
            return ' | Shattered Realm: Ruins of Wrath'
          case '2021-9-28':
          case '2021-09-28':
            return ' | Iron Banner'
          case '2021-10-12':
            return ' | Festival of the Lost'
          case '2021-11-2':
          case '2021-11-02':
            return ' | Iron Banner'
          case '2021-12-7':
          case '2021-12-07':
            return ' | Bungie 30th Anniversary | Grasp of Avarice Dungeon | Moments of Triumph | Exotic Quest: Gjallarhorn | Iron Banner'
          case '2021-12-14':
            return ' | The Dawning'
          case '2022-1-11':
          case '2022-01-11':
            return ' | Iron Banner'
          case '2022-2-15':
          case '2022-02-15':
            return ' | The Exorcism | Iron Banner'
          case '2022-2-22':
          case '2022-02-22':
            return ' | Launch: The Witch Queen | Season of the Risen | Exotic Quest: Dead Messenger | PsiOps Battleground: EDZ'
          case '2022-3-1':
          case '2022-03-01':
            return ' | PsiOps Battleground: Cosmodrome'
          case '2022-3-5':
          case '2022-03-05':
            return ' | Vow of the Disciple Raid'
          case '2022-3-15':
          case '2022-03-15':
            return ' | Iron Banner'
          case '2022-3-22':
          case '2022-03-22':
            return ' | PsiOps Battleground: Moon'
          case '2022-5-3':
          case '2022-05-03':
            return ' | Guardian Games'
          case '2022-5-24':
          case '2022-05-24':
            return ' | Season of the Haunted'
          case '2022-5-27':
          case '2022-05-27':
            return ' | Duality Dungeon'
          case '2022-5-31':
          case '2022-05-31':
            return ' | Iron Banner'
          case '2022-7-12':
          case '2022-07-12':
            return ' | Iron Banner'
          case '2022-7-19':
          case '2022-07-19':
            return ' | Solstice'
          case '2022-8-23':
          case '2022-08-23':
            return ' | Season of Plunder'
          case '2022-8-26':
          case '2022-08-26':
            return " | King's Fall Reprised Raid"
          case '2022-9-6':
          case '2022-09-06':
            return ' | Iron Banner'
          case '2022-10-18':
            return ' | Festival of the Lost'
          case '2022-11-15':
            return ' | Iron Banner'
          case '2022-11-27':
            return ' | Eliksni Quarter Community Event'
          case '2022-12-6':
          case '2022-12-06':
            return ' | Season of the Seraph | Moments of Triumph'
          case '2022-12-9':
          case '2022-12-09':
            return ' | Spire of the Watcher Dungeon'
          case '2022-12-13':
            return ' | The Dawning'
          case '2022-12-20':
            return ' | Exotic Quest: Revision Zero'
          case '2023-1-3':
          case '2023-01-03':
          case '2023-1-31':
          case '2023-01-31':
            return ' | Iron Banner'
          case '2023-2-28':
          case '2023-02-28':
            return ' | Launch: Lightfall | Season of Defiance'
          case '2023-3-7':
          case '2023-03-07':
            return ' | Exotic Quest: Vexcalibur'
          case '2023-03-10':
          case '2023-3-10':
            return ' | Root of Nightmares Raid'
          case '2023-3-21':
          case '2023-03-21':
          case '2023-4-4':
          case '2023-04-04':
          case '2023-4-25':
          case '2023-04-25':
            return ' | Iron Banner'
          case '2023-5-2':
          case '2023-05-02':
            return ' | Guardian Games'
          case '2023-5-23':
          case '2023-05-23':
            return ' | Season of the Deep'
          case '2023-5-26':
          case '2023-05-26':
            return ' | Ghosts of the Deep Dungeon'
          case '2023-5-30':
          case '2023-05-30':
          case '2023-6-20':
          case '2023-06-20':
            return ' | Iron Banner'
          case '2023-7-4':
          case '2023-07-04':
            return ' | Exotic Quest: Wicked Implement'
          case '2023-7-11':
          case '2023-07-11':
            return ' | Iron Banner'
          case '2023-7-18':
          case '2023-07-18':
            return ' | Solstice'
          case '2023-8-22':
          case '2023-08-22':
            return ' | Season of the Witch'
          case '2023-9-1':
          case '2023-09-01':
            return " | Crota's End Reprised Raid"
          case '2023-9-5':
          case '2023-09-05':
          case '2023-10-10':
            return ' | Iron Banner'
          case '2023-10-17':
            return ' | Festival of the Lost'
          case '2023-11-14':
            return ' | Iron Banner'
          case '2023-11-28':
            return ' | Season of the Wish'
          case '2023-12-1':
          case '2023-12-01':
            return " | Warlord's Ruin Dungeon"
          case '2023-12-5':
          case '2023-12-05':
            return ' | Iron Banner'
          case '2023-12-12':
            return ' | The Dawning'
          case '2023-12-19':
            return ' | Exotic Quest: Wish-Keeper'
          case '2024-1-2':
          case '2024-01-02':
          case '2024-1-23':
          case '2024-01-23':
            return ' | Iron Banner'
          case '2024-1-30':
          case '2024-01-30':
            return " | Moments of Triumph | Riven's Wishes"
          case '2024-3-5':
          case '2024-03-05':
            return ' | Guardian Games All-Stars'
          case '2024-4-2':
          case '2024-04-02':
            return ' | Iron Banner'
          case '2024-4-9':
          case '2024-04-09':
            return ' | Into the Light | Hall of Champions | Onslaught | Reprised Exotic Quest: Whisper of the Worm'
          case '2024-4-30':
          case '2024-04-30':
            return ' | Pantheon | Iron Banner'
          case '2024-5-14':
          case '2024-05-14':
            return ' | Reprised Exotic Quest: Outbreak Perfected'
          case '2024-6-4':
          case '2024-06-04':
            return ' | Launch: The Final Shape'
          case '2024-6-7':
          case '2024-06-07':
            return ' | Salvations Edge Raid'
          case '2024-6-11':
          case '2024-06-11':
            return ' | Episode: Echoes - Act I | Enigma Protocol | Breach Executable'
          case '2024-7-2':
          case '2024-07-02':
            return ' | Iron Banner'
          case '2024-7-16':
          case '2024-07-16':
            return ' | Episode: Echoes - Act II | Battleground: Echoes'
          case '2024-8-6':
          case '2024-08-06':
            return ' | Solstice'
          case '2024-8-27':
          case '2024-08-27':
            return ' | Episode: Echoes - Act III | Exotic Quest: Choir of One'
          case '2024-9-9':
          case '2024-09-09':
            return ' | Destiny 10 Year Anniversary'
          case '2024-9-10':
          case '2024-09-10':
            return ' | Iron Banner'
          case '2024-10-8':
          case '2024-10-08':
            return ' | Episode: Revenant - Act I | Onslaught: Salvation'
          case '2024-10-11':
            return ' | Vesper\'s Host Dungeon'
          case '2024-10-29':
            return ' | Festival of the Lost'
          case '2024-11-19':
            return ' | Episode: Revenant - Act II'
          case '2024-11-26':
            return ' | Iron Banner'
          case '2024-12-10':
            return ' | The Dawning'
          case '2025-1-7':
          case '2025-01-07':
            return ' | Episode: Revenant - Act III | Exotic Mission: Slayer\'s Fang'
          case '2025-1-14':
          case '2025-01-14':
            return ' | Iron Banner'
          case '2025-2-4':
          case '2025-02-04':
            return ' | Episode: Heresy - Act I | The Nether'
          case '2025-2-7':
          case '2025-02-07':
            return ' | Sundered Doctrine Dungeon'
          case '2025-2-18':
          case '2025-02-18':
            return ' | Iron Banner'
          case '2025-3-11':
          case '2025-03-11':
            return ' | Episode: Heresy - Act II'
          case '2025-4-1':
          case '2025-04-01':
            return ' | Episode Heresy - Act III | Iron Banner'
          case '2025-4-29':
          case '2025-04-29':
            return ' | Iron Banner'
          case '2025-5-6':
          case '2025-05-06':
            return ' | Rite of the Nine'
          case '2025-5-9':
          case '2025-05-09':
            return ' | Heavy Metal'
          case '2025-5-20':
          case '2025-05-20':
            return ' | Iron Banner'
          case '2025-7-15':
          case '2025-07-15':
            return ' | Launch: The Edge of Fate'
          default:
            return ''
        }
      case 'icon':
        let classes = 'icon '
        switch (date) {
          case '2017-9-6':
          case '2017-09-06':
          case '2017-10-24':
            return (classes += 'red-war')
          case '2017-12-5':
          case '2017-12-05':
            return (classes += 'curse-of-osiris')
          case '2017-12-19':
          case '2018-12-11':
          case '2019-12-17':
          case '2020-12-15':
          case '2021-12-14':
          case '2022-12-13':
          case '2023-12-12':
          case '2024-12-10':
            return (classes += 'dawning')
          case '2018-2-13':
          case '2018-02-13':
          case '2019-2-5':
          case '2019-02-05':
          case '2020-2-11':
          case '2020-02-11':
            return (classes += 'crimson-days')
          case '2018-5-8':
          case '2018-05-08':
            return (classes += 'warmind')
          case '2018-7-8':
          case '2018-07-08':
          case '2019-7-9':
          case '2019-07-09':
          case '2020-7-7':
          case '2020-07-07':
          case '2024-1-30':
          case '2024-01-30':
            return (classes += 'moments-of-triumph')
          case '2018-7-31':
          case '2018-07-31':
          case '2019-7-30':
          case '2019-07-30':
          case '2020-8-11':
          case '2020-08-11':
          case '2021-7-6':
          case '2021-07-06':
            return (classes += 'solstice')
          case '2018-9-4':
          case '2018-09-04':
            return (classes += 'forsaken')
          case '2018-10-16':
          case '2019-10-29':
          case '2020-10-6':
          case '2020-10-06':
          case '2021-10-12':
          case '2022-10-18':
          case '2023-10-17':
          case '2024-10-29':
            return (classes += 'festival-of-the-lost')
          case '2018-12-4':
          case '2018-12-04':
            return (classes += 'season-of-the-forge')
          case '2019-3-5':
          case '2019-03-05':
            return (classes += 'season-of-the-drifter')
          case '2019-4-16':
          case '2019-04-16':
            return (classes += 'revelry')
          case '2019-6-4':
          case '2019-06-04':
            return (classes += 'season-of-opulence')
          case '2019-10-1':
          case '2019-10-01':
            return (classes += 'shadowkeep')
          case '2019-10-5':
          case '2019-10-05':
            return (classes += 'season-of-the-undying')
          case '2019-12-10':
            return (classes += 'season-of-dawn')
          case '2020-3-10':
          case '2020-03-10':
            return (classes += 'season-of-the-worthy')
          case '2020-4-21':
          case '2020-04-21':
          case '2021-4-20':
          case '2021-04-20':
          case '2022-5-3':
          case '2022-05-03':
          case '2023-5-2':
          case '2023-05-02':
          case '2024-3-5':
          case '2024-03-05':
            return (classes += 'guardian-games')
          case '2020-6-9':
          case '2020-06-09':
            return (classes += 'season-of-arrivals')
          case '2020-11-10':
            return (classes += 'beyond-light')
          case '2020-11-17':
            return (classes += 'season-of-the-hunt')
          case '2021-2-9':
          case '2021-02-09':
            return (classes += 'season-of-the-chosen')
          case '2021-5-11':
          case '2021-05-11':
            return (classes += 'season-of-the-splicer')
          case '2021-8-24':
          case '2021-08-24':
            return (classes += 'season-of-the-lost')
          case '2021-12-7':
          case '2021-12-07':
            return (classes += 'thirtieth-anniversary')
          case '2022-2-22':
          case '2022-02-22':
            return (classes += 'witch-queen')
          case '2022-5-24':
          case '2022-05-24':
            return (classes += 'season-of-the-haunted')
          case '2022-7-19':
          case '2022-07-19':
          case '2023-7-18':
          case '2023-07-18':
          case '2024-8-6':
          case '2024-08-06':
            return (classes += 'solstice2022')
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
          case '2020-11-21':
          case '2021-5-22':
          case '2021-05-22':
          case '2022-3-5':
          case '2022-03-05':
          case '2022-8-26':
          case '2022-08-26':
          case '2023-3-10':
          case '2023-03-10':
          case '2023-9-1':
          case '2023-09-01':
          case '2024-4-30':
          case '2024-04-30':
          case '2024-6-7':
          case '2024-06-07':
            return (classes += 'raid')
          case '2022-8-23':
          case '2022-08-23':
            return (classes += 'season-of-plunder')
          case '2018-9-25':
          case '2018-09-25':
          case '2022-5-27':
          case '2022-05-27':
          case '2022-12-9':
          case '2022-12-09':
          case '2023-5-26':
          case '2023-05-26':
          case '2023-12-1':
          case '2023-12-01':
          case '2024-10-11':
          case '2025-2-7':
          case '2025-02-07':
            return (classes += 'dungeon')
          case '2022-12-6':
          case '2022-12-06':
            return (classes += 'season-of-the-seraph')
          case '2023-2-28':
          case '2023-02-28':
            return (classes += 'lightfall')
          case '2023-5-23':
          case '2023-05-23':
            return (classes += 'season-of-the-deep')
          case '2019-1-29':
          case '2019-01-29':
          case '2019-3-12':
          case '2019-03-12':
          case '2019-6-11':
          case '2019-06-11':
          case '2019-7-2':
          case '2019-07-02':
          case '2019-10-22':
          case '2019-10-29':
          case '2020-1-7':
          case '2020-01-07':
          case '2020-1-28':
          case '2020-01-28':
          case '2020-3-17':
          case '2020-03-17':
          case '2020-7-7':
          case '2020-07-07':
          case '2020-9-8':
          case '2020-09-08':
          case '2020-12-8':
          case '2020-12-08':
          case '2021-2-16':
          case '2021-02-16':
          case '2021-8-24':
          case '2021-08-24':
          case '2021-12-7':
          case '2021-12-07':
          case '2022-2-22':
          case '2022-02-22':
          case '2022-12-20':
          case '2023-3-7':
          case '2023-03-07':
          case '2023-7-4':
          case '2023-07-04':
          case '2023-12-19':
          case '2024-5-14':
          case '2024-05-14':
            return (classes += 'exotic-quest')
          case '2023-8-22':
          case '2023-08-22':
            return (classes += 'season-of-the-witch')
          case '2023-11-28':
            return (classes += 'season-of-the-wish')
          case '2024-4-9':
          case '2024-04-09':
            return (classes += 'into-the-light')
          case '2024-6-4':
          case '2024-06-04':
            return (classes += 'the-final-shape')
          case '2024-6-11':
          case '2024-06-11':
          case '2024-7-16':
          case '2024-07-16':
          case '2024-8-27':
          case '2024-08-27':
            return (classes += 'episode-echoes')
          case '2024-9-9':
          case '2024-09-09':
            return (classes += 'ten-year-anniversary')
          case '2017-10-10':
          case '2018-01-30':
          case '2018-1-30':
          case '2018-03-06':
          case '2018-3-6':
          case '2018-04-17':
          case '2018-4-17':
          case '2018-05-22':
          case '2018-5-22':
          case '2018-06-19':
          case '2018-6-19':
          case '2018-07-10':
          case '2018-7-10':
          case '2018-08-14':
          case '2018-8-14':
          case '2018-09-18':
          case '2018-9-18':
          case '2018-10-16':
          case '2018-11-13':
          case '2018-12-25':
          case '2019-01-15':
          case '2019-1-15':
          case '2019-03-26':
          case '2019-3-26':
          case '2019-05-14':
          case '2019-5-14':
          case '2019-06-18':
          case '2019-6-18':
          case '2019-08-27':
          case '2019-8-27':
          case '2019-09-17':
          case '2019-9-17':
          case '2019-10-15':
          case '2019-11-05':
          case '2019-11-5':
          case '2019-11-26':
          case '2019-12-24':
          case '2020-01-21':
          case '2020-1-21':
          case '2020-03-24':
          case '2020-3-24':
          case '2020-04-14':
          case '2020-4-14':
          case '2020-06-30':
          case '2020-6-30':
          case '2020-08-04':
          case '2020-8-4':
          case '2020-09-08':
          case '2020-9-8':
          case '2020-12-08':
          case '2020-12-8':
          case '2021-02-23':
          case '2021-2-23':
          case '2021-03-23':
          case '2021-3-23':
          case '2021-04-13':
          case '2021-4-13':
          case '2021-5-18':
          case '2021-05-18':
          case '2021-6-8':
          case '2021-06-08':
          case '2021-8-31':
          case '2021-08-31':
          case '2021-9-28':
          case '2021-09-28':
          case '2021-11-2':
          case '2021-11-02':
          case '2022-1-11':
          case '2022-01-11':
          case '2022-2-15':
          case '2022-02-15':
          case '2022-3-15':
          case '2022-03-15':
          case '2022-5-31':
          case '2022-05-31':
          case '2022-7-12':
          case '2022-07-12':
          case '2022-9-6':
          case '2022-09-06':
          case '2022-11-15':
          case '2023-1-3':
          case '2023-01-03':
          case '2023-1-31':
          case '2023-01-31':
          case '2023-3-21':
          case '2023-03-21':
          case '2023-4-4':
          case '2023-04-04':
          case '2023-4-25':
          case '2023-04-25':
          case '2023-5-30':
          case '2023-05-30':
          case '2023-6-20':
          case '2023-06-20':
          case '2023-7-11':
          case '2023-07-11':
          case '2023-9-5':
          case '2023-09-05':
          case '2023-10-10':
          case '2023-11-14':
          case '2023-12-5':
          case '2023-12-05':
          case '2024-1-2':
          case '2024-01-02':
          case '2024-1-23':
          case '2024-01-23':
          case '2024-4-2':
          case '2024-04-02':
          case '2024-7-2':
          case '2024-07-02':
          case '2024-11-26':
          case '2025-1-14':
          case '2025-01-14':
          case '2025-2-18':
          case '2025-02-18':
          case '2025-4-29':
          case '2025-04-29':
          case '2025-5-20':
          case '2025-05-20':
            return (classes += 'iron-banner')
          case '2024-10-8':
          case '2024-10-08':
          case '2024-11-19':
          case '2024-1-7':
          case '2024-01-07':
            return (classes += 'episode-revenant')
          case '2025-2-4':
          case '2025-02-04':
          case '2025-3-11':
          case '2025-03-11':
          case '2025-4-1':
          case '2025-04-01':
            return (classes += 'episode-heresy')
          case '2025-5-6':
          case '2025-05-06':
            return (classes += 'rite-of-the-nine')
          case '2025-5-9':
          case '2025-05-09':
            return (classes += 'heavy-metal')
          default:
            return ''
        }
      default:
        return ''
    }
  }
}
