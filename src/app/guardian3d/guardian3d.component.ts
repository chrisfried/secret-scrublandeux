import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ServerResponse } from 'bungie-api-ts/common'
import {
  DestinyActivityHistoryResults,
  DestinyCharacterComponent,
  DestinyComponentType,
  DestinyProfileResponse,
  getActivityHistory,
  GetActivityHistoryParams,
  getProfile,
  GetProfileParams,
} from 'bungie-api-ts/destiny2'
import { getMembershipDataForCurrentUser, UserMembershipData } from 'bungie-api-ts/user'
import { BehaviorSubject, EMPTY, forkJoin, Observable, Subscription } from 'rxjs'
import { distinctUntilChanged, map, switchMap, tap, take } from 'rxjs/operators'
import { BungieAuthService } from '../bungie-auth/bungie-auth.service'
import { ManifestService } from '../manifest/manifest.service'
import { scrubland } from '../scrubland.typings'
import { BungieQueueService } from '../services/queue.service'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'
import { CSG } from 'three-csg-ts'
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-guardian-3d',
  templateUrl: './guardian3d.component.html',
  styleUrls: ['./guardian3d.component.scss'],
})
export class Guardian3DComponent implements OnInit, OnDestroy {
  private subs: Subscription[]
  private membershipDataForCurrentUser$: BehaviorSubject<ServerResponse<UserMembershipData>> = new BehaviorSubject(undefined)
  private accountResponse$: BehaviorSubject<ServerResponse<DestinyProfileResponse>[]> = new BehaviorSubject([])
  private flatDaysBS: BehaviorSubject<any[]>
  public displayName = ''
  public downloadLink = ''
  public characters$: Observable<DestinyCharacterComponent[]>
  public minutesPlayedTotal: Observable<number>
  public activities: scrubland.Activity[]
  public days: {
    [year: number]: {
      [month: number]: {
        [day: number]: scrubland.Activity[]
      }
    }
  }
  public flatDays: scrubland.Activity[][]
  public seasons: {
    number: number
    name: string
    days: scrubland.Activity[][]
    startDate: Date
    startDateString?: string
    endDateString?: string
  }[]
  public yearKeys: string[]
  public monthKeys: {
    [year: number]: number[]
  }
  public monthOffsets: { [year: number]: { [month: number]: number } }
  public dayKeys: {
    [year: number]: {
      [month: number]: number[]
    }
  }
  public Math: Math
  public calendarFilter: any
  public modeOptions: any[]
  public loadingArray: { loading: boolean }[]
  public errorStatus: string
  public errorMessage: string
  public hideDownloadButtons = false

  constructor(
    public dialog: MatDialog,
    private manifestService: ManifestService,
    private bungieQueue: BungieQueueService,
    private bungieAuth: BungieAuthService,
    private readonly zone: NgZone
  ) {
    this.Math = Math
  }

  addDay(day: Date) {
    if (!this.days[day.getFullYear()]) {
      this.days[day.getFullYear()] = {}
    }
    if (!this.days[day.getFullYear()][day.getMonth() + 1]) {
      this.days[day.getFullYear()][day.getMonth() + 1] = {}
    }
    if (!this.days[day.getFullYear()][day.getMonth() + 1][day.getDate()]) {
      this.days[day.getFullYear()][day.getMonth() + 1][day.getDate()] = []
    }
    this.seasons.some((season) => {
      if (day >= season.startDate) {
        season.days.push(this.days[day.getFullYear()][day.getMonth() + 1][day.getDate()])
        return true
      }
    })
    this.flatDays.push(this.days[day.getFullYear()][day.getMonth() + 1][day.getDate()])
  }

