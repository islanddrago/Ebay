import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/event.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.model';
import { IdentityService } from 'src/services/identity.service';

@Component({
  selector: 'app-event-detail-screen',
  templateUrl: './event-detail-screen.component.html',
  styleUrls: ['./event-detail-screen.component.scss']
})
export class EventDetailScreenComponent implements OnInit {

  eventID: string;
  event: Event;
  startTime: string;
  endTime: string;
  rsvps: User[] = [];
  rsvped = false;
  shouldRsvp = "RSVP";
  isLoading = true;
  error = false;
  mapType = 'roadmap';

  constructor(private eventService: EventService, private route: ActivatedRoute, private identityService: IdentityService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventID = params['id'];
      this.eventService.getEvent(this.eventID).subscribe((event: Event) => {
        if (!!event) {
          this.identityService.fetchLoggedInUserDetails().subscribe((response: any) => {
            if((response.user as User).rsvps.includes(this.eventID)) {
              this.rsvped = true;
              this.shouldRsvp = "unRSVP";
            }
          });
          this.event = new Event(event);
          this.startTime = this.formatTime(this.event.startDate);
          this.endTime = this.formatTime(this.event.endDate);
          for (const id of this.event.rsvps) {
            this.identityService.fetchUserDetails(id).subscribe((response: any) => {
              this.rsvps.push(response.user as User);
            });
          }
        } else {
          this.error = true;
        }
        this.isLoading = false;
      });
    });
  }

  formatTime(d: Date):string {
    const m = (d.getHours() > 12) ? "PM" : "AM";
    const h = (m == "PM") ? (d.getHours() - 12) : d.getHours();
    
    return h + ":" + d.getMinutes() + " " + m;
  }

  rsvpForEvent() {
    if(!this.rsvped) { // RSVP if false
      this.eventService.rsvpForEvent(this.eventID).subscribe((user: User) => {
          this.rsvped = true;
          this.shouldRsvp = "unRSVP";
      });
    } else { // unRSVP if true
      this.eventService.unRsvpForEvent(this.eventID).subscribe((user: User) => {
            this.rsvped = false;
            this.shouldRsvp = "RSVP";
      });
    }
  }

  getName(rsvp: User) {
    return rsvp.name || rsvp.given_name || rsvp.nickname;
  }

}
