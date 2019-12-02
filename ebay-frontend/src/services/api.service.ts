import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRequest } from 'src/models/request.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string;
  userID: string;
  host: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.userProfile$.subscribe(profile => this.userID = !!profile ? profile.sub : undefined);
    this.host = isDevMode() ? 'http://localhost:6969' : 'http://3.135.227.242';
  }

  getRequest(request: BaseRequest) {
    const token = this.authService.token$.value;
    const headers = {};
    if (!!this.userID) {
      headers['userID'] = this.userID;
      headers['Authorization'] = `Bearer ${token}`;
    }
    return this.http.get(this.host + request.url, { headers });
  }

  postRequest(request: BaseRequest) {
    const token = this.authService.token$.value;
    const headers = {};
    if (!!this.userID) {
      headers['userID'] = this.userID;
      headers['Authorization'] = `Bearer ${token}`;
    }
    return this.http.post(this.host + request.url, request.body, { headers });
  }

  putRequest(request: BaseRequest) {
    const token = this.authService.token$.value;
    const headers = {};
    if (!!this.userID) {
      headers['userID'] = this.userID;
      headers['Authorization'] = `Bearer ${token}`;
    }
    return this.http.put(this.host + request.url, request.body, { headers });
  }

  deleteRequest(request: BaseRequest) {
    const token = this.authService.token$.value;
    const headers = {};
    if (!!this.userID) {
      headers['userID'] = this.userID;
      headers['Authorization'] = `Bearer ${token}`;
    }
    return this.http.delete(this.host + request.url, { headers });
  }
}
