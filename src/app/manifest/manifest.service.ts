import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  DestinyActivityDefinition,
  DestinyActivityModeDefinition,
  DestinyManifest,
  getDestinyManifest,
  ServerResponse,
} from 'bungie-api-ts/destiny2'
import { deepEqual } from 'fast-equals'
import { del, get, set } from 'idb-keyval'
import _ from 'lodash'
import { BehaviorSubject, EMPTY, from, Subject } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ManifestService {
  alwaysLoadRemote = false

  version: string | null = null
  state: ManifestServiceState = {
    loaded: false,
  }
  state$ = new BehaviorSubject<ManifestServiceState>(this.state)
  /** A signal for when we've loaded a new remote manifest. */
  newManifest$ = new Subject()
  defs: {
    Activity?: {
      dbTable: any[]
      get(hash: number): DestinyActivityDefinition
    }
    ActivityMode?: {
      dbTable: any[]
      get(modeType: number): DestinyActivityModeDefinition
    }
  }

  private localStorageKey = 'd2-manifest-version'
  private idbKey = 'd2-manifest'

  constructor(private http: HttpClient) {
    const tables = ['Activity', 'ActivityMode']

    from(
      getDestinyManifest((config: { url: string; method: 'GET' | 'POST'; params: any; body: any }) =>
        this.http
          .request(config.method, config.url, {
            params: config.params,
            body: config.body,
          })
          .toPromise()
      )
    )
      .pipe(
        switchMap((res: ServerResponse<DestinyManifest>) => {
          const data = res.Response
          // await settingsReady; // wait for settings to be ready
          const language = 'en'
          const path = data.jsonWorldContentPaths[language] || data.jsonWorldContentPaths.en

          // Use the path as the version, rather than the "version" field, because
          // Bungie can update the manifest file without changing that version.
          const version = path
          this.version = version

          try {
            if (this.alwaysLoadRemote) {
              throw new Error('Testing - always load remote')
            }

            // this.statusText = `${t('Manifest.Load')}...`;
            const currentManifestVersion = localStorage.getItem(this.localStorageKey)
            const currentWhitelist = JSON.parse(localStorage.getItem(this.localStorageKey + '-whitelist') || '[]')
            if (currentManifestVersion === version && deepEqual(currentWhitelist, tables)) {
              const manifest = get<object>(this.idbKey)
              if (!manifest) {
                throw new Error('Empty cached manifest file')
              }
              return manifest
            } else {
              throw new Error(`version mismatch: ${version} ${currentManifestVersion}`)
            }
          } catch (e) {
            return this.http.get(`https://www.bungie.net${path}`, { withCredentials: false }).pipe(
              map((response) => {
                const manifest = _.pick(response, ...tables.map((t) => `Destiny${t}Definition`))

                // We intentionally don't wait on this promise
                this.saveManifestToIndexedDB(manifest, version, tables)

                this.newManifest$.next()
                return manifest
              })
            )
          }
        }),
        map((manifest) => {
          if (!manifest.DestinyActivityDefinition) {
            throw new Error('Manifest corrupted, please reload')
          }
          this.defs = {}
          tables.forEach((tableShort) => {
            const table = `Destiny${tableShort}Definition`
            if (tableShort === 'ActivityMode') {
              this.defs[tableShort] = {
                get(modeType: number) {
                  const dbTable = manifest[table]
                  if (!dbTable) {
                    throw new Error(`Table ${table} does not exist in the manifest`)
                  }
                  for (const hash in dbTable) {
                    if (dbTable[hash].modeType === modeType) {
                      return dbTable[hash]
                    }
                  }
                  throw new Error(`ModeType ${modeType} does not exist in the manifest`)
                },
                dbTable: manifest[table],
              }
            } else {
              this.defs[tableShort] = {
                get(name: number) {
                  const dbTable = manifest[table]
                  if (!dbTable) {
                    throw new Error(`Table ${table} does not exist in the manifest`)
                  }
                  return dbTable[name]
                },
                dbTable: manifest[table],
              }
            }
          })
          this.loaded = true
        }),
        catchError((e, caught) => {
          const message = e.message || e
          console.error(message)
          // const statusText = t('Manifest.Error', { error: message });

          if (e instanceof TypeError || e.status === -1) {
            // message = navigator.onLine
            //   ? t('BungieService.NotConnectedOrBlocked')
            //   : t('BungieService.NotConnected');
          } else if (e.status === 503 || e.status === 522 /* cloudflare */) {
            // message = t('BungieService.Difficulties');
          } else if (e.status < 200 || e.status >= 400) {
            // message = t('BungieService.NetworkError', {
            //   status: e.status,
            //   statusText: e.statusText
            // });
          } else {
            // Something may be wrong with the manifest
            this.deleteManifestFile()
          }
          return EMPTY
        })
      )
      .subscribe()
  }

  set loaded(loaded: boolean) {
    this.setState({ loaded, error: undefined })
  }

  set statusText(statusText: string) {
    this.setState({ statusText })
  }

  // This is not an anonymous arrow function inside loadManifestRemote because of https://bugs.webkit.org/show_bug.cgi?id=166879
  private async saveManifestToIndexedDB(typedArray: object, version: string, tableWhitelist: string[]) {
    try {
      await set(this.idbKey, typedArray)
      localStorage.setItem(this.localStorageKey, version)
      localStorage.setItem(this.localStorageKey + '-whitelist', JSON.stringify(tableWhitelist))
    } catch (e) {
      console.error('Error saving manifest file', e)
      // showNotification({
      //   title: t('Help.NoStorage'),
      //   body: t('Help.NoStorageMessage'),
      //   type: 'error'
      // });
    }
  }

  private deleteManifestFile() {
    localStorage.removeItem(this.localStorageKey)
    del(this.idbKey)
  }

  /**
   * Returns a promise for the cached manifest of the specified
   * version as a Uint8Array, or rejects.
   */

  private setState(newState: Partial<ManifestServiceState>) {
    this.state = { ...this.state, ...newState }
    this.state$.next(this.state)
  }
}

export interface ManifestServiceState {
  loaded: boolean
  error?: Error
  statusText?: string
}
