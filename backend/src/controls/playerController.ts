import playerService from "../services/playerService.ts";
import type { Request, Response } from "express";

export const getPlayerNames = async (_req: Request, res: Response) => {
  try {
    const rows = await playerService.getPlayerNames();
    return res.status(201).json(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const confirmPlayer = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const rows = await playerService.confirmPlayer(name, password);

    if (!rows.ok) {
      console.log(rows.error);
      return res.status(500).json({ error: rows.error });
    }
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
  const players = await playerService.getPlayerNames();
  if (!players.ok) {
    return res.status(500).json({ error: players.error });
  }
  const existing: string[] = players.data.map((player) => player.name);
  try {
    const { name, password, confirmPassword } = (await req.body) as {
      name: string;
      password: string;
      confirmPassword: string;
    };

    if (
      existing.map((name) => name.toLowerCase()).includes(name.toLowerCase())
    ) {
      return res.status(422).json({
        name,
        error: "User already exists, please enter another username",
      });
    } else if (password !== confirmPassword) {
      console.log(players[0].error);
      return res.status(422).json({ name, error: "password must match" });
    }

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
    const old_player_rows = await playerService.getAllPlayerDataById(id);
    console.log(old_player_rows);
    if (!old_player_rows.ok) {
      return res.status(500).json({ error: old_player_rows.error });
    }
    const old_players = old_player_rows.data;
    const { name, password_hash, current_balance, highest_score } = req.body;
    const updatedData = {
      name: name ?? old_players.name!,
      password_hash: password_hash ?? old_players.password_hash!,
      current_balance: current_balance ?? old_players.current_balance!,
      highest_score:
        current_balance! > old_players.highest_score!
          ? current_balance!
          : (highest_score ?? old_players.highest_score!),
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
