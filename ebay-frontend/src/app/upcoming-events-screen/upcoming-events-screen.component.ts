import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Event } from '../../models/event.model';
import { IdentityService } from '../../services/identity.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-upcoming-events-screen',
  templateUrl: './upcoming-events-screen.component.html',
  styleUrls: ['./upcoming-events-screen.component.scss']
})
export class UpcomingEventsScreenComponent implements OnInit {
  events: Array<Event>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getUpcomingEvents().subscribe((events: Array<Event>) => {
      this.events = events || [];
    });
  }

}
