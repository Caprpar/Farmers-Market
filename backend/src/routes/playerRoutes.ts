import { Router } from "express";
import {
  getPlayerNames,
  getPlayerById,
  deletePlayerById,
  createPlayer,
  updatePlayer,
} from "../controls/playerController.ts";
const router = Router();

router.get("/players", getPlayerNames);
router.post("/player", createPlayer);
router.get("/player/:id", getPlayerById);
router.delete("/player/:id", deletePlayerById);
router.patch("/player/:id", updatePlayer);

export default router;
