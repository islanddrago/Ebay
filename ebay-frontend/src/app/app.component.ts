import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

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
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.localAuthSetup();

    this.authService.userProfile$.subscribe((profile) => {
      this.profile = profile;
    });
  }
}
