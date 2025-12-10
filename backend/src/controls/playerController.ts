import playerService from "../services/playerService.ts";
import type { Request, Response } from "express";

export interface allPlayerData {
  id: string;
  name: string;
  password_hash: string;
  current_balance: number;
  highest_score: number;
}

export const getPlayerNames = async (_req: Request, res: Response) => {
  try {
    const rows = await playerService.getPlayerNames();
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await playerService.getPlayerById(id!);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deletePlayerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await playerService.deletePlayerById(id!);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { name, password } = (await req.body) as {
      name: string;
      password: string;
    };
    const rows = await playerService.createPlayer(name, password);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("id is not defined");
    const old = (await playerService.getAllPlayerDataById(
      id,
    )) as Partial<allPlayerData>;
    const { name, password_hash, current_balance, highest_score } =
      req.body as Partial<allPlayerData>;
    const updatedData = {
      name: name ?? old.name!,
      password_hash: password_hash ?? old.password_hash!,
      current_balance: current_balance ?? old.current_balance!,
      highest_score:
        current_balance! > old.highest_score!
          ? current_balance!
          : (highest_score ?? old.highest_score!),
    };
    const rows = await playerService.updatePlayer(id, updatedData);
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  getPlayerNames,
};
