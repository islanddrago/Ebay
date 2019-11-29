import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss']
})
export class ProfileScreenComponent implements OnInit {
  id: string;
  loggedInUser: any;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    authService.userProfile$.subscribe(profile => this.loggedInUser = profile);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.authService.userProfile$.subscribe(profile => {
        if (this.id === profile.sub) {
          
        }
      });
    });
  }

}
