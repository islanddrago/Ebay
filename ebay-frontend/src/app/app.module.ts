import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './drawer/drawer.component';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { UpcomingEventsScreenComponent } from './upcoming-events-screen/upcoming-events-screen.component';
import { PastEventsScreenComponent } from './past-events-screen/past-events-screen.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileScreenComponent } from './profile-screen/profile-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDetailScreenComponent } from './event-detail-screen/event-detail-screen.component';
import { AgmCoreModule } from '@agm/core';
import { CreateEventScreenComponent } from './create-event-screen/create-event-screen.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CallbackComponent,
    DrawerComponent,
    SettingsScreenComponent,
    EventDetailScreenComponent,
    UpcomingEventsScreenComponent,
    PastEventsScreenComponent,
    LandingPageComponent,
    ProfileScreenComponent,
    EventCardComponent,
    CreateEventScreenComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDnFXUxUDF9peFDIzNsUuGkofcKUIYcuf4' }),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
