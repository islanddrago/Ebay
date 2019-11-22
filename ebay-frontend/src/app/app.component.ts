import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UiService } from 'src/services/ui.service';
import {FlexLayoutModule} from '@angular/flex-layout';
/**
 * Entry component for Angular application
 * Tutorials followed:
 * https://auth0.com/docs/quickstart/spa/angular2
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  profile: any;
  user: any;
  token: string;
  drawerOpen = false;
  constructor(private authService: AuthService, public uiService: UiService) {}

  ngOnInit() {
    this.authService.localAuthSetup();

    this.authService.userProfile$.subscribe((profile) => {
      this.profile = profile;
    });
    this.authService.getUser$().subscribe((user) => this.user = user);
    this.authService.token$.subscribe((token) => this.token = token);

    this.uiService.drawerOpen.subscribe(open => this.drawerOpen = open);
  }
}
