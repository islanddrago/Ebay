import { Point } from "./point.model";

export class Event {
  public title: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public host: string;
  public location: Point;
  public rsvps: string[];

  constructor(host: string, title: string, description: string, startDate: Date, endDate: Date, location: Point) {
    this.host = host;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
  }
}
