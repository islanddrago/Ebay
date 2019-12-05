import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from 'src/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'create-event-screen',
  templateUrl: './create-event-screen.component.html',
  styleUrls: ['./create-event-screen.component.scss']
})
export class CreateEventScreenComponent implements OnInit {

  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;

  loading = false;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  setStartDate(date: string) {
    this.startDate = date;
  }

  setEndDate(date: string) {
    this.endDate = date;
  }

  formValid() {
    return !!this.title && !!this.description && !!this.location && !!this.startDate && !!this.endDate;
  }

  createEvent() {
    this.loading = true;
    this.eventService.createEvent(
      this.title,
      this.description,
      this.location,
      this.startDate,
      this.endDate)
      .subscribe((event: Event) => {
        this.loading = false;
        this.router.navigate(['/upcoming-events']);
      });
  }
}
