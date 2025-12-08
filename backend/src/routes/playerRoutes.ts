import { Router } from "express";
import { getPlayerNames } from "../services/playerService.ts";
const router = Router();

router.get("/players", async (_req, res) => {
  const result = await getPlayerNames();
  res.send(result);
});

export default router;
