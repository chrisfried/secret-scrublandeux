import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse } from 'bungie-api-ts/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BungieHttpService {
  private _origin: string;
  private _apiKey: string;
  public error: BehaviorSubject<ServerResponse<any>>;

  constructor(private http: HttpClient) {
    this.error = new BehaviorSubject(null);
    this._origin = window.location.protocol + '//' + window.location.hostname;
    switch (this._origin) {
      case 'http://dev.guardian.theater':
        this._apiKey = '4da0bc9d76774c5696ea2703b129a2cd';
        break;

      case 'https://chrisfried.github.io':
        this._apiKey = '83c21174d7ed4292884fed250a383fee';
        break;
    }
  }

  get(url): Observable<ServerResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-key': this._apiKey
      })
    };

    return this.http.get<ServerResponse<any>>(url, httpOptions);
  }
}
