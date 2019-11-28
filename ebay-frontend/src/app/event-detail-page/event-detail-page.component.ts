import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {

  rsvps = [
    {
      img: 'assets/beff-jezos.jpg',
      name: 'Beff Jezos',
    },
    {
      img: 'assets/beff-jezos.jpg',
      name: 'Steph Jezos',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
