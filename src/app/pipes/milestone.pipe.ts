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
            return 'milestone';
          default:
            return '';
        }
      case 'text':
        switch (date) {
          case '2017-9-6':
          case '2017-09-06':
            return ' | Destiny 2 Console';
          case '2017-10-24':
            return ' | Destiny 2 PC';
          case '2017-12-5':
          case '2017-12-05':
            return ' | Curse of Osiris';
          case '2018-5-8':
          case '2018-05-08':
            return ' | Warmind';
          case '2018-09-04':
            return ' | Forsaken';
          default:
            return '';
        }
      default:
        return '';
    }
  }

}
