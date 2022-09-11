import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ServerResponse } from 'bungie-api-ts/common'
import {
  DestinyActivityHistoryResults,
  DestinyActivityModeType,
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
  public flatDays: any[][]
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
  public modeTrends: {
    [key in DestinyActivityModeType]?: {
      ninetyDays: scrubland.Activity[]
      threeSixtyFiveDays: scrubland.Activity[]
    }
  }
  public overallTrend: {
    ninetyDays: scrubland.Activity[]
    threeSixtyFiveDays: scrubland.Activity[]
  }
  public ninetyDaysAgo: Date
  public threeSixtyFiveDaysAgo: Date

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private manifestService: ManifestService,
    private bungieQueue: BungieQueueService,
    private bungieAuth: BungieAuthService
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
    this.flatDays.push(this.days[day.getFullYear()][day.getMonth() + 1][day.getDate()])
  }

  ngOnInit() {
    this.loadingArray = []
    this.calendarFilter = '0'
    this.subs = []
    this.activities = []
    this.days = {}
    this.flatDays = []
    this.ninetyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 90))
    this.threeSixtyFiveDaysAgo = new Date(new Date().setDate(new Date().getDate() - 365))
    this.modeTrends = {}
    this.overallTrend = {
      ninetyDays: [],
      threeSixtyFiveDays: [],
    }
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
            const period = new Date(activity.period)
            const startDate = period.getTime() / 1000 + activity.values.startSeconds.basic.value
            const endDate = startDate + activity.values.timePlayedSeconds.basic.value
            activity.startDate = new Date(startDate * 1000)
            activity.endDate = new Date(endDate * 1000)
            this.activities.push(activity)
            try {
              this.days[activity.startDate.getFullYear()][activity.startDate.getMonth() + 1][activity.startDate.getDate()].push(activity)

              if (activity.endDate > this.threeSixtyFiveDaysAgo) {
                activity.activityDetails.modes.forEach((mode) => {
                  if (!this.modeTrends[mode]) {
                    this.modeTrends[mode] = {
                      ninetyDays: [],
                      threeSixtyFiveDays: [],
                    }
                  }
                  this.modeTrends[mode].threeSixtyFiveDays.push(activity)
                  if (activity.endDate > this.ninetyDaysAgo) {
                    this.modeTrends[mode].ninetyDays.push(activity)
                  }
                })

                this.overallTrend.threeSixtyFiveDays.push(activity)
                if (activity.endDate > this.ninetyDaysAgo) {
                  this.overallTrend.ninetyDays.push(activity)
                }
              }
            } catch (e) {}
            this.flatDaysBS.next(this.flatDays)
          })
        }
        if (res) {
          loading.loading = false
        }
      })
    )
  }

  openDay(date: Date, day: scrubland.Activity[]) {
    if (this.loadingArray.length && !this.loadingArray.some((loading) => loading.loading)) {
      const dialogRef = this.dialog.open(DayModalComponent, {
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

  getModeTrends() {
    return Object.keys(this.modeTrends)
      .map((key) => ({
        mode: Number(key),
        ninety: Math.round(this.modeTrends[Number(key)].ninetyDays.reduce((a, b) => a + (b.endDate - b.startDate), 0) / 13),
        threeSixtyFive: Math.round(this.modeTrends[Number(key)].threeSixtyFiveDays.reduce((a, b) => a + (b.endDate - b.startDate), 0) / 52),
      }))
      .sort((a, b) => b.threeSixtyFive - a.threeSixtyFive)
      .sort((a, b) => b.ninety - a.ninety)
      .map((m) => ({
        ...m,
        ninety: Math.round(m.ninety / 60000),
        threeSixtyFive: Math.round(m.threeSixtyFive / 60000),
      }))
  }

  getOverallTrend() {
    return {
      ninety: Math.round(this.overallTrend.ninetyDays.reduce((a, b: any) => a + (b.endDate - b.startDate), 0) / 13 / 60000),
      threeSixtyFive: Math.round(this.overallTrend.threeSixtyFiveDays.reduce((a, b: any) => a + (b.endDate - b.startDate), 0) / 52 / 60000),
    }
  }
}
