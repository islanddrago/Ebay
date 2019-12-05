import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
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
  buttonLoading = false;
  rsvpLoading = true;
  error = false;
  mapType = 'roadmap';

  user: User;
  userID: string;
  hostID: string;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router, private identityService: IdentityService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventID = params['id'];
      const subscription = this.identityService.loggedInUser.subscribe((user) => {
        if (!!user) {
          this.user = user;
          this.userID = user.user_id;
          this.eventService.getEvent(this.eventID).subscribe((event: Event) => {
            if (!!event) {
              subscription.unsubscribe();
              this.hostID = event.host;
              if (user.rsvps.includes(this.eventID)) {
                this.rsvped = true;
                this.shouldRsvp = "unRSVP";
              }

              this.event = new Event(event);
              this.startTime = this.formatTime(this.event.startDate);
              this.endTime = this.formatTime(this.event.endDate);

              this.loadRSVPs();
            } else {
              this.error = true;
            }
            this.isLoading = false;
          });
        }
      })
    });
  }

  loadRSVPs() {
    this.rsvpLoading = true;
    this.identityService.getUsers(this.event.rsvps).subscribe((users: Array<User>) => {
      this.rsvpLoading = false;
      if (!!users) {
        this.rsvps = users;
      }
    });
  }

  formatTime(d: Date): string {
    const m = (d.getHours() >= 12) ? "PM" : "AM";
    const h = (d.getHours() > 12) ? (d.getHours() - 12) : d.getHours();

    return h + ":" + this.padTwoDigits(d.getMinutes()) + " " + m;
  }

  rsvpForEvent() {
    this.buttonLoading = true;
    if (!this.rsvped) { // RSVP if false
      this.eventService.rsvpForEvent(this.eventID).subscribe((user: User) => {
        this.buttonLoading = false;
        this.rsvped = true;
        this.shouldRsvp = "unRSVP";
        this.rsvps.push(this.user);
        this.user.rsvps.push(this.eventID);
        this.identityService.loggedInUser.next(this.user);
      });
    } else { // unRSVP if true
      this.eventService.unRsvpForEvent(this.eventID).subscribe((user: User) => {
        this.buttonLoading = false;
        this.rsvped = false;
        this.shouldRsvp = "RSVP";
        const userIndex = this.rsvps.findIndex(user => user.user_id === this.userID);
        if (userIndex >= 0) {
          this.rsvps.splice(userIndex, 1);
        }
        const eventIndex = this.user.rsvps.indexOf(this.eventID);
        if (eventIndex >= 0) {
          this.user.rsvps.splice(eventIndex, 1);
          this.identityService.loggedInUser.next(this.user);
        }
      });
    }
  }

  deleteEvent() {
    this.buttonLoading = true;
    this.eventService.deleteEvent(this.eventID).subscribe((event: Event) => {
      this.buttonLoading = false;
      this.router.navigate(['/upcoming-events']);
    });
  }

  openProfile(rsvp: User) {
    this.router.navigate(['/profile', rsvp.user_id]);
  }

  getName(rsvp: User) {
    return rsvp.name || rsvp.given_name || rsvp.nickname;
  }

  private padTwoDigits(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }
}
