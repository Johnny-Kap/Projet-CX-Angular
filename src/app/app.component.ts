import { CSP_NONCE, Component, Inject, NgModule, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { publishFacade } from '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { authConfig } from './auth/auth.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, MatButtonModule, RouterLink, RouterLinkActive, HomeComponent, HeaderComponent, ContactComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent  {
  title = 'Projet-Free';

  private userName: string = '';

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }

}
