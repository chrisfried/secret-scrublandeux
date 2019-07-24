import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milestone'
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
          case '2019-9-17':
          case '2019-09-17':
            return 'release';
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
            return 'raid';
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
            return 'event';
          default:
            return '';
        }
      case 'text':
        switch (date) {
          case '2017-9-6':
          case '2017-09-06':
            return ' | Destiny 2 Console';
          case '2017-9-13':
          case '2017-09-13':
            return ' | Leviathan Raid';
          case '2017-10-24':
            return ' | Destiny 2 PC';
          case '2017-12-5':
          case '2017-12-05':
            return ' | Curse of Osiris';
          case '2017-12-6':
          case '2017-12-06':
            return ' | Eater of Worlds Raid Lair';
          case '2018-5-8':
          case '2018-05-08':
            return ' | Warmind';
          case '2018-5-11':
          case '2018-05-11':
            return ' | Spire of Stars Raid Lair';
          case '2018-7-8':
          case '2018-07-08':
            return ' | Moments of Triumph';
          case '2018-7-20':
          case '2018-07-20':
            return ' | The Whisper';
          case '2018-7-31':
          case '2018-07-31':
            return ' | Solstice of Heroes';
          case '2018-9-4':
          case '2018-09-04':
            return ' | Forsaken';
          case '2018-9-14':
          case '2018-09-14':
            return ' | Last Wish Raid';
          case '2018-12-4':
          case '2018-12-04':
            return ' | Season of the Forge | Volundr Forge';
          case '2018-12-7':
          case '2018-12-07':
            return ' | Gofannon Forge & Scourge of the Past Raid';
          case '2018-12-11':
            return ' | The Dawning';
          case '2018-12-18':
            return ' | Izanami Forge';
          case '2019-1-8':
          case '2019-01-08':
            return ' | Niobe Labs';
          case '2019-1-29':
          case '2019-01-29':
            return ' | The Draw Quest';
          case '2019-2-5':
          case '2019-02-05':
            return ' | Crimson Days';
          case '2019-3-5':
          case '2019-03-05':
            return ' | Season of the Drifter | Gambit Prime: New Arcadia & Reckoning Tier 1';
          case '2019-3-8':
          case '2019-03-08':
            return ' | Reckoning Tier 2';
          case '2019-3-12':
          case '2019-03-12':
            return ' | Gambit Prime: Deep Six & Thorn Quest';
          case '2019-3-15':
          case '2019-03-15':
            return ' | Invitations of the Nine & Reckoning Tier 3';
          case '2019-3-19':
          case '2019-03-19':
            return ' | Gambit Prime: Legion\'s Folly';
          case '2019-3-26':
          case '2019-03-26':
            return ' | Gambit Prime: Emerald Coast';
          case '2019-4-2':
          case '2019-04-02':
            return ' | Gambit Prime: All Maps';
          case '2019-4-9':
          case '2019-04-09':
            return ' | Arc Week';
          case '2019-4-16':
          case '2019-04-16':
            return ' | The Revelry';
          case '2019-6-4':
          case '2019-06-04':
            return ' | Season of Opulence | Menagerie & Crown of Sorrow Raid';
          case '2019-6-11':
          case '2019-06-11':
            return ' | New Menagerie Boss & Truth Quest';
          case '2019-6-18':
          case '2019-06-18':
            return ' | New Menagerie Boss & Iron Banner Quest';
          case '2019-6-25':
          case '2019-06-25':
            return ' | Menagerie Heroic Mode';
          case '2019-7-2':
          case '2019-07-02':
            return ' | Lumina Quest';
          case '2019-7-9':
          case '2019-07-09':
            return ' | Tribute Hall & Moments of Triumph';
          case '2019-7-30':
          case '2019-07-30':
            return ' | Solstice of Heroes';
          case '2019-9-17':
          case '2019-09-17':
            return ' | Shadowkeep';
          default:
            return '';
        }
      default:
        return '';
    }
  }
}
