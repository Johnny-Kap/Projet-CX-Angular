import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './callback/callback.component';

export const routes: Routes = [

    {
        path: '',
        component: AppComponent,
        children:[
            {path: '', component: HomeComponent},
        ]
    },

    {path: 'header', component: HeaderComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'callback', component: CallbackComponent}
];
