import { Pipe, PipeTransform } from '@angular/core'
import { DestinyActivityModeType } from 'bungie-api-ts/destiny2'
import { scrubland } from '../scrubland.typings'

@Pipe({
  name: 'addTime',
  pure: false,
})
export class AddTimePipe implements PipeTransform {
  transform(activities: scrubland.Activity[], modeFilter?: DestinyActivityModeType[]): number {
    let count = 0
    activities
      .filter((activity) => {
        if (modeFilter.length === 0 || modeFilter.indexOf(DestinyActivityModeType.None) > -1) {
          return true
        }
        if (modeFilter.indexOf(activity.activityDetails.mode) > -1) {
          return true
        }
        return (
          modeFilter.filter((mode) => {
            if (activity.activityDetails.modes.indexOf(mode) > -1) {
              return true
            }
          }).length > 0
        )
      })
      .forEach((activity) => {
        count += activity.values.timePlayedSeconds.basic.value
      })
    return count
  }
}
