import { Pipe, PipeTransform } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ManifestService } from './manifest.service'

@Pipe({
  name: 'manifest',
})
export class ManifestPipe implements PipeTransform {
  constructor(private manifestService: ManifestService) {}

  transform(hash: number, type: string): Observable<string> {
    return this.manifestService.state$.pipe(
      map((state) => {
        if (state.loaded) {
          switch (type) {
            case 'activityName':
              return this.manifestService.defs.Activity.get(hash)?.displayProperties.name
            case 'activityMode':
              return this.manifestService.defs.ActivityMode.get(hash)?.displayProperties.name
            case 'activityIcon':
              return this.manifestService.defs.Activity.get(hash)?.displayProperties.hasIcon
                ? `https://bungie.net${this.manifestService.defs.Activity.get(hash).displayProperties.icon}`
                : ``
            default:
              return ''
          }
        }
      })
    )
  }
}
