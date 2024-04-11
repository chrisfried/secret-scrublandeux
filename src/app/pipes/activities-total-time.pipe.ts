import { Pipe, PipeTransform } from '@angular/core'
import { scrubland } from '../scrubland.typings'

@Pipe({
  name: 'activitiesTotalTime',
  pure: false,
})
export class ActivitiesTotalTimePipe implements PipeTransform {
  transform(activities: scrubland.Activity[], periods?: number): any {
    let time = activities.reduce(function (totalTime, activity) {
      return totalTime + +activity.values.timePlayedSeconds.basic.value
    }, 0)
    if (periods) {
      time = time / periods
    }
    const d = Math.floor(time / 86400)
    const h = Math.floor((time % 86400) / 3600)
    const m = Math.floor(((time % 86400) % 3600) / 60)
    return d > 0 ? `${d}d ${h}h ${m}m` : h > 0 ? `${h}h ${m}m` : `${m}m`
  }
}
