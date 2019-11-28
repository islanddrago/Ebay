import { DATABASE, USERS_COLLECTION } from "../constants/db.constants";
import { User } from "../models/user.model";
import { createMongoConnection } from "./base.db";

export async function getUserByID(user_id: string): Promise<User | undefined> {
  const client = await createMongoConnection();
  return new Promise<User | undefined>((resolve, reject) => {
    client.db(DATABASE).collection(USERS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.findOne({ user_id }, (findError, result) => {
        client.close();
        return !!findError ? reject(findError) : resolve(result);
      });
    });
  });
}

export async function createUser(user: User): Promise<User> {
  const client = await createMongoConnection();
  return new Promise<User>((resolve, reject) => {
    client.db(DATABASE).collection(USERS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.insertOne(user, (insertError, result) => {
        client.close();
        return !!insertError ? reject(insertError) : resolve(user);
      });
    });
  });
}

export async function addEventToRSVP(user: User, eventID: string): Promise<boolean> {
  const client = await createMongoConnection();
  return new Promise<boolean>((resolve, reject) => {
    client.db(DATABASE).collection(USERS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.update(
        { user_id: user.user_id },
        { $addToSet: { rsvps: eventID } },
        (updateError, result) => {
          client.close();
          return !!updateError ? reject(updateError) : resolve(!!result.result.nModified);
        });
    });
  });
}

export async function removeEventFromRSVP(user: User, eventID: string): Promise<boolean> {
  const client = await createMongoConnection();
  return new Promise<boolean>((resolve, reject) => {
    client.db(DATABASE).collection(USERS_COLLECTION, (collectionError, collection) => {
      if (!!collectionError) {
        client.close();
        return reject(collectionError);
      }

      collection.update(
        { user_id: user.user_id },
        { $pull: { rsvps: eventID } },
        (updateError, result) => {
          client.close();
          return !!updateError ? reject(updateError) : resolve(!!result.result.nModified);
        });
    });
  });
}
