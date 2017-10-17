import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTime',
  pure: false
})
export class AddTimePipe implements PipeTransform {

  transform(activities: bungie.Activity[], args?: any): number {
    let count = 0;
    activities.forEach(activity => {
      count += activity.values.timePlayedSeconds.basic.value;
    });
    return count;
  }

}
