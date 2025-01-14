
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { OAuthService } from '../service/oauth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
})



export class HeaderComponent {

  // filteredUserInfo: any = {};

  // constructor(private oauhtService: OAuthService) { }

  // ngOnInit(): void {
  //   this.oauhtService.getToken().subscribe({
  //     next: (tokenResponse) => {
  //       const token = tokenResponse.access_token;
  //       console.log('Token :', token);

  //       this.oauhtService.getUserInfo(token).subscribe({
  //         next: (userInfo) => {
  //           console.log('user info', userInfo);
  //           this.filteredUserInfo = {
  //             name: userInfo.givenName,
  //           }
  //         },
  //         error: (err) => {
  //           console.error('Error user info', err);
  //         },
  //       });


  //     },
  //     error: (err) => {
  //       console.error('Error token', err);
  //     },
  //   });
  // }


constructor(private authService: AuthService){}

login(){
  this.authService.login();
}

}