  ngOnInit() {
    this.loadingArray = []
    this.calendarFilter = '0'
    this.subs = []
    this.activities = []
    this.days = {}
    this.flatDays = []
    this.seasons = [
      {
        number: 15,
        name: 'Season of the Lost',
        days: [],
        startDate: new Date('2021-8-24'),
      },
      {
        number: 14,
        name: 'Season of the Splicer',
        days: [],
        startDate: new Date('2021-5-11'),
      },
      {
        number: 13,
        name: 'Season of the Chosen',
        days: [],
        startDate: new Date('2021-2-9'),
      },
      {
        number: 12,
        name: 'Season of the Hunt',
        days: [],
        startDate: new Date('2020-11-10'),
      },
      {
        number: 11,
        name: 'Season of Arrivals',
        days: [],
        startDate: new Date('2020-6-9'),
      },
      {
        number: 10,
        name: 'Season of the Worthy',
        days: [],
        startDate: new Date('2020-3-10'),
      },
      {
        number: 9,
        name: 'Season of Dawn',
        days: [],
        startDate: new Date('2019-12-10'),
      },
      {
        number: 8,
        name: 'Season of Undying',
        days: [],
        startDate: new Date('2019-10-1'),
      },
      {
        number: 7,
        name: 'Season of Opulence',
        days: [],
        startDate: new Date('2019-6-4'),
      },
      {
        number: 6,
        name: 'Season of the Drifter',
        days: [],
        startDate: new Date('2019-3-5'),
      },
      {
        number: 5,
        name: 'Season of the Forge',
        days: [],
        startDate: new Date('2018-12-4'),
      },
      {
        number: 4,
        name: 'Season of the Outlaw',
        days: [],
        startDate: new Date('2018-9-4'),
      },
      {
        number: 3,
        name: 'Warmind',
        days: [],
        startDate: new Date('2018-5-8'),
      },
      {
        number: 2,
        name: 'Curse of Osiris',
        days: [],
        startDate: new Date('2017-12-5'),
      },
      {
        number: 1,
        name: 'Destiny 2',
        days: [],
        startDate: new Date('2017-9-5'),
      },
    ]
    this.flatDaysBS = new BehaviorSubject([])
    this.manifestService.state$.subscribe((state) => {
      if (state.loaded) {
        this.modeOptions = Object.keys(this.manifestService.defs.ActivityMode.dbTable)
          .map((key) => this.manifestService.defs.ActivityMode.dbTable[key].modeType)
          .sort()
      }
    })
    this.errorStatus = ''
    this.errorMessage = ''

    const day = new Date('2017-09-05T17:00:00Z')
    const now = new Date()
    while (day <= now) {
      this.addDay(day)
      day.setDate(day.getDate() + 1)
    }
    this.seasons.reverse()
    this.seasons.forEach((season, index) => {
      season.startDateString = formatDate(season.startDate, 'shortDate', navigator.language || 'en-US')
      if (this.seasons[index + 1]) {
        season.endDateString = formatDate(this.seasons[index + 1].startDate, 'shortDate', navigator.language || 'en-US')
      }
    })
    this.flatDaysBS.next(this.flatDays)
    this.yearKeys = Object.keys(this.days)
    this.monthKeys = {}
    this.monthOffsets = { 2017: { 9: 0 } }
    let previousOffset = 0
    let previousCount = 28
    this.dayKeys = {}
    this.yearKeys.forEach((year) => {
      this.monthKeys[year] = Object.keys(this.days[year])
      if (!this.monthOffsets[year]) {
        this.monthOffsets[year] = {}
      }
      this.dayKeys[year] = {}
      this.monthKeys[year].forEach((month) => {
        if (!this.monthOffsets[year][month]) {
          this.monthOffsets[year][month] = (previousCount + previousOffset) % 7
          previousCount = Object.keys(this.days[year][month]).length
          previousOffset = this.monthOffsets[year][month]
        }
        this.dayKeys[year][month] = Object.keys(this.days[year][month])
      })
    })

    this.subs.push(
      this.bungieAuth.hasValidAccessToken$
        .pipe(
          distinctUntilChanged(),
          tap((hasValidAccessToken) => {
            if (hasValidAccessToken) {
              const action = getMembershipDataForCurrentUser
              const callback = (response: ServerResponse<UserMembershipData>) => {
                this.membershipDataForCurrentUser$.next(response)
              }
              this.bungieQueue.addToQueue('getProfile', action, callback)
            }
          })
        )
        .subscribe()
    )

    this.subs.push(
      this.membershipDataForCurrentUser$
        .pipe(
          distinctUntilChanged(),
          switchMap((userMembershipData) =>
            forkJoin(
              userMembershipData?.Response?.destinyMemberships.map((destinyMembership) => {
                const bs: BehaviorSubject<ServerResponse<DestinyProfileResponse>> = new BehaviorSubject(undefined)
                const { membershipId, membershipType } = destinyMembership
                const action = getProfile
                const callback = (response: ServerResponse<DestinyProfileResponse>) => {
                  bs.next(response)
                  bs.complete()
                }
                const params: GetProfileParams = {
                  destinyMembershipId: membershipId,
                  membershipType,
                  components: [DestinyComponentType.Profiles, DestinyComponentType.Characters],
                }
                this.bungieQueue.addToQueue('getProfile', action, callback, params)
                return bs
              }) ?? EMPTY
            )
          ),
          map((responses) => this.accountResponse$.next(responses))
        )
        .subscribe()
    )

    this.accountResponse$
      .pipe(
        distinctUntilChanged(),
        tap((r) => console.log('accountResponse', r)),
        map((responses) => responses[0]),
        map((res) => {
          if (res?.ErrorCode !== 1 && res?.ErrorStatus) {
            this.errorStatus = res.ErrorStatus
            this.errorMessage = res.Message
          }
          this.displayName = res?.Response?.profile?.data?.userInfo?.displayName
        })
      )
      .subscribe()
    this.characters$ = this.accountResponse$.pipe(
      distinctUntilChanged(),
      map((responses) => {
        const characters = []
        for (const res of responses) {
          if (res?.ErrorCode !== 1 && res?.ErrorStatus) {
            this.errorStatus = res.ErrorStatus
            this.errorMessage = res.Message
          }
          try {
            Object.keys(res.Response.characters.data).forEach((key) => {
              const character = {
                ...res.Response.profile.data,
                ...res.Response.characters.data[key],
              }
              characters.push(res.Response.characters.data[key])
            })
          } catch (e) {}
        }
        return characters
      })
    )

    this.minutesPlayedTotal = this.characters$.pipe(
      map((characters) => {
        let minutesPlayed = 0
        characters.forEach((character) => {
          minutesPlayed += +character.minutesPlayedTotal
        })
        return minutesPlayed
      })
    )

    this.subs.push(
      this.characters$.pipe(distinctUntilChanged()).subscribe((characters) => {
        this.activities = []
        characters.forEach((character) => {
          const params: GetActivityHistoryParams = {
            destinyMembershipId: character.membershipId,
            membershipType: character.membershipType,
            characterId: character.characterId,
            mode: 0,
            count: 250,
          }
          this.addHistorySub({ ...params, page: 0 })
          this.addHistorySub({ ...params, page: 1 })
          this.addHistorySub({ ...params, page: 2 })
        })
      })
    )
  }

