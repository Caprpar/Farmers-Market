import scoreboardService from "../services/scoreboardService.ts";
import type { Request, Response } from "express";

export const getScoreboard = async (_req: Request, res: Response) => {
  try {
    const rows = await scoreboardService.getScoreboard();
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  getScoreboard,
};
