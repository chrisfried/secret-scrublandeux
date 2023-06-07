import { Pipe, PipeTransform } from '@angular/core'
import { scrubland } from '../scrubland.typings'

@Pipe({
  name: 'addTime',
  pure: false,
})
export class AddTimePipe implements PipeTransform {
  transform(activities: scrubland.Activity[], modeFilter?: any[]): number {
    let count = 0
    activities.forEach((activity) => {
      if (modeFilter.length === 0) {
        count += activity.values.timePlayedSeconds.basic.value
        return
      }

      for (let i = 0; i < modeFilter.length; i++) {
        if (
          modeFilter[i] === activity.activityDetails.mode ||
          activity.activityDetails.modes.indexOf(+modeFilter[i]) > -1
        ) {
          count += activity.values.timePlayedSeconds.basic.value
        }
      }
    })
    return count
  }
}
