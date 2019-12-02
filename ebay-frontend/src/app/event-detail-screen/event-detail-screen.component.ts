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

  

  // event = { // Will be populated in onInit
  //   name: "Volleyball",
  //   date: "September 12th",
  //   startTime: "2:00 PM",
  //   endTime: "4:00 PM",
  //   hostName: "Gabriel",
  //   hostProfileImg: "assets/laughing-boy.jpg",
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  //   latitude: 33.214480,
  //   longitude: -97.145870,
  //   rsvps: [
  //     {
  //       img: 'assets/beff-jezos.jpg',
  //       name: 'Beff Jezos',
  //     },
  //     {
  //       img: 'assets/beff-jezos.jpg',
  //       name: 'Steph Jezos',
  //     },
  //     {
  //       img: 'assets/beff-jezos.jpg',
  //       name: 'Carl',
  //     }
  //   ]
  // }
  eventID: string;
  event: Event;
  startTime: string;
  endTime: string;
  rsvps: User[];
  isLoading = true;
  error = false;
  mapType = 'roadmap';

  constructor(private eventService: EventService, private route: ActivatedRoute, private identityService: IdentityService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.eventID = params['id'];
      this.eventService.getEvent(this.eventID).subscribe((event: Event) => {
        if (!!event) {
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

}
