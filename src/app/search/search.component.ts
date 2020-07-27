import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServerResponse, UserInfoCard } from 'bungie-api-ts/user';
import {
  BehaviorSubject,
  empty as observableEmpty,
  Subscription,
  throwError as observableThrowError
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { BungieHttpService } from '../services/bungie-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searching: boolean;
  public searchResults: UserInfoCard[];

  private searchName: BehaviorSubject<string>;
  private searchResponse: Subscription;
  private params$: Subscription;

  constructor(
    private bHttp: BungieHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
        map(searchName => {
          this.searching = true;
          if (searchName.length) {
            return (
              'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/' +
              encodeURIComponent(searchName) +
              '/'
            );
          } else {
            return '';
          }
        }),
        distinctUntilChanged(),
        switchMap(url => {
          if (url.length) {
            return this.bHttp.get(url).pipe(
              catchError((error: HttpErrorResponse) => {
                console.log(error);
                return observableThrowError(error.error || 'Server error');
              })
            );
          } else {
            return observableEmpty();
          }
        })
      )
      .subscribe((res: ServerResponse<UserInfoCard[]>) => {
        this.searchResults = res.Response;
        if (this.searchResults.length === 1) {
          const result = this.searchResults[0];
          this.router.navigate([
            '/guardian',
            result.membershipType,
            result.membershipId
          ]);
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
