import playerService from "../services/playerService.ts";
import { Request, Response } from "express";
export const getPlayerNames = async (_req: Request, res: Response) => {
  try {
    const rows = await playerService.getPlayerNames();
    return res.status(201).json(rows);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Oväntat fel" });
  }
};
export default {
  getPlayerNames,
};
