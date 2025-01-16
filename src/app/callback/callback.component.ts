import { Component, OnInit } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css',
  template: `<p>Connexion en cours...</p>`,
})
export class CallbackComponent implements OnInit {

  filteredUserInfo: any = {};

  roleNames: string[] = [];

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {

    const code = this.route.snapshot.queryParamMap.get('code');

    console.log(" == code == ", code);

    if (code) {
      this.authService.getToken(code).subscribe({
        next: (response) => {
          const token = response['access_token'];

          console.log('Token:', token);

          this.authService.getUserInfo(token).subscribe((userInfo) => {
            console.log('User info:', userInfo);
            this.filteredUserInfo = {
              id: userInfo.id,
              name: userInfo.name,
              email: userInfo.emailAddress,
            };
            this.roleNames = userInfo.roleBriefs.map((role: any) => role.name);
          });
        },
        error: (err) => {
          console.error('Error fetching token:', err);
        },
      });
    } else {
      console.error('Authorization code not found in callback URL.');
    }
  }
}
