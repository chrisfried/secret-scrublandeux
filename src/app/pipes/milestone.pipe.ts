import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milestone'
})
export class MilestonePipe implements PipeTransform {

  transform(date: any, args?: any): any {
    switch (args) {
      case 'class':
        switch (date) {
          case '2014-9-9':
          case '2014-12-9':
          case '2015-5-19':
          case '2015-9-15':
          case '2016-4-12':
          case '2016-9-20':
          case '2017-3-28':
          case '2017-9-6':
          case '2017-10-24':
            return 'milestone';
          default:
            return '';
        }
      case 'text':
        switch (date) {
          case '2014-9-9':
            return ' | Destiny';
          case '2014-12-9':
            return ' | The Dark Below';
          case '2015-5-19':
            return ' | House of Wolves';
          case '2015-9-15':
            return ' | The Taken King';
          case '2016-4-12':
            return ' | The Taken Spring';
          case '2016-9-20':
            return ' | Rise of Iron';
          case '2017-3-28':
            return ' | Age of Triumph';
          case '2017-9-6':
            return ' | Destiny 2 Console';
          case '2017-10-24':
            return ' | Destiny 2 PC';
          default:
            return '';
        }
      default:
        return '';
    }
  }

}
