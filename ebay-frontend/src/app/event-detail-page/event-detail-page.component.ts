import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {

  

  event = { // Will be populated in onInit
    name: "Volleyball",
    date: "September 12th",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    hostName: "Gabriel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    latitude: 33.214480,
    longitude: -97.145870,
    rsvps: [
      {
        img: 'assets/beff-jezos.jpg',
        name: 'Beff Jezos',
      },
      {
        img: 'assets/beff-jezos.jpg',
        name: 'Steph Jezos',
      },
      {
        img: 'assets/beff-jezos.jpg',
        name: 'Carl',
      }
    ]
  }
  
  mapType = 'roadmap';

  constructor() { }

  ngOnInit() {
  }

}
