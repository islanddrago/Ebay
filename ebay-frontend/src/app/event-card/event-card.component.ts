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
  @Input() event: Event;
  @Input() eventID: string;
  loading = true;
  error = false;

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    if (!this.event) {
      this.eventService.getEvent(this.eventID).subscribe((event: Event) => {
        if (!!event) {
          this.event = new Event(event);
        } else {
          this.error = true;
        }
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  showEventDetail() {
    console.log(this.eventID);
    console.log(this.event._id);
    if(!this.eventID) {
      this.router.navigate(['event-details', this.event._id]);
    } else {
      this.router.navigate(['event-details', this.eventID]);
    }
  }

}
