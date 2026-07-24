import { Routes } from '@angular/router';
import { AboutBotComponent } from './pages/about-bot/about-bot.component';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutBotComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: 'home' },
];
