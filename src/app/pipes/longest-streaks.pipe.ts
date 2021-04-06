import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'longestStreaks',
  pure: false,
})
export class LongestStreaksPipe implements PipeTransform {
  transform(days: any, args?: any): any {
    let currentActive = 0
    let currentInactive = 0
    let longestActive = 0
    let longestInactive = 0
    for (let i = 0; i < days.length; i++) {
      if (days[i].length > 0) {
        currentInactive = 0
        currentActive++
        if (currentActive > longestActive) {
          longestActive = currentActive
        }
      } else if (longestActive > 0) {
        currentActive = 0
        currentInactive++
        if (currentInactive > longestInactive) {
          longestInactive = currentInactive
        }
      }
    }
    return longestActive + ' days active | ' + longestInactive + ' days inactive'
  }
}
