import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GetEventDetailsRequest, GetUpcomingEventsRequest, CreateEventRequest } from '../models/request.model';
import { map } from 'rxjs/operators';
import { Event } from '../models/event.model';

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

  createEvent(title: string, description: string, location: string, startDate: string, endDate: string) {
    const request = new CreateEventRequest(title, description, location, startDate, endDate);
    return this.apiService.postRequest(request).pipe(map((response: any) => {
      if (!!response.event) {
        return response.event;
      }
      return null;
    }));
  }
}
