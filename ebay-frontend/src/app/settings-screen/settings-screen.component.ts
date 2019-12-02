import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from '../../models/user.model';
import { IdentityService } from '../../services/identity.service';
import {NgForm} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { SelectionModel, UniqueSelectionDispatcher } from '@angular/cdk/collections';
@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.scss']
})
export class SettingsScreenComponent implements OnInit {

  id: string;
  profile: User;

  constructor(private route: ActivatedRoute, private authService: AuthService, private identityService: IdentityService) { }

  ngOnInit() {
    
    
    this.identityService.loggedInUser.subscribe((user: User) => {
      const profile = this.authService.userProfileSubject$.value;
      if (!!user && !!profile) {
        this.profile = user;
        // if the profile is the logged in user, get it from the identityService
      }

    });

  }
  updateProfile(){
    this.identityService.UpdateUserDetails(this.profile.email,this.profile.given_name,this.profile.family_name,this.profile.nickname);
  }
  
}

