import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutBotComponent } from './about-bot/about-bot.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  {path: 'about', component: AboutBotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
