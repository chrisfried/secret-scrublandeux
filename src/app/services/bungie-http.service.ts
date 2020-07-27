import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServerResponse } from "bungie-api-ts/common";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class BungieHttpService {
  private _origin: string;
  private _apiKey: string;
  public error: BehaviorSubject<ServerResponse<any>>;

  constructor(private http: HttpClient) {
    this.error = new BehaviorSubject(null);
    this._origin = window.location.protocol + "//" + window.location.hostname;
  }

  get(url): Observable<ServerResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "x-api-key": environment.bungie.apiKey,
      }),
    };

    return this.http.get<ServerResponse<any>>(url, httpOptions);
  }
}
