import { Request, Response, Router } from "express";
import { authenticate, jwtCheck } from "../../middleware/authentication.middleware";
import { User } from "../../models/user.model";
import EventService from "../../services/event/event.service";
import { CreateEventRequest, RemoveUserFromRSVPRequest } from "./event.request";

const router = Router();

router.get("/upcoming-events", getUpcomingEvents);
router.get("/:eventID", getEventByID);
router.post("/", jwtCheck, authenticate, createEvent);
router.post("/:eventID/rsvp", jwtCheck, authenticate, rsvpToEvent);
router.post("/:eventID/unrsvp", jwtCheck, authenticate, unrsvpFromEvent);
router.post("/:eventID/unrsvp-user", jwtCheck, authenticate, removeUserFromRSVP);
router.delete("/:eventID", jwtCheck, authenticate, deleteEvent);

/**
 * get an event with a given event ID
 */
async function getEventByID(req: Request, res: Response) {
  const eventID = req.params.eventID;
  if (!eventID) {
    res.status(400).send("Bad request: Event ID required");
    return;
  }

  try {
    const body = await EventService.getEventByID(eventID);
    res.status(200).json({ body });
  } catch ({ message: error }) {
    console.log("err: ", error);
    res.status(500).json({ error });
  }
}

/**
 * get all upcoming events in the database
 */
async function getUpcomingEvents(req: Request, res: Response) {
  try {
    const events = await EventService.getUpcomingEvents();
    res.status(200).json({ events });
  } catch ({ message: error }) {
    res.status(500).json({ error });
  }
}

/**
 * Create an event in the database as the logged in user
 */
async function createEvent(req: Request, res: Response) {
  const user = req.user as User;
  const createEventRequest = new CreateEventRequest(req.body);
  if (!createEventRequest.isValid()) {
    res.status(400).send("Bad request: Invalid event body");
    return;
  }

  try {
    const body = await EventService.createEvent(user, createEventRequest);
    res.status(200).json({ body });
  } catch ({ message: error }) {
    console.log("err: ", error);
    res.status(500).json({ error });
  }
}

/**
 * Remove the specified users from the given event if the logged in user is the owner or admin
 */
async function removeUserFromRSVP(req: Request, res: Response) {
  const user = req.user as User;
  const eventID = req.params.eventID;
  const request = new RemoveUserFromRSVPRequest({ eventID, ...req.body });
  console.log("unrsvp: ", eventID);
  if (!eventID) {
    res.status(400).send("Bad request: Event ID required");
    return;
  }
  try {
    const body = await EventService.removeUserFromRSVP(user, request);
    res.status(200).json({ body });
  } catch ({ message: error }) {
    console.log("err: ", error);
    res.status(500).json({ error });
  }
}

/**
 * Delete the given event if the logged in user is owner or admin
 */
async function deleteEvent(req: Request, res: Response) {
  const user = req.user as User;
  const eventID = req.params.eventID;
  if (!eventID) {
    res.status(400).send("Bad request: Event ID required");
    return;
  }
  try {
    const body = await EventService.deleteEvent(user, eventID);
    res.status(200).json({ body });
  } catch ({ message: error }) {
    console.log("err: ", error);
    res.status(500).json({ error });
  }
}

/**
 * RSVP the logged in user to the specified event
 */
async function rsvpToEvent(req: Request, res: Response) {
  const user = req.user as User;
  const eventID = req.params.eventID;
  console.log("rsvp: ", eventID);
  if (!eventID) {
    res.status(400).send("Bad request: Event ID required");
    return;
  }
  try {
    const body = await EventService.rsvpToEvent(user, eventID);
    res.status(200).json({ body });
  } catch ({ message: error }) {
    console.log("err: ", error);
    res.status(500).json({ error });
  }
}

/**
 * Un-RSVP the logged in user from the specified event
 */
async function unrsvpFromEvent(req: Request, res: Response) {
  const user = req.user as User;
  const eventID = req.params.eventID;
  console.log("unrsvp: ", eventID);
  if (!eventID) {
    res.status(400).send("Bad request: Event ID required");
    return;
  }
  try {
    const body = await EventService.unrsvpFromEvent(user, eventID);
    res.status(200).json({ body });
  } catch ({ message: error }) {
    console.log("err: ", error);
    res.status(500).json({ error });
  }
}

export default router;
