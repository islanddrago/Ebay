import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() eventID: string;
  event: Event;
  loading = true;
  error = false;

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getEvent(this.eventID).subscribe((event: Event) => {
      if (!!event) {
        this.event = new Event(event);
      } else {
        this.error = true;
      }
      this.loading = false;
    });
  }

  showEventDetail() {
    this.router.navigate(['/event', this.eventID]);
  }

}
