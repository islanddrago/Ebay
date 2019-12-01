import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/event.model';
import { ActivatedRoute } from '@angular/router';

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
  mapType = 'roadmap';

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.eventService.getEvent(this.eventID).subscribe((event: Event) => {
        if (!!event) {
          this.event = new Event(event);
        } else {
          this.error = true;
        }
        this.loading = false;
      });
    });
  }

}
