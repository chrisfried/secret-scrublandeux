import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseMinutesPlayed'
})
export class ParseMinutesPlayedPipe implements PipeTransform {

  transform(minutes: number, args?: any): any {
    const d = Math.floor(minutes / 1440);
    const h = Math.floor(minutes % 1440 / 60);
    const m = Math.floor(minutes % 1440 % 60);
    return d + 'd ' + h + 'h ' + m + 'm';
  }

}
