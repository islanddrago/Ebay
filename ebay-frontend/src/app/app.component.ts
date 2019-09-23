import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  profile: any;
  user: any;
  token: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.localAuthSetup();

    this.authService.userProfile$.subscribe((profile) => {
      this.profile = profile;
    });
    this.authService.getUser$().subscribe((user) => this.user = user);
    this.authService.token$.subscribe((token) => this.token = token);
  }
}
