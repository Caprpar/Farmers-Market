import { Router } from "express";
import { db } from "../database.ts";
import { player } from "../db/schema.ts";
import { getPlayerNames } from "../services/playerService.ts";
const router = Router();

router.get("/players", async (_req, res) => {
  const result = await getPlayerNames();
  res.send(result);
});

export default router;
