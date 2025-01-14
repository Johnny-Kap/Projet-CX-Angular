import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://192.168.3.35:8080/o/oauth2/authorize';
  private tokenUrl = 'http://192.168.3.35:8080/o/oauth2/token';
  private apiUrl = 'http://192.168.3.35:8080/o/headless-admin-user/v1.0/my-user-account';

  private clientId = 'id-eaab5b71-c6f7-4c4c-9e6d-d383369b1a8';
  private clientSecret = 'secret-3fc282e0-1979-5312-c442-322328f49d';
  private redirectUri = 'http://localhost:4200/callback';

  constructor(private http: HttpClient) { }

  login(){

    const url = `${this.authUrl}?response_type=code&client_id=${this.clientId}`;
    window.location.href = url; 
  }

  getToken(authCode: string): Observable<any>{

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', authCode);
    body.set('redirect_uri', this.redirectUri);
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

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
