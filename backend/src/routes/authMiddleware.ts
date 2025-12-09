import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { getPlayerById } from "../services/playerService.ts";

dotenv.config();

interface Player {
  id: number;
  name: string;
  // current_balance: number;
  // highest_score: number;
}

interface TokenPayLoad extends JwtPayload {
  id: string;
}

interface AuthRequest extends Request {
  player?: Player;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "invalid token" });
  }
  try {
    const decoded = jwt.verify(
      authorization.replace("Bearer ", ""),
      process.env.JWT_HASH!,
    ) as TokenPayLoad;
    const player = (await getPlayerById(decoded.id)) as Player;
    if (!player) {
      return res.status(401).json({ error: "player not found" });
    }
    req.player = player;
  } catch (error) {
    return res.status(401).json({ error });
  }
  next();
};

export default authMiddleware;
