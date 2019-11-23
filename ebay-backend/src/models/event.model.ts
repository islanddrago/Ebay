export class Event {
  public title: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public host: string;
  public location: string;
  public rsvps: string[];

  constructor(obj: any) {
    const { host, title, description, startDate, endDate, location, rsvps } = obj;
    this.host = host || "";
    this.title = title || "";
    this.description = description || "";
    this.startDate = startDate || new Date();
    this.endDate = endDate || new Date();
    this.location = location || "";
    this.rsvps = rsvps || [];
  }
}
