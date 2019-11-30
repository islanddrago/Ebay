import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GetEventDetailsRequest } from '../models/request.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
}
