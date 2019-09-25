import { createEvent } from "../../db/event.db";
import { Event } from "../../models/event.model";
import { User } from "../../models/user.model";

const EventService = {
  async createEvent(user: User, event: Event) {
    event.host = user.user_id;
    return createEvent(event);
  }
};
export default EventService;
