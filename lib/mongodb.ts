import { ENV } from "@/constants";
import mongoose from "mongoose";

const MONGODB_URI = ENV.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface CachedConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedConnection;
}

/**
 * Cached connection for MongoDB.
 */
let cached: CachedConnection = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    cached.conn = (await cached.promise).connection;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export default {
  connect,
};
