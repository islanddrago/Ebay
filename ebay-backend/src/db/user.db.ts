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
        if (!!findError) {
          return reject(findError);
        }
        return resolve(result);
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
        if (!!insertError) {
          return reject(insertError);
        } else {
          return resolve(user);
        }
      });
    });
  });
}
