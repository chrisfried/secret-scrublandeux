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
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { BungieAuthService } from '../bungie-auth/bungie-auth.service'
import { ManifestService } from '../manifest/manifest.service'
import { scrubland } from '../scrubland.typings'
import { BungieQueueService } from '../services/queue.service'
import { DayModalComponent } from './day-modal/day-modal.component'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'
import { CSG } from 'three-csg-ts'

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.scss'],
})
export class GuardianComponent implements OnInit, OnDestroy {
  private subs: Subscription[]
  private membershipDataForCurrentUser$: BehaviorSubject<ServerResponse<UserMembershipData>> = new BehaviorSubject(undefined)
  private accountResponse$: BehaviorSubject<ServerResponse<DestinyProfileResponse>[]> = new BehaviorSubject([])
  private flatDaysBS: BehaviorSubject<any[]>
  public displayName: Observable<string>
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
    number: number,
    name: string,
    days: scrubland.Activity[][],
    startDate: Date
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
  public threeLaunched = false

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
    this.seasons.some(season => {
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

    const day = new Date('Sept 1, 2017')
    const now = new Date()
    while (day <= now) {
      this.addDay(day)
      day.setDate(day.getDate() + 1)
    }
    this.flatDaysBS.next(this.flatDays)
    this.yearKeys = Object.keys(this.days)
    this.monthKeys = {}
    this.monthOffsets = { 2017: { 9: 5 } }
    let previousOffset = 5
    let previousCount = 30
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

    this.displayName = this.accountResponse$.pipe(
      distinctUntilChanged(),
      map((responses) => responses[0]),
      map((res) => {
        if (res?.ErrorCode !== 1 && res?.ErrorStatus) {
          this.errorStatus = res.ErrorStatus
          this.errorMessage = res.Message
        }
        return res?.Response?.profile.data.userInfo.displayName
      })
    )
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
          } catch (e) { }
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

    this.flatDaysBS.subscribe(days => {
      if (this.loadingArray.length && !this.loadingArray.some((loading) => loading.loading) && !this.threeLaunched) {
        this.threeLaunched = true
        this.seasons.forEach((season, i) => {
          setTimeout(() => this.three(season), 1000 * i)
        })
      }
    })

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
            const period = new Date(activity.period)
            const startDate = period.getTime() / 1000 + activity.values.startSeconds.basic.value
            const endDate = startDate + activity.values.timePlayedSeconds.basic.value
            activity.startDate = new Date(startDate * 1000)
            activity.endDate = new Date(endDate * 1000)
            this.activities.push(activity)
            try {
              this.days[activity.startDate.getFullYear()][activity.startDate.getMonth() + 1][activity.startDate.getDate()].push(activity)
            } catch (e) { }
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

  openDay(date: Date, day: scrubland.Activity[]) {
    if (this.loadingArray.length && !this.loadingArray.some((loading) => loading.loading)) {
      this.dialog.open(DayModalComponent, {
        data: {
          date: date,
          activities: day,
        },
        width: '300px',
      })
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
  }

  three(season: {
    number: number,
    name: string,
    days: scrubland.Activity[][],
    startDate: Date
  }) {
    console.log(season.name)
    this.zone.runOutsideAngular(_ => {
      let scene
      let geometry, material, mesh, newMesh
      let x, y, z

      init()

      function init() {

        scene = new THREE.Scene()

        x = Math.ceil((season.days.length + 2) / 7) * 4
        y = 2 * 4
        z = 7 * 4
        geometry = new THREE.BoxGeometry(x, y, z)

        material = new THREE.MeshStandardMaterial()
        mesh = new THREE.Mesh(geometry, material)

        x = (Math.ceil((season.days.length + 2) / 7) / 2 - .5) * 4
        y = -1 * 4
        z = 3 * 4
        mesh.position.set(x, y, z)

        mesh.updateMatrix()

        const loader = new FontLoader()

        loader.load('assets/fonts/helvetiker_bold.typeface.json', function (font) {

          y = .8 * 4
          z = .25 * 4
          geometry = new TextGeometry(season.name, {
            font: font,
            size: y,
            height: z,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0
          })
          newMesh = new THREE.Mesh(geometry, material)

          x = 0 * 4
          y = -1.3 * 4
          z = 6.25 * 4
          newMesh.position.set(x, y, z)

          mesh.updateMatrix()
          newMesh.updateMatrix()
          mesh = CSG.subtract(mesh, newMesh)

          for (let i = 0; i < season.days.length; i++) {
            const j = i + 2
            const day = season.days[i]
            if (day.length) {
              const time = day.reduce((prev, activity) => prev + activity.values.timePlayedSeconds.basic.value, 0)
              const height = time / 86400 * 24

              x = 1 * 4
              y = height * 4
              z = 1 * 4
              geometry = new THREE.BoxGeometry(x, y, z)

              newMesh = new THREE.Mesh(geometry, material)

              x = (Math.floor(j / 7) - Math.floor(j / 364) * 52) * 4
              y = height / 2 * 4
              z = (j % 7 + Math.floor(j / 364) * 7) * 4
              newMesh.position.set(x, y, z)

              mesh.updateMatrix()
              newMesh.updateMatrix()
              mesh = CSG.union(mesh, newMesh)
            }
          }
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
        })
      }

      // function animation(time) {

      //   // mesh.rotation.x = time / 2000;
      //   // mesh.rotation.y = time / 1000;

      //   renderer.render(scene, camera);

      // }
    })
  }
}
