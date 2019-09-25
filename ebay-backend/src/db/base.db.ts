import { MongoClient } from "mongodb";
const uri = "mongodb+srv://ebay:eventbay@ebay0-1iadj.gcp.mongodb.net/test?retryWrites=true&w=majority";

/**
 * perform mongodb operations with a client connection
 * @param handler a function which performs some actions with a MongoDB client
 */
export function createMongoConnection(): Promise<MongoClient> {
  return MongoClient.connect(uri);
}
