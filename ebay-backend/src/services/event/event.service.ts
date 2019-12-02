import { CreateEventRequest, RemoveUserFromRSVPRequest } from "../../controllers/event/event.request";
import { RSVPToEventResponse, UnRSVPToEventResponse } from "../../controllers/event/event.response";
import { addRSVPToEvent, createEvent, deleteEvent, getAllEvents, getEventByID, removeRSVPFromEvent } from "../../db/event.db";
import { addEventToRSVP, getUserByID, removeEventFromRSVP } from "../../db/user.db";
import { Event } from "../../models/event.model";
import { User } from "../../models/user.model";

const EventService = {
  async getEventByID(eventID: string): Promise<Event> {
    return getEventByID(eventID);
  },

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    try {
      const events: Event[] = await getAllEvents();
      return events.filter((event) => event.startDate > now);
    } catch (error) {
      console.log("caught: ", error);
      throw error;
    }
  },

  async createEvent(user: User, createEventRequest: CreateEventRequest): Promise<Event> {
    const event = createEventRequest.event;
    event.host = user.user_id;
    event.host_picture = user.picture;
    event.host_name = user.given_name || user.nickname;
    return createEvent(event);
  },

  async deleteEvent(user: User, eventID: string): Promise<Event> {
    // check that the event exists and belongs to the logged in user
    try {
      const eventToDelete = await this.getEventByID(eventID);
      if (!eventToDelete) {
        throw new Error("Event does not exist.");
      }
      if (eventToDelete.host !== user.user_id) {
        throw new Error("User is not authorized to delete this event.");
      }

      if (await deleteEvent(eventID)) {
        return eventToDelete;
      }
      throw new Error("Event failed to delete");
    } catch (error) {
      throw error;
    }
  },

  async rsvpToEvent(user: User, eventID: string): Promise<RSVPToEventResponse> {
    try {
      // get event to RSVP to
      const event = await getEventByID(eventID);
      if (!event) {
        throw new Error("Event does not exist.");
      }
      // make sure the user is not the host of the event
      if (event.host === user.user_id) {
        throw new Error("You cannot RSVP to your own event.");
      }

      // add RSVP to event
      if (!await addRSVPToEvent(eventID, user.user_id)) {
        throw new Error("Failed adding RSVP to event.");
      }
      if (!event.rsvps.includes(user.user_id)) {
        event.rsvps.push(user.user_id);
      }

      // add event to user's RSVPs
      if (!await addEventToRSVP(user, eventID)) {
        throw new Error("Failed adding event to user RSVP list.");
      }
      if (!user.rsvps.includes(eventID)) {
        user.rsvps.push(eventID);
      }
      return { event, user };
    } catch (error) {
      throw error;
    }
  },

  async unrsvpFromEvent(user: User, eventID: string): Promise<UnRSVPToEventResponse> {
    try {
      // get event to unRSVP to
      const event = await getEventByID(eventID);
      if (!event) {
        throw new Error("Event does not exist.");
      }

      // remove RSVP from event
      if (!await removeRSVPFromEvent(eventID, user.user_id)) {
        throw new Error("Failed removing RSVP to event.");
      }
      const userIdIndex = event.rsvps.indexOf(user.user_id);
      if (userIdIndex >= 0) {
        event.rsvps.splice(userIdIndex, 1);
      }

      // remove event from user's RSVPs
      if (!await removeEventFromRSVP(user, eventID)) {
        throw new Error("Failed removing event to user RSVP list.");
      }
      const eventIdIndex = user.rsvps.indexOf(eventID);
      if (eventIdIndex >= 0) {
        user.rsvps.splice(eventIdIndex, 1);
      }
      return { event, user };
    } catch (error) {
      throw error;
    }
  },

  async removeUserFromRSVP(loggedInUser: User, removeUserRequest: RemoveUserFromRSVPRequest):
    Promise<UnRSVPToEventResponse> {
    try {
      const { userID, eventID } = removeUserRequest;
      // get event to unRSVP to
      const event = await getEventByID(eventID);
      if (!event) {
        throw new Error("Event does not exist.");
      }
      // check that the logged in user owns the event
      if (loggedInUser.user_id !== event.host) {
        throw new Error("Logged in user does not have permission to remove users from RSVP list.");
      }

      // remove RSVP from event
      if (!await removeRSVPFromEvent(eventID, userID)) {
        throw new Error("Failed removing RSVP from event.");
      }
      const userIdIndex = event.rsvps.indexOf(userID);
      if (userIdIndex >= 0) {
        event.rsvps.splice(userIdIndex, 1);
      }

      // remove event from user's RSVPs
      const user = await getUserByID(userID);
      if (!await removeEventFromRSVP(user, eventID)) {
        throw new Error("Failed removing event to user RSVP list.");
      }
      const eventIdIndex = user.rsvps.indexOf(eventID);
      if (eventIdIndex >= 0) {
        user.rsvps.splice(eventIdIndex, 1);
      }
      return { event, user };
    } catch (error) {
      throw error;
    }
  },
};
export default EventService;
