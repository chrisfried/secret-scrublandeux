import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerResponse, UserInfoCard } from 'bungie-api-ts/user';
import { BehaviorSubject, empty as observableEmpty, Subscription, throwError as observableThrowError, EMPTY } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { searchDestinyPlayer, SearchDestinyPlayerParams } from 'bungie-api-ts/destiny2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searching: boolean;
  public searchResults: UserInfoCard[];

  public searchName: BehaviorSubject<string>;
  private searchResponse: Subscription;
  private params$: Subscription;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.searchName = new BehaviorSubject('');
    this.searching = true;

    this.params$ = this.activatedRoute.params.subscribe((params: Params) => {
      this.searchResults = null;
      if (params['guardian']) {
        this.searchName.next(params['guardian']);
      }
    });

    this.searchResponse = this.searchName
      .pipe(
        switchMap((searchName) => {
          if (searchName.length) {
            this.searching = true;
            const behaviorSubject: BehaviorSubject<ServerResponse<UserInfoCard[]>> = new BehaviorSubject(undefined);
            const params: SearchDestinyPlayerParams = {
              displayName: searchName,
              membershipType: -1,
              returnOriginalProfile: false,
            };
            searchDestinyPlayer(
              (config: { url: string; method: 'GET' | 'POST'; params: any; body: any }) =>
                this.http
                  .request(config.method, config.url, {
                    params: config.params,
                    body: config.body,
                  })
                  .toPromise(),
              params
            ).then((res) => {
              behaviorSubject.next(res);
            });
            return behaviorSubject;
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((res: ServerResponse<UserInfoCard[]>) => {
        this.searchResults = res?.Response;
        if (this.searchResults && this.searchResults?.length === 1) {
          const result = this.searchResults[0];
          this.router.navigate(['/guardian', result.membershipType, result.membershipId]);
        }
        this.searching = false;
      });
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
    this.searchResponse.unsubscribe();
  }

  route(route: any[]) {
    this.router.navigate(route);
  }
}
