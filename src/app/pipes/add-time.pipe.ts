import { Pipe, PipeTransform } from '@angular/core'
import { scrubland } from '../scrubland.typings'

@Pipe({
  name: 'addTime',
  pure: false,
})
export class AddTimePipe implements PipeTransform {
  transform(activities: scrubland.Activity[], modeFilter?: any): number {
    let count = 0
    activities.forEach((activity) => {
      if (
        !modeFilter ||
        modeFilter === 0 ||
        modeFilter === '0' ||
        modeFilter === activity.activityDetails.mode ||
        activity.activityDetails.modes.indexOf(+modeFilter) > -1
      ) {
        count += activity.values.timePlayedSeconds.basic.value
      }
    })
    return count
  }
}
