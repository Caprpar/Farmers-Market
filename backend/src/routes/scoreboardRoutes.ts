import { Router } from "express";
import { getScoreboard } from "../controls/scoreboardController.ts";

const router = Router();

router.get("/scoreboard", getScoreboard);

export default router;
