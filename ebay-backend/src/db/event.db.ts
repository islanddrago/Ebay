import { Event } from "../models/event.model";
import { createMongoConnection } from "./base.db";

export async function createEvent(event: Event): Promise<Event> {
  const client = await createMongoConnection();
  return new Promise<Event>((resolve, reject) => {
    client.db("ebay").collection("event", (collectionError, collection) => {
      if (!!collectionError) {
        return reject(collectionError);
      }

      collection.insertOne(event, (insertError, result) => {
        client.close();
        if (!!insertError) {
          return reject(insertError);
        } else {
          return resolve(event);
        }
      });
    });
  });
}
