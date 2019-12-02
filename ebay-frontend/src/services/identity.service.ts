import { Injectable } from '@angular/core';
import { GetUserDetailsRequest } from 'src/models/request.model';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import {UpdateProfileRequest} from "../models/request.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  loggedInUser = new BehaviorSubject<User | undefined>(undefined);

  constructor(private authService: AuthService, private apiService: ApiService) {
    authService.userProfile$.subscribe((profile) => {
      if (!!profile) {
        this.fetchLoggedInUserDetails().subscribe((response: any) => {
          if (!!response.user) {
            this.loggedInUser.next(response.user as User);
          }
        });
      }
    });
  }

  fetchLoggedInUserDetails() {
    const request = new GetUserDetailsRequest(this.authService.userProfileSubject$.value.sub);
    return this.apiService.getRequest(request);
  }

  fetchUserDetails(userID: string) {
    const request = new GetUserDetailsRequest(userID);
    return this.apiService.getRequest(request);
  }
  UpdateUserDetails(email: string,  given_name:string,family_name:string, nickname:string){
    const request =new UpdateProfileRequest(email,given_name,family_name,nickname);
    return this.apiService.postRequest(request).pipe(map( (response: any)=>{
      if(!!response.user){
        return response.user;
      }
      return null;
    } ))

  }
}
