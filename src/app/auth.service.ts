import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  login(): void {
    const popup = window.open(
      `${this.authUrl}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`,
      '_blank',
      'width=5,height=5'
    );
  
    const interval = setInterval(() => {
      try {
        if (popup?.location.href.includes('code=')) {
          const code = new URLSearchParams(popup.location.search).get('code');
          console.log('Authorization Code:', code);
  
          // Stocker le code dans le localStorage
          if (code) {
            localStorage.setItem('authCode', code);
            console.log('Code stored in localStorage:', code);
          }
  
          popup.close();
          this.router.navigate(['/callback']);
          clearInterval(interval);
        }
      } catch (error) {
        // Ignore CORS errors until URL matches allowed redirect domain
      }
    }, 1000);
  }
  

  // login(){

  //   const url = `${this.authUrl}?response_type=code&client_id=${this.clientId}&prompt=none`;

  //   // window.location.href = url;

  //   this.getFinalUrl(url);
    
  //   // console.log('')

  // }

  // login(): void {
  //   // Construire l'URL pour l'obtention du code d'autorisation
  //   const url = `${this.authUrl}?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(
  //     this.redirectUri
  //   )}&prompt=none`;
  
  //   // Faire une requête pour obtenir le code sans redirection
  //   this.http
  //     .post(
  //       url,
  //       {
  //         observe: 'response',
  //         responseType: 'text',
  //       }
  //     )
  //     .subscribe({
  //       next: (response: any) => {
  //         // Extraire l'URL de redirection de la réponse
  //         const redirectUrl = response.headers.get('Location');
  //         console.log('Redirect URL:', redirectUrl);
  
  //         // Extraire le code d'autorisation de l'URL
  //         if (redirectUrl) {
  //           const code = new URL(redirectUrl).searchParams.get('code');
  //           console.log('Authorization Code:', code);
  
  //           // Vous pouvez maintenant échanger ce code contre un token d'accès
  //         } else {
  //           console.error('No redirect URL found in response.');
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Error fetching authorization code:', err);
  //       },
  //     });
  // }
  

  getToken(authCode: string): Observable<any>{

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', authCode);
    body.set('redirect_uri', this.redirectUri);
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    // window.localStorage.setItem("code", authCode);

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(this.tokenUrl, body.toString(), {headers});
  }

  getUserInfo(token: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl, {headers});
  }

  getFinalUrl(url: string): void {
    this.http.head(url, { observe: 'response' }).subscribe(
      (response) => {
        console.log('Final URL:', response.url);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
