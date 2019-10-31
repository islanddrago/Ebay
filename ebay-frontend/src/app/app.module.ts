import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { MatButtonModule } from '@angular/material/button';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './drawer/drawer.component';
import { SettingsScreenComponent } from './settings-screen/settings-screen.component';
import { UpcomingEventsScreenComponent } from './upcoming-events-screen/upcoming-events-screen.component';
import { PastEventsScreenComponent } from './past-events-screen/past-events-screen.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CallbackComponent,
    UpcomingEventsComponent,
    DrawerComponent,
    SettingsScreenComponent,
    UpcomingEventsScreenComponent,
    PastEventsScreenComponent,
  ],
  imports: [
    BrowserModule,
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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
