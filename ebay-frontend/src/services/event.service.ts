import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GetEventDetailsRequest, GetUpcomingEventsRequest, RSVPForEventRequest, UnRSVPForEventRequest } from '../models/request.model';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apiService: ApiService) { }

  getEvent(eventID: string) {
    const request = new GetEventDetailsRequest(eventID);
    return this.apiService.getRequest(request).pipe(map((response: any) => {
      if (!!response.body) {
        return response.body;
      }
      return null;
    }));
  }

  getUpcomingEvents() {
    const request = new GetUpcomingEventsRequest();
    return this.apiService.getRequest(request).pipe(map((response: any) => {
      if (!!response.events) {
        return response.events.map(event => new Event(event));
      }
      return null;
    }));
  }

  rsvpForEvent(eventID: string) {
    const request = new RSVPForEventRequest(eventID);
    return this.apiService.postRequest(request).pipe(map((response: any) => {
      if(!!response.user) {
        return new User(response.user);
      }
      return null;
    }));
  }

  unRsvpForEvent(eventID: string) {
    const request = new UnRSVPForEventRequest(eventID);
    return this.apiService.postRequest(request).pipe(map((response: any) => {
      if(!!response.user) {
        return new User(response.user);
      }
      return null;
    }));
  }
}
