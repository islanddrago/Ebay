import { Event } from "../../models/event.model";

/**
 * event.request.ts
 * defines request models related to events
 */

export class CreateEventRequest {
  public event: Event;

  constructor(body: any) {
    Object.assign(this, body);
  }

  public isValid(): boolean {
    return !!this.event &&
      !!this.event.title &&
      !!this.event.startDate &&
      !!this.event.endDate &&
      !!this.event.description &&
      !!this.event.location;
  }
}

export class RemoveUserFromRSVPRequest {
  public userID: string;
  public eventID: string;

  constructor(body: any) {
    Object.assign(this, body);
  }

  public isValid(): boolean {
    return !!this.userID && !!this.eventID;
  }
}
