import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-event-screen',
  templateUrl: './create-event-screen.component.html',
  styleUrls: ['./create-event-screen.component.scss']
})
export class CreateEventScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class NameEditorComponent {
  name = new FormControl('');
}

export class LocationEditorComponent {
  location = new FormControl('');
}

export class DateEditorComponent {
  date = new FormControl('');
}
