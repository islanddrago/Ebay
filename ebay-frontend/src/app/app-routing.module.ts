import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { UpcomingEventsScreenComponent } from './upcoming-events-screen/upcoming-events-screen.component';
import { PastEventsScreenComponent } from './past-events-screen/past-events-screen.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EventDetailScreenComponent } from './event-detail-screen/event-detail-screen.component';
import { HomeComponent } from './home/home.component';
import { ProfileScreenComponent } from './profile-screen/profile-screen.component';
import { CreateEventScreenComponent } from './create-event-screen/create-event-screen.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'profile/:id', component: ProfileScreenComponent, pathMatch: 'full' },
  { path: 'upcoming-events', component: UpcomingEventsScreenComponent, pathMatch: 'full' },
  { path: 'past-events', component: PastEventsScreenComponent, pathMatch: 'full' },
  { path: 'event-details/:id', component: EventDetailScreenComponent, pathMatch: 'full' },
  { path: 'settings', component: SettingsScreenComponent, pathMatch: 'full' },
  { path: 'callback', component: CallbackComponent, pathMatch: 'full' },
  { path: 'create-event', component: CreateEventScreenComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
