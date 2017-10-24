import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activitiesTotalTime',
  pure: false
})
export class ActivitiesTotalTimePipe implements PipeTransform {

  transform(activities: bungie.Activity[], args?: any): any {
    const time = activities.reduce(function(totalTime, activity) {
      let newTime = totalTime + activity.values.activityDurationSeconds.basic.value;
      if (activity.values.leaveRemainingSeconds) {
        newTime -= activity.values.leaveRemainingSeconds.basic.value;
      }
      return newTime;
    }, 0);
    const d = Math.floor(time / 86400);
    const h = Math.floor(time % 86400 / 3600);
    const m = Math.floor(time % 86400 % 3600 / 60);
    return d + 'd ' + h + 'h ' + m + 'm';
  }

}
