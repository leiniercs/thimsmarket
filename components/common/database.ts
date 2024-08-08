import { MongoClient } from "mongodb";

export let dbClient: MongoClient = new MongoClient(
   process.env.DB_URI as string,
   { appName: "Thims Market - API Server", minPoolSize: 25 }
);
