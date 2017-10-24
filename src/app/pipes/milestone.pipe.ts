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
          case '2017-10-24':
            return 'milestone';
          default:
            return '';
        }
      case 'text':
        switch (date) {
          case '2017-9-6':
            return ' | Destiny 2 Console Release';
          case '2017-10-24':
            return ' | Destiny 2 PC Release';
          default:
            return '';
        }
      default:
        return '';
    }
  }

}
