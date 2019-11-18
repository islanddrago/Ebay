import { MongoClient } from "mongodb";
import { CONNECTION_STRING } from "../constants/db.constants";

/**
 * perform mongodb operations with a client connection
 * @param handler a function which performs some actions with a MongoDB client
 */
export function createMongoConnection(): Promise<MongoClient> {
  return MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
}
