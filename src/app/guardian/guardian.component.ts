import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { BungieHttpService } from '../services/bungie-http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DayModalComponent } from './day-modal/day-modal.component';
import { DestinyActivityModeDefinition } from '../defs/DestinyActivityModeDefinition';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.scss'],
})
export class GuardianComponent implements OnInit, OnDestroy {
  private subs: Subscription[];
  private membershipType: Observable<string>;
  private membershipId: Observable<string>;
  private accountResponse: Observable<bungie.AccountResponse>;
  public displayName: Observable<string>;
  public characters: Observable<bungie.Character[]>;
  public minutesPlayedTotal: Observable<number>;
  public activities: bungie.Activity[];
  public days: {};
  public yearKeys: string[];
  public monthKeys;
  public monthOffsets;
  public dayKeys;
  public Math;
  public calendarFilter: any;
  public modeOptions: any[];
  public loadingArray: { loading: boolean }[];

  constructor(
    private bHttp: BungieHttpService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.Math = Math;
  }

  addDay(day) {
    if (!this.days[day.getFullYear()]) {
      this.days[day.getFullYear()] = {};
    }
    if (!this.days[day.getFullYear()][day.getMonth() + 1]) {
      this.days[day.getFullYear()][day.getMonth() + 1] = {};
    }
    if (!this.days[day.getFullYear()][day.getMonth() + 1][day.getDate()]) {
      this.days[day.getFullYear()][day.getMonth() + 1][day.getDate()] = [];
    }
  }

  ngOnInit() {
    this.loadingArray = [];
    this.calendarFilter = '0';
    this.subs = [];
    this.activities = [];
    this.days = {};
    this.modeOptions = Object.keys(DestinyActivityModeDefinition['en']);

    const day = new Date('Sept 1, 2014');
    const now = new Date();
    while (day <= now) {
      this.addDay(day);
      day.setDate(day.getDate() + 1);
    }
    this.yearKeys = Object.keys(this.days);
    this.monthKeys = {};
    this.monthOffsets = { 2017: { 9: 5 } };
    let previousOffset = 1;
    let previousCount = 30;
    this.dayKeys = {};
    this.yearKeys.forEach(year => {
      this.monthKeys[year] = Object.keys(this.days[year]);
      if (!this.monthOffsets[year]) {
        this.monthOffsets[year] = {};
      }
      this.dayKeys[year] = {};
      this.monthKeys[year].forEach(month => {
        if (!this.monthOffsets[year][month]) {
          this.monthOffsets[year][month] = (previousCount + previousOffset) % 7;
          previousCount = Object.keys(this.days[year][month]).length;
          previousOffset = this.monthOffsets[year][month];
        }
        this.dayKeys[year][month] = Object.keys(this.days[year][month]);
      });
    });

    this.membershipId = this.activatedRoute.params.map((params: Params) => {
      return params['membershipId'];
    });
    this.membershipType = this.activatedRoute.params.map((params: Params) => {
      return params['membershipType'];
    });

    this.accountResponse = Observable.combineLatest(
      this.membershipId,
      this.membershipType
    ).map(([membershipId, membershipType]) => {
      try {
        if (membershipType && membershipId) {
          return 'https://www.bungie.net/d1/Platform/Destiny/' + membershipType + '/Account/' + membershipId + '/Summary/';
        } else {
          return '';
        }
      } catch (e) {
        return '';
      }
    })
      .distinctUntilChanged()
      .switchMap((url) => {
        if (url.length) {
          return this.bHttp.get(url)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        } else {
          return Observable.empty();
        }
      });

    this.characters = this.accountResponse.map(res => {
      try {
        return res.Response.data.characters;
      } catch (e) {
        return [];
      }
    });

    this.minutesPlayedTotal = this.characters.map(characters => {
      let minutesPlayed = 0;
      characters.forEach(character => {
        minutesPlayed += +character.characterBase.minutesPlayedTotal;
      });
      return minutesPlayed;
    });

    this.subs.push(
      Observable.combineLatest(
        this.membershipId,
        this.membershipType,
        this.characters
      )
        .distinctUntilChanged()
        .subscribe(([membershipId, membershipType, characters]) => {
          this.activities = [];
          characters.forEach(character => {
            const url = 'https://www.bungie.net/d1/Platform/Destiny/Stats/ActivityHistory/' + membershipType + '/' + membershipId
              + '/' + character.characterBase.characterId + '/?mode=None&count=250&page=';
            this.addHistorySub(url, 0);
            this.addHistorySub(url, 1);
            this.addHistorySub(url, 2);
          });
        })
    );
  }

  addHistorySub(url: string, page: number) {
    const loading = { loading: true };
    this.loadingArray.push(loading);

    this.subs.push(
      this.bHttp.get(url + page)
        .map((res: any) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe((res: bungie.ActivityHistoryResponse) => {
          if (res.Response && res.Response.data && res.Response.data.activities && res.Response.data.activities.length) {
            this.addHistorySub(url, page + 3);
            res.Response.data.activities.forEach(activity => {
              activity.startDate = new Date(activity.period);
              activity.endDate = new Date(activity.startDate.getTime());
              activity.endDate.setSeconds(activity.startDate.getSeconds()
                + activity.values.activityDurationSeconds.basic.value);
              if (activity.values.leaveRemainingSeconds) {
                activity.endDate.setSeconds(activity.startDate.getSeconds()
                - activity.values.leaveRemainingSeconds.basic.value);
              }
              this.activities.push(activity);
              try {
                this.days[activity.startDate.getFullYear()][activity.startDate.getMonth() + 1][activity.startDate.getDate()].push(activity);
              } catch (e) { }
            });
          }
          loading.loading = false;
        })
    );
  }

  openDay(date, day) {
    const dialogRef = this.dialog.open(DayModalComponent, {
      data: {
        date: date,
        activities: day
      },
      width: '300px'
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