  addHistorySub(params: GetActivityHistoryParams) {
    const loading = { loading: true }
    this.loadingArray.push(loading)

    const { page } = params

    const behaviorSubject: BehaviorSubject<ServerResponse<DestinyActivityHistoryResults>> = new BehaviorSubject(undefined)
    const action = getActivityHistory
    const callback = (response: ServerResponse<DestinyActivityHistoryResults>) => {
      behaviorSubject.next(response)
    }
    this.bungieQueue.addToQueue('getActivityHistory', action, callback, params)

    this.subs.push(
      behaviorSubject.subscribe((res: ServerResponse<DestinyActivityHistoryResults>) => {
        if (res?.ErrorCode !== 1 && res?.ErrorStatus) {
          this.errorStatus = res.ErrorStatus
          this.errorMessage = res.Message
        }
        if (res?.Response.activities && res?.Response.activities.length) {
          this.addHistorySub({ ...params, page: page + 3 })
          res.Response.activities.forEach((activity: scrubland.Activity) => {
            activity.characterId = params.characterId
            const period = new Date(new Date(activity.period).getTime() - 17 * 60 * 60 * 1000)
            const startDate = period.getTime() / 1000 + activity.values.startSeconds.basic.value
            const endDate = startDate + activity.values.timePlayedSeconds.basic.value
            activity.startDate = new Date(startDate * 1000)
            activity.endDate = new Date(endDate * 1000)
            this.activities.push(activity)
            try {
              this.days[activity.startDate.getUTCFullYear()][activity.startDate.getUTCMonth() + 1][activity.startDate.getUTCDate()].push(
                activity
              )
            } catch (e) {}
            this.flatDaysBS.next(this.flatDays)
          })
        }
        if (res) {
          loading.loading = false
          this.flatDaysBS.next(this.flatDays)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
  }

  three(
    season: {
      number: number
      name: string
      days: scrubland.Activity[][]
      startDate: Date
      startDateString?: string
      endDateString?: string
    },
    displayName,
    seasonCount: number
  ) {
    this.zone.runOutsideAngular((_) => {
      let button
      for (let i = 1; i <= seasonCount; i++) {
        button = document.getElementById('download' + i)
        button.setAttribute('disabled', 'true')
      }
      button = document.getElementById('download' + season.number)
      button.innerHTML = 'Generating...'
      let geometry: THREE.BufferGeometry, mesh: THREE.Mesh, newMesh: THREE.Mesh
      let x, y, z, textHeight, textDepth
      const m = 2.5

      init()

      function init() {
        const scene = new THREE.Scene()
        const baseHeight = 2.5

        const a = Math.sqrt(1 + baseHeight * baseHeight - 2 * baseHeight * Math.cos(Math.PI / 2))
        const rotation = Math.acos((a * a + baseHeight * baseHeight - 1) / (2 * a * baseHeight))

        x = Math.ceil(season.days.length / 7 + 2) * m
        y = baseHeight * m
        z = 9 * m
        geometry = new THREE.BoxGeometry(x, y, z)

        const material = new THREE.MeshStandardMaterial()
        mesh = new THREE.Mesh(geometry, material)
        const position = mesh.geometry.getAttribute('position')
        position.setXYZ(2, position.getX(2) + m, position.getY(2), position.getZ(2) + m)
        position.setXYZ(3, position.getX(3) + m, position.getY(3), position.getZ(3) - m)
        position.setXYZ(6, position.getX(6) - m, position.getY(6), position.getZ(6) - m)
        position.setXYZ(7, position.getX(7) - m, position.getY(7), position.getZ(7) + m)
        position.setXYZ(12, position.getX(12) - m, position.getY(12), position.getZ(12) + m)
        position.setXYZ(13, position.getX(13) + m, position.getY(13), position.getZ(13) + m)
        position.setXYZ(14, position.getX(14) - m, position.getY(14), position.getZ(14) - m)
        position.setXYZ(15, position.getX(15) + m, position.getY(15), position.getZ(15) - m)
        position.setXYZ(18, position.getX(18) - m, position.getY(18), position.getZ(18) + m)
        position.setXYZ(19, position.getX(19) + m, position.getY(19), position.getZ(19) + m)
        position.setXYZ(22, position.getX(22) + m, position.getY(22), position.getZ(22) - m)
        position.setXYZ(23, position.getX(23) - m, position.getY(23), position.getZ(23) - m)

        x = (Math.ceil(season.days.length / 7 + 2) / 2 - 1.5) * m
        y = -y / 2
        z = 3 * m
        mesh.position.set(x, y, z)

        mesh.updateMatrix()

        for (let i = 0; i < season.days.length; i++) {
          const j = i
          const day = season.days[i]
          if (day.length) {
            const time = day.reduce((prev, activity) => prev + activity.values.timePlayedSeconds.basic.value, 0)
            const height = (time / 86400) * 24

            x = 1 * m
            y = height * m
            z = 1 * m
            geometry = new THREE.BoxGeometry(x, y, z)

            newMesh = new THREE.Mesh(geometry, material)

            x = (Math.floor(j / 7) - Math.floor(j / 364) * 52) * m
            y = (height / 2) * m
            z = ((j % 7) + Math.floor(j / 364) * 7) * m
            newMesh.position.set(x, y, z)

            newMesh.updateMatrix()
            mesh = CSG.union(mesh, newMesh)
          }
        }

        const loader = new FontLoader()

        loader.load('assets/fonts/helvetiker_bold.typeface.json', function (font) {
          textHeight = 1 * m
          textDepth = 0.25 * m
          geometry = new TextGeometry(season.name, {
            font: font,
            size: textHeight,
            height: textDepth,
          })
          geometry.computeBoundingBox()

          x = ((Math.ceil(season.days.length / 7) - geometry.boundingBox.max.x / m) / 2 - 0.5) * m
          y = textHeight * -1.75
          z = 8.2 * m
          newMesh = new THREE.Mesh(geometry, material)
          newMesh.position.set(x, y, z)
          newMesh.rotateX(-rotation)

          newMesh.updateMatrix()
          mesh = CSG.union(mesh, newMesh)
          newMesh.geometry.dispose()

          geometry = new TextGeometry(displayName, {
            font: font,
            size: textHeight,
            height: textDepth,
          })
          newMesh = new THREE.Mesh(geometry, material)
          geometry.computeBoundingBox()

          x = ((Math.ceil(season.days.length / 7) - geometry.boundingBox.max.x / m) / 2 - 0.5 + geometry.boundingBox.max.x / m) * m
          y = textHeight * -1.75
          z = -2.2 * m
          newMesh.position.set(x, y, z)
          newMesh.rotateX(rotation)
          newMesh.rotateY(Math.PI)

          newMesh.updateMatrix()
          mesh = CSG.union(mesh, newMesh)

          if (season.startDateString) {
            geometry = new TextGeometry(season.startDateString, {
              font: font,
              size: textHeight,
              height: textDepth,
            })
            newMesh = new THREE.Mesh(geometry, material)
            geometry.computeBoundingBox()

            x = -2.2 * m
            y = textHeight * -1.75
            z = ((7 - geometry.boundingBox.max.x / m) / 2 - 0.5) * m
            newMesh.position.set(x, y, z)
            newMesh.rotateZ(-rotation)
            newMesh.rotateY(-Math.PI / 2)

            newMesh.updateMatrix()
            mesh = CSG.union(mesh, newMesh)
          }

          if (season.endDateString) {
            geometry = new TextGeometry(season.endDateString, {
              font: font,
              size: textHeight,
              height: textDepth,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0,
              bevelSize: 0,
              bevelOffset: 0,
              bevelSegments: 0,
            })
            newMesh = new THREE.Mesh(geometry, material)
            geometry.computeBoundingBox()

            x = (Math.ceil(season.days.length / 7) + 1.2) * m
            y = textHeight * -1.75
            z = ((7 - geometry.boundingBox.max.x / m) / 2 - 0.5 + geometry.boundingBox.max.x / m) * m
            newMesh.position.set(x, y, z)
            newMesh.rotateZ(rotation)
            newMesh.rotateY(Math.PI / 2)

            newMesh.updateMatrix()
            mesh = CSG.union(mesh, newMesh)
          }
          mesh.geometry.rotateX(Math.PI / 2)
          // mesh.rotateX(Math.PI / 2)
          mesh.updateMatrix()
          scene.add(mesh)

          // Instantiate a exporter
          const exporter = new STLExporter()
          // Parse the input and generate the glTF output
          const link = document.createElement('a')
          link.style.display = 'none'
          document.body.appendChild(link)
          const stl = exporter.parse(scene)
          link.href = URL.createObjectURL(new Blob([stl], { type: 'text/plain' }))
          link.download = `${season.name}.stl`
          link.click()

          scene.remove(mesh)
          mesh.geometry.dispose()

          button.innerHTML = 'Download STL'
          for (let i = 1; i <= seasonCount; i++) {
            button = document.getElementById('download' + i)
            button.removeAttribute('disabled')
          }
        })
      }
    })
  }
}
