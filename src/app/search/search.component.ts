import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { BungieHttpService } from '../services/bungie-http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searching: boolean;
  public searchResults: bungie.SearchDestinyPlayerResult[];

  private searchName: BehaviorSubject<string>;
  private searchResponse: Subscription;
  private params$: Subscription;

  constructor(
    private bHttp: BungieHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.searchName = new BehaviorSubject('');
    this.searching = true;

    this.params$ = this.activatedRoute.params
      .subscribe((params: Params) => {
        this.searchResults = null;
        if (params['guardian']) {
          this.searchName.next(params['guardian']);
        }
      });

    this.searchResponse = this.searchName
      .map((searchName) => {
        this.searching = true;
        if (searchName.length) {
          return 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/' + encodeURIComponent(searchName) + '/';
        } else {
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
      })
      .subscribe((res: bungie.SearchDestinyPlayerResponse) => {
        this.searchResults = res.Response;
        if (this.searchResults.length === 1) {
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
