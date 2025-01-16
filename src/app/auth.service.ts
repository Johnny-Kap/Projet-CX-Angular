import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://192.168.3.35:8080/o/oauth2/authorize';
  private tokenUrl = 'http://192.168.3.35:8080/o/oauth2/token';
  private apiUrl = 'http://192.168.3.35:8080/o/headless-admin-user/v1.0/my-user-account';

  private clientId = 'id-902c199e-cc5b-2ade-82ab-d33174cf4c4';
  private clientSecret = 'secret-3ef8b4de-a19e-9add-58bb-5c027fcf0a6';
  private redirectUri = 'http://localhost:4200/callback';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  login(){

    const url = `${this.authUrl}?response_type=code&client_id=${this.clientId}&prompt=none`;
    window.location.href = url;

  }

  getToken(authCode: string): Observable<any>{

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', authCode);
    body.set('redirect_uri', this.redirectUri);
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    window.localStorage.setItem("code", authCode);

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(this.tokenUrl, body.toString(), {headers});
  }

  getUserInfo(token: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl, {headers});
  }
}
