import { db } from "../database.ts";
import type {
  AllPlayerData,
  PlayerNameRow,
  Result,
  PlayerRow,
  UpdateUserConfirmation,
  AddUserConfirmation,
  DeleteUserConfirmation,
  WithAuth,
} from "../types.ts";
import bcrypt from "bcrypt";
const noUserFoundErr = "User or password is incorrect!";
const passwordNotMatchName = "Password and username does not match";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const getPlayerNames = async (): Promise<Result<PlayerNameRow[]>> => {
  try {
    const { rows } = await db.query<PlayerNameRow>(
      `SELECT id, name from player`,
    );
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error };
  }
};

export const confirmPlayer = async (
  name: string,
  password: string,
): Promise<Result<Partial<PlayerRow & WithAuth>>> => {
  // const hash = await bcrypt.compare(password, );
  try {
    const { rows } = await db.query<PlayerRow>(
      `
    SELECT id, name, password_hash FROM player WHERE name = $1;
`,
      [name],
    );
    if (!rows[0]) return { ok: false, error: noUserFoundErr };

    const confirmPassword = await bcrypt.compare(
      password,
      rows[0].password_hash,
    );

    if (!confirmPassword) return { ok: false, error: passwordNotMatchName };
    const secret = process.env.JWT_HASH;
    if (!secret) throw new Error("JWT_HASH is not in .env");
    const token = jwt.sign({ id: rows[0].id }, secret);
    return { ok: true, data: { id: rows[0].id, token } };
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
};

export const getPlayerById = async (id: string): Promise<Result<PlayerRow>> => {
  try {
    const { rows } = await db.query<PlayerRow>(
      ` 
    SELECT id, name, current_balance, highest_score FROM player WHERE id = $1;
`,
      [id],
    );
    if (!rows[0]) throw new Error(noUserFoundErr);
    return { ok: true, data: rows[0] };
  } catch (error) {
    return { ok: false, error };
  }
};

export const getAllPlayerDataById = async (
  id: string,
): Promise<Result<PlayerRow>> => {
  const { rows } = await db.query<PlayerRow>(
    ` 
    SELECT * FROM player WHERE id = $1;
`,
    [id],
  );
  if (!rows[0]) throw new Error(noUserFoundErr);
  try {
    return { ok: true, data: rows[0] };
  } catch (error) {
    return { ok: false, error };
  }
};

export const updatePlayer = async (
  id: string,
  updatedData: Partial<AllPlayerData>,
): Promise<Result<UpdateUserConfirmation>> => {
  try {
    const { name, password_hash, current_balance, highest_score } = updatedData;
    const { rows } = await db.query<PlayerRow>(
      `
    UPDATE player
    SET 
      name = $1,
      password_hash = $2,
      current_balance = $3,
      highest_score = $4
    WHERE id = $5
    RETURNING id; `,
      [name, password_hash, current_balance, highest_score, id],
    );
    if (!rows[0]) throw new Error(noUserFoundErr);
    return { ok: true, data: { user_updated: { id: rows[0].id } } };
  } catch (error) {
    return { ok: false, error };
  }
};

export const createPlayer = async (
  name: string,
  password: string,
): Promise<Result<AddUserConfirmation>> => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await db.query<PlayerNameRow>(
      `
   INSERT INTO 
      player(name, password_hash)
    VALUES
      ($1, $2)
    RETURNING id, name;
`,
      [name, hash],
    );
    if (!rows[0]) throw new Error(noUserFoundErr);
    return { ok: true, data: { user_added: { id: rows[0].id } } };
  } catch (error) {
    return { ok: false, error };
  }
};

export const deletePlayerById = async (
  id: string,
): Promise<Result<DeleteUserConfirmation>> => {
  try {
    const { rows } = await db.query<PlayerNameRow>(
      `
    DELETE FROM player
    WHERE id = $1 
    RETURNING id, name;
`,
      [id],
    );
    if (!rows[0]) throw new Error(noUserFoundErr);
    return { ok: true, data: { user_deleted: { id: rows[0].id } } };
  } catch (error) {
    return { ok: false, error };
  }
};
export default {
  getPlayerNames,
  getPlayerById,
  createPlayer,
  deletePlayerById,
  getAllPlayerDataById,
  updatePlayer,
  confirmPlayer,
};
