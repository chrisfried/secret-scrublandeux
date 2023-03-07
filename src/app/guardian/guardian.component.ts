import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ServerResponse } from 'bungie-api-ts/common'
import {
  DestinyActivityHistoryResults,
  DestinyActivityModeType,
  DestinyCharacterComponent,
  DestinyCharacterResponse,
  DestinyComponentType,
  DestinyHistoricalStatsAccountResult,
  DestinyStatsGroupType,
  getActivityHistory,
  GetActivityHistoryParams,
  getCharacter,
  GetCharacterParams,
  getHistoricalStatsForAccount,
  GetHistoricalStatsForAccountParams,
} from 'bungie-api-ts/destiny2'
import { getMembershipDataForCurrentUser, UserMembershipData } from 'bungie-api-ts/user'
import { BehaviorSubject, EMPTY, forkJoin, Observable, Subscription } from 'rxjs'
import { distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators'
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
  private accountResponse$: BehaviorSubject<ServerResponse<DestinyCharacterResponse>[][]> = new BehaviorSubject([])
  private flatDaysBS: BehaviorSubject<any[]>
  public displayName = ''
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
      quarter: scrubland.Activity[]
      year: scrubland.Activity[]
    }
  }
  public overallTrend: {
    quarter: scrubland.Activity[]
    year: scrubland.Activity[]
  }
  public oneQuarterAgo: Date
  public oneYearAgo: Date

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
    this.oneQuarterAgo = new Date(new Date().setDate(new Date().getDate() - 91))
    this.oneYearAgo = new Date(new Date().setDate(new Date().getDate() - 364))
    this.modeTrends = {}
    this.overallTrend = {
      quarter: [],
      year: [],
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
                const membershipLoading = { loading: true }
                this.loadingArray.push(membershipLoading)

                const bs: BehaviorSubject<ServerResponse<DestinyHistoricalStatsAccountResult>> = new BehaviorSubject(undefined)
                const { membershipId, membershipType } = destinyMembership
                const action = getHistoricalStatsForAccount
                const callback = (response: ServerResponse<DestinyHistoricalStatsAccountResult>) => {
                  if (response && response.ErrorCode === 1 && response?.Response?.characters?.length > 0) {
                    forkJoin(
                      response?.Response?.characters.map((character) => {
                        const characterLoading = { loading: true }
                        this.loadingArray.push(characterLoading)

                        const bsB: BehaviorSubject<ServerResponse<DestinyCharacterResponse>> = new BehaviorSubject(undefined)
                        const { characterId } = character
                        const secondsPlayed = character.merged?.allTime?.secondsPlayed?.basic?.value
                        const actionB = getCharacter
                        const callbackB = (res: ServerResponse<DestinyCharacterResponse>) => {
                          if (res.ErrorCode === 1) {
                            const r = res as any
                            r.Response.character = res.Response.character ?? {
                              data: {
                                characterId,
                                membershipId,
                                membershipType,
                                minutesPlayedTotal: secondsPlayed ? this.Math.floor(secondsPlayed / 60) : 0,
                              },
                            }

                            bsB.next(r as ServerResponse<DestinyCharacterResponse>)
                          }
                          characterLoading.loading = false
                          bsB.complete()
                        }
                        const paramsB: GetCharacterParams = {
                          characterId,
                          destinyMembershipId: membershipId,
                          membershipType,
                          components: [DestinyComponentType.Characters],
                        }
                        this.bungieQueue.addToQueue('getProfile', actionB, callbackB, paramsB)
                        return bsB
                      }) ?? EMPTY
                    )
                      .pipe(take(1))
                      .subscribe((b) => {
                        bs.next(b)
                        membershipLoading.loading = false
                        bs.complete()
                      })
                  } else {
                    membershipLoading.loading = false
                    bs.complete()
                  }
                }
                const params: GetHistoricalStatsForAccountParams = {
                  destinyMembershipId: membershipId,
                  membershipType,
                  groups: [DestinyStatsGroupType.General],
                }
                this.bungieQueue.addToQueue('getProfile', action, callback, params)
                return bs
              }) ?? EMPTY
            )
          ),
          map((responses) => {
            return this.accountResponse$.next(responses)
          })
        )
        .subscribe()
    )

    this.membershipDataForCurrentUser$
      .pipe(
        distinctUntilChanged(),
        // tap((r) => console.log('membershipDataForCurrentUser', r)),
        // map((responses) => responses[0])
        map((res) => {
          // console.log(res)
          //   if (res?.ErrorCode !== 1 && res?.ErrorStatus) {
          //     this.errorStatus = res.ErrorStatus
          //     this.errorMessage = res.Message
          //   }
          this.displayName = res?.Response?.bungieNetUser?.displayName
        })
      )
      .subscribe()

    this.characters$ = this.accountResponse$.pipe(
      distinctUntilChanged(),
      map((profiles) => {
        const characters = []
        for (const profile of profiles) {
          if (profile) {
            for (const character of profile) {
              try {
                characters.push(character.Response.character.data)
              } catch (e) {}
            }
          }
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

              if (activity.endDate > this.oneYearAgo) {
                activity.activityDetails.modes.forEach((mode) => {
                  if (!this.modeTrends[mode]) {
                    this.modeTrends[mode] = {
                      quarter: [],
                      year: [],
                    }
                  }
                  this.modeTrends[mode].year.push(activity)
                  if (activity.endDate > this.oneQuarterAgo) {
                    this.modeTrends[mode].quarter.push(activity)
                  }
                })

                this.overallTrend.year.push(activity)
                if (activity.endDate > this.oneQuarterAgo) {
                  this.overallTrend.quarter.push(activity)
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
        quarter: Math.round(this.modeTrends[Number(key)].quarter.reduce((a, b) => a + (b.endDate - b.startDate), 0) / 13),
        year: Math.round(this.modeTrends[Number(key)].year.reduce((a, b) => a + (b.endDate - b.startDate), 0) / 52),
      }))
      .sort((a, b) => b.year - a.year)
      .sort((a, b) => b.quarter - a.quarter)
      .map((m) => ({
        ...m,
        quarter: Math.round(m.quarter / 60000),
        year: Math.round(m.year / 60000),
      }))
  }

  getOverallTrend() {
    return {
      quarter: Math.round(this.overallTrend.quarter.reduce((a, b: any) => a + (b.endDate - b.startDate), 0) / 13 / 60000),
      year: Math.round(this.overallTrend.year.reduce((a, b: any) => a + (b.endDate - b.startDate), 0) / 52 / 60000),
    }
  }
}
