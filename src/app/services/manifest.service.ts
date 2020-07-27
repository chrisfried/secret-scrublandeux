import { Injectable } from '@angular/core';
import _ from 'lodash';
import { get, set, del } from 'idb-keyval';
import { deepEqual } from 'fast-equals';
import { BehaviorSubject, Subject, of, empty, from } from 'rxjs';
import { SettingsService } from './settings.service';
import { BungieHttpService } from './bungie-http.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  DestinyActivityDefinition,
  DestinyInventoryItemDefinition,
  DestinyActivityModeDefinition
} from 'bungie-api-ts/destiny2';

@Injectable()
export class ManifestService {
  alwaysLoadRemote = false;

  version: string | null = null;
  state: ManifestServiceState = {
    loaded: false
  };
  state$ = new BehaviorSubject<ManifestServiceState>(this.state);
  /** A signal for when we've loaded a new remote manifest. */
  newManifest$ = new Subject();
  defs: {
    Activity?: {
      get(hash: number): DestinyActivityDefinition;
    };
    InventoryItem?: {
      get(hash: number): DestinyInventoryItemDefinition;
    };
    ActivityMode?: {
      get(modeType: number): DestinyActivityModeDefinition;
    };
  };

  private localStorageKey = 'd2-manifest-version';
  private idbKey = 'd2-manifest';

  constructor(
    private settingsService: SettingsService,
    private bHttp: BungieHttpService,
    private http: HttpClient
  ) {
    const tables = ['Activity', 'InventoryItem', 'ActivityMode'];

    this.settingsService.userLangObs
      .pipe(
        switchMap(lang => {
          return this.bHttp.get(
            'https://www.bungie.net/Platform/Destiny2/Manifest/'
          );
        }),
        switchMap(res => {
          const data = res.Response;
          // await settingsReady; // wait for settings to be ready
          const language = this.settingsService.userLang.language;
          const path =
            data.jsonWorldContentPaths[language] ||
            data.jsonWorldContentPaths.en;

          // Use the path as the version, rather than the "version" field, because
          // Bungie can update the manifest file without changing that version.
          const version = path;
          this.version = version;

          try {
            if (this.alwaysLoadRemote) {
              throw new Error('Testing - always load remote');
            }

            // this.statusText = `${t('Manifest.Load')}...`;
            const currentManifestVersion = localStorage.getItem(
              this.localStorageKey
            );
            const currentWhitelist = JSON.parse(
              localStorage.getItem(this.localStorageKey + '-whitelist') || '[]'
            );
            if (
              currentManifestVersion === version &&
              deepEqual(currentWhitelist, tables)
            ) {
              const manifest = get<object>(this.idbKey);
              if (!manifest) {
                throw new Error('Empty cached manifest file');
              }
              return manifest;
            } else {
              throw new Error(
                `version mismatch: ${version} ${currentManifestVersion}`
              );
            }
          } catch (e) {
            return this.http.get(`https://www.bungie.net${path}`).pipe(
              map(response => {
                const manifest = _.pick(
                  response,
                  ...tables.map(t => `Destiny${t}Definition`)
                );

                // We intentionally don't wait on this promise
                this.saveManifestToIndexedDB(manifest, version, tables);

                this.newManifest$.next();
                return manifest;
              })
            );
          }
        }),
        map(manifest => {
          if (!manifest.DestinyActivityDefinition) {
            throw new Error('Manifest corrupted, please reload');
          }
          this.defs = {};
          tables.forEach(tableShort => {
            const table = `Destiny${tableShort}Definition`;
            if (tableShort === 'ActivityMode') {
              this.defs[tableShort] = {
                get(modeType: number) {
                  const dbTable = manifest[table];
                  if (!dbTable) {
                    throw new Error(
                      `Table ${table} does not exist in the manifest`
                    );
                  }
                  for (const hash in dbTable) {
                    if (dbTable[hash].modeType === modeType) {
                      return dbTable[hash];
                    }
                  }
                  throw new Error(
                    `ModeType ${modeType} does not exist in the manifest`
                  );
                }
              };
            } else {
              this.defs[tableShort] = {
                get(name: number) {
                  const dbTable = manifest[table];
                  if (!dbTable) {
                    throw new Error(
                      `Table ${table} does not exist in the manifest`
                    );
                  }
                  return dbTable[name];
                }
              };
            }
          });
          this.loaded = true;
        }),
        catchError((e, caught) => {
          const message = e.message || e;
          console.error(message);
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
            this.deleteManifestFile();
          }
          return empty();
        })
      )
      .subscribe();
  }

  set loaded(loaded: boolean) {
    this.setState({ loaded, error: undefined });
  }

  set statusText(statusText: string) {
    this.setState({ statusText });
  }

  // This is not an anonymous arrow function inside loadManifestRemote because of https://bugs.webkit.org/show_bug.cgi?id=166879
  private async saveManifestToIndexedDB(
    typedArray: object,
    version: string,
    tableWhitelist: string[]
  ) {
    try {
      await set(this.idbKey, typedArray);
      console.log(`Sucessfully stored manifest file.`);
      localStorage.setItem(this.localStorageKey, version);
      localStorage.setItem(
        this.localStorageKey + '-whitelist',
        JSON.stringify(tableWhitelist)
      );
    } catch (e) {
      console.error('Error saving manifest file', e);
      // showNotification({
      //   title: t('Help.NoStorage'),
      //   body: t('Help.NoStorageMessage'),
      //   type: 'error'
      // });
    }
  }

  private deleteManifestFile() {
    localStorage.removeItem(this.localStorageKey);
    del(this.idbKey);
  }

  /**
   * Returns a promise for the cached manifest of the specified
   * version as a Uint8Array, or rejects.
   */

  private setState(newState: Partial<ManifestServiceState>) {
    this.state = { ...this.state, ...newState };
    this.state$.next(this.state);
  }
}

export interface ManifestServiceState {
  loaded: boolean;
  error?: Error;
  statusText?: string;
}
