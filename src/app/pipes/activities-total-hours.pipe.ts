import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activitiesTotalHours',
  pure: false
})
export class ActivitiesTotalHoursPipe implements PipeTransform {

  transform(activities: bungie.Activity[], args?: any): any {
    const time = activities.reduce(function(totalTime, activity) {
      let newTime = totalTime + activity.values.activityDurationSeconds.basic.value;
      if (activity.values.leaveRemainingSeconds) {
        newTime -= activity.values.leaveRemainingSeconds.basic.value;
      }
      return newTime;
    }, 0);
    const h = Math.floor(time / 3600);
    return h + 'h';
  }

}
