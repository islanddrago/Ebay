import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from '../../models/user.model';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss']
})
export class ProfileScreenComponent implements OnInit {
  isLoading = true;
  id: string;
  profile: User;

  constructor(private route: ActivatedRoute, private authService: AuthService, private identityService: IdentityService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.identityService.loggedInUser.subscribe((user: User) => {
        const profile = this.authService.userProfileSubject$.value;
        if (!!user && !!profile) {
          console.log('id: ', this.id);
          console.log('user: ', user, ' profile: ', profile);
          // if the profile is the logged in user, get it from the identityService
          if (this.id === profile.sub) {
            this.profile = user;
            this.isLoading = false;
          } else {
            // otherwise, fetch the profile from the API
            this.identityService.fetchUserDetails(this.id).subscribe((response: any) => {
              this.profile = response.user as User;
              this.isLoading = false;
            });
          }
        }
      });
    });
  }

}
