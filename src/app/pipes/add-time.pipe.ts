import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTime',
  pure: false
})
export class AddTimePipe implements PipeTransform {

  transform(activities: bungie.Activity[], modeFilter?: any): number {
    let count = 0;
    activities.forEach(activity => {
      if (!modeFilter
          || modeFilter === 0
          || modeFilter === '0'
          || modeFilter === activity.activityDetails.mode
          || +modeFilter === +activity.activityDetails.mode) {
        count += activity.values.activityDurationSeconds.basic.value;
        if (activity.values.leaveRemainingSeconds) {
          count -= activity.values.leaveRemainingSeconds.basic.value;
        }
      }
    });
    return count;
  }

}
