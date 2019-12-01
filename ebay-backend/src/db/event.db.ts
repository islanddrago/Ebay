import mongo from "mongodb";

import { DATABASE, EVENTS_COLLECTION } from "../constants/db.constants";
import { Event } from "../models/event.model";
import { createMongoConnection } from "./base.db";

export async function getEventByID(eventID: string): Promise<Event> {
  const client = await createMongoConnection();
  return new Promise<Event>((resolve, reject) => {
    client.db(DATABASE).collection(EVENTS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.findOne({ _id: new mongo.ObjectID(eventID) }, (findError, result) => {
        client.close();
        return !!findError ? reject(findError) : resolve(new Event(result));
      });
    });
  });
}

export async function getAllEvents(): Promise<Event[]> {
  const client = await createMongoConnection();
  return new Promise<Event[]>((resolve, reject) => {
    const db = client.db(DATABASE);
    return db.collection(EVENTS_COLLECTION).find({}).toArray((findError, result) => {
      client.close();
      return !!findError ? reject(findError) : resolve(result.map((item) => new Event(item)));
    });
  });
}

export async function createEvent(event: Event): Promise<Event> {
  const client = await createMongoConnection();
  return new Promise<Event>((resolve, reject) => {
    client.db(DATABASE).collection(EVENTS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.insertOne(event, (insertError, result) => {
        client.close();
        return !!insertError ? reject(insertError) : resolve(event);
      });
    });
  });
}

export async function deleteEvent(eventID: string): Promise<boolean> {
  const client = await createMongoConnection();
  return new Promise<boolean>((resolve, reject) => {
    client.db(DATABASE).collection(EVENTS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.deleteOne({ _id: new mongo.ObjectID(eventID) }, (deleteError, result) => {
        client.close();
        return !!deleteError ? reject(deleteError) : resolve(!!result.result.ok);
      });
    });
  });
}

export async function addRSVPToEvent(eventID: string, userID: string): Promise<boolean> {
  const client = await createMongoConnection();
  return new Promise<boolean>((resolve, reject) => {
    client.db(DATABASE).collection(EVENTS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.update(
        { _id: new mongo.ObjectID(eventID) },
        { $addToSet: { rsvps: userID } },
        (updateError, result) => {
          client.close();
          return !!updateError ? reject(updateError) : resolve(!!result.result.nModified);
        });
    });
  });
}

export async function removeRSVPFromEvent(eventID: string, userID: string): Promise<boolean> {
  const client = await createMongoConnection();
  return new Promise<boolean>((resolve, reject) => {
    client.db(DATABASE).collection(EVENTS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.update(
        { _id: new mongo.ObjectID(eventID) },
        { $pull: { rsvps: userID } },
        (updateError, result) => {
          client.close();
          return !!updateError ? reject(updateError) : resolve(!!result.result.nModified);
        });
    });
  });
}
