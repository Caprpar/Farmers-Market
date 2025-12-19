import { Router } from "express";
import {
  getPlayerNames,
  getPlayerById,
  deletePlayerById,
  createPlayer,
  updatePlayer,
  confirmPlayer,
} from "../controls/playerController.ts";
import authMiddleware from "./authMiddleware.ts";
const router = Router();

router.get("/players", getPlayerNames);
router.post("/player", createPlayer);
router.get("/player/:id", authMiddleware, getPlayerById);
router.post("/player/auth", confirmPlayer);
router.delete("/player/:id", deletePlayerById);
router.patch("/player/:id", authMiddleware, updatePlayer);

export default router;
