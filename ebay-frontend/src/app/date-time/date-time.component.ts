import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Output() valueChanged = new EventEmitter<string>();
  current: Date;

  date: Date;
  hour: string;
  minute: string;
  amPm: string;

  hourOptions: Array<string>;
  minuteOptions: Array<string>;

  constructor() {
    this.hourOptions = Array.from({ length: 12 }).map((e, i) => '' + (i + 1));
    this.minuteOptions = Array.from({ length: 60 }).map((e, i) => this.padTwoDigits(i));
    this.hour = '12';
    this.minute = '00';
    this.amPm = 'am';
  }

  ngOnInit() {
  }

  updateValue() {
    if (!this.date) {
      return;
    }
    let output = new Date(this.date);
    let hour = +this.hour;
    if (hour === 12) {
      hour = 0;
    }
    output.setHours((this.amPm.toLowerCase() === 'am' ? 0 : 12) + (+hour));
    output.setMinutes(+this.minute);
    this.valueChanged.emit(output.toString());
    console.log(output);
    this.current = output;
  }

  private padTwoDigits(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }
}
