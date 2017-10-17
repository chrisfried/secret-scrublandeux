import { Pipe, PipeTransform } from '@angular/core';
import { DestinyActivityDefinition } from '../defs/DestinyActivityDefinition';
import { DestinyActivityModeDefinition } from '../defs/DestinyActivityModeDefinition';

@Pipe({
  name: 'destinyHash'
})
export class DestinyHashPipe implements PipeTransform {

  constructor (
  ) {}

  transform(hash: number, type: string): string {
    try {
      switch (type) {
        case 'activityName':
          return DestinyActivityDefinition['en'][hash].name;
        case 'activityMode':
          return DestinyActivityModeDefinition['en'][hash].name;
        default:
          return '';
      }
    } catch (e) {
      return 'UNDEFINED';
    }
  }

}
