import { Event } from "../../models/event.model";
import { User } from "../../models/user.model";

/**
 * event.response.ts contains definitions of response models
 */

export interface RSVPToEventResponse {
  event: Event;
  user: User;
}

export interface UnRSVPToEventResponse {
  event: Event;
  user: User;
}
