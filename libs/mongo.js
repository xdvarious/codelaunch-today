import { MongoClient } from "mongodb";

// This library serves solely for database connection within next-auth.
// It's not utilized in other API routes—mongoose.js is preferred for those (to enable model usage)
// Refer to the /libs/nextauth.js file for implementation details.

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  console.group("⚠️ MONGODB_URI not found in .env");
  console.error(
    "While optional, a database connection is necessary for Magic Link authentication."
  );
  console.error(
    "If this feature isn't needed, delete the relevant code from /libs/next-auth.js (check connectMongo())"
  );
  console.groupEnd();
} else if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
