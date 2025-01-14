import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class OAuthService {

  private oauthUrl = 'http://192.168.3.35:8080/o/oauth2/token';
  private InfoUSerUrl = 'http://192.168.3.35:8080/o/headless-admin-user/v1.0/my-user-account'
  private clientID = 'id-496e15b0-4768-3865-ba7f-5e79f0a473c3';
  private clientSecret = 'secret-26b83b16-be41-3e6c-d327-78c3de8e1d4';

  constructor(private http: HttpClient) {}

  getToken(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
    .set('grant_type', 'client_credentials')
    .set('client_id', this.clientID)
    .set('client_secret', this.clientSecret);

    return this.http.post(this.oauthUrl, body.toString(), {headers});
  }

  getUserInfo(token: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.InfoUSerUrl, {headers});
  }

}
