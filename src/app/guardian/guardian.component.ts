import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { BungieHttpService } from '../services/bungie-http.service';

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
  public dayKeys;
  public Math;

  constructor(
    private bHttp: BungieHttpService,
    private activatedRoute: ActivatedRoute,
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
    this.subs = [];
    this.activities = [];
    this.days = {};

    const day = new Date('Sept 1, 2017');
    const now = new Date();
    while (day <= now) {
      this.addDay(day);
      day.setDate(day.getDate() + 1);
    }
    this.yearKeys = Object.keys(this.days);
    this.monthKeys = {};
    this.dayKeys = {};
    this.yearKeys.forEach(year => {
      this.monthKeys[year] = Object.keys(this.days[year]);
      this.dayKeys[year] = {};
      this.monthKeys[year].forEach(month => {
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
          return 'https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=100,200';
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

    this.displayName = this.accountResponse.map(res => {
      return res.Response.profile.data.userInfo.displayName;
    });
    this.characters = this.accountResponse.map(res => {
      const characters = [];
      try {
        Object.keys(res.Response.characters.data).forEach(key => {
          characters.push(res.Response.characters.data[key]);
        });
      } catch (e) { }
      return characters;
    });

    this.minutesPlayedTotal = this.characters.map(characters => {
      let minutesPlayed = 0;
      characters.forEach(character => {
        minutesPlayed += +character.minutesPlayedTotal;
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
            console.log(character);
            const url = 'https://www.bungie.net/Platform/Destiny2/' + membershipType + '/Account/' + membershipId
            + '/Character/' + character.characterId + '/Stats/Activities/?mode=None&count=250&page=';
            this.addHistorySub(url, 0);
          });
        })
    );
  }

  addHistorySub(url: string, page: number) {
    this.subs.push(
      this.bHttp.get(url + page)
        .map((res: any) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe((res: bungie.ActivityHistoryResponse) => {
          if (res.Response.activities && res.Response.activities.length) {
            this.addHistorySub(url, page + 1);
            res.Response.activities.forEach(activity => {
              activity.startDate = new Date(activity.period);
              activity.startDate.setSeconds(activity.startDate.getSeconds() + activity.values.startSeconds.basic.value);
              activity.endDate = new Date(activity.startDate.getTime());
              activity.endDate.setSeconds(activity.startDate.getSeconds() + activity.values.timePlayedSeconds.basic.value);
              this.activities.push(activity);
              try {
                this.addDay(activity.startDate);
                this.addDay(activity.endDate);
                this.days[activity.startDate.getFullYear()][activity.startDate.getMonth() + 1][activity.startDate.getDate()].push(activity);
                this.days[activity.endDate.getFullYear()][activity.endDate.getMonth() + 1][activity.endDate.getDate()].push(activity);
              } catch (e) { }
            });
          }
          console.log(res);
          console.log(this.days);
        })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
