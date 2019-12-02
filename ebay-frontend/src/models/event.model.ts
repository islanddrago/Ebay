export class Event {
  public title: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public host: string;
  public host_name: string;
  public host_picture: string;
  public location: string;
  public rsvps: string[];
  public latitude = 33.252150;
  public longitude = -97.153620;

  constructor(obj: any) {
    const { host, host_picture, host_name, title, description, startDate, endDate, location, rsvps } = obj;
    this.host = host || "";
    this.host_name = host_name || "";
    this.host_picture = host_picture || "";
    this.title = title || "";
    this.description = description || "";
    this.startDate = !!startDate ? new Date(startDate) : new Date();
    this.endDate = !!endDate ? new Date(endDate) : new Date();
    this.location = location || "";
    this.rsvps = rsvps || [];
  }
}
