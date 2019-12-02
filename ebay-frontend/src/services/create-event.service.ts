import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GetEventDetailsRequest } from '../models/request.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private apiService: ApiService) { }

  
}
