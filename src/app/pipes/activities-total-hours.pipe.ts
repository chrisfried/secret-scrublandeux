import { Pipe, PipeTransform } from '@angular/core';
import { scrubland } from '../scrubland.typings';

@Pipe({
  name: 'activitiesTotalHours',
  pure: false
})
export class ActivitiesTotalHoursPipe implements PipeTransform {
  transform(activities: scrubland.Activity[], args?: any): any {
    const time = activities.reduce(function(totalTime, activity) {
      return totalTime + +activity.values.timePlayedSeconds.basic.value;
    }, 0);
    const h = Math.floor(time / 3600);
    return h + 'h';
  }
}
