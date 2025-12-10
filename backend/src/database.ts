import "dotenv/config";
import { Client } from "pg";

export const db = new Client({
  connectionString: process.env.DATABASE_URL!,
  database: "farmers_market",
});

db.connect();
