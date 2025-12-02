import { Router } from "express";
import { db } from "../database.ts";
import { player } from "../db/schema.ts";
const router = Router();

router.get("/players", async (_req, res) => {
  const result = await db.select().from(player);
  res.send(result);
});

export default router;
