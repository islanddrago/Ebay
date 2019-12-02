import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from 'src/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-screen',
  templateUrl: './create-event-screen.component.html',
  styleUrls: ['./create-event-screen.component.scss']
})
export class CreateEventScreenComponent implements OnInit {

  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  createEvent() {
    this.eventService.createEvent(
      this.title,
      this.description,
      this.location,
      this.startDate.toISOString(),
      this.endDate.toISOString())
      .subscribe((event: Event) => {
        this.router.navigate(['/upcoming-events']);
      });
  }
}
