import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursPlayed'
})
export class HoursPlayedPipe implements PipeTransform {

  transform(minutes: number, args?: any): any {
    const h = Math.floor(minutes / 60);
    return h + 'h';
  }

}
