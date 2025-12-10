import { db } from "../database.ts";
import type { QueryResult } from "pg";
import type { allPlayerData } from "../controls/playerController.ts";
import bcrypt from "bcrypt";

interface players {
  id: number;
  name: string;
}

interface player {
  id: number;
  name: string;
  current_balance: number;
  highest_score: number;
}

export const getPlayerNames = async () => {
  const { rows }: QueryResult<players> = await db.query(
    `SELECT id, name from player`,
  );
  if (!rows) return { error: "No player fond" };
  try {
    return rows;
  } catch (error) {
    return { error };
  }
};

export const getPlayerById = async (id: string) => {
  const { rows }: QueryResult<player> = await db.query(
    ` 
    SELECT id, name, current_balance, highest_score FROM player WHERE id = $1;
`,
    [id],
  );
  const user = rows[0];
  if (!user) return { error: "User not found" };
  try {
    return user;
  } catch (error) {
    return { error };
  }
};

export const getAllPlayerDataById = async (id: string) => {
  const { rows }: QueryResult<player> = await db.query(
    ` 
    SELECT * FROM player WHERE id = $1;
`,
    [id],
  );
  const user = rows[0];
  if (!user) return { error: "User not found" };
  try {
    return user;
  } catch (error) {
    return { error };
  }
};

export const updatePlayer = async (
  id: string,
  updatedData: Partial<allPlayerData>,
) => {
  try {
    const { name, password_hash, current_balance, highest_score } = updatedData;
    const { rows }: QueryResult<player> = await db.query(
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
    const user = rows[0];
    if (!user) return { error: "User not found" };
    return { updated_user: { id: user.id } };
  } catch (error) {
    return { error };
  }
};

export const createPlayer = async (name: string, password: string) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      `
    INSERT INTO 
      player(name, password_hash)
    VALUES
      ($1, $2)
    RETURNING id, name;
`,
      [name, hash],
    );
    return { added_player: rows[0] };
  } catch (error) {
    return { error };
  }
};

export const deletePlayerById = async (id: string) => {
  const { rows }: QueryResult<player> = await db.query(
    `
    DELETE FROM player
    WHERE id = $1 
    RETURNING id, name;
`,
    [id],
  );
  try {
    return { deleted_user: rows[0] };
  } catch (error) {
    return { error };
  }
};
export default {
  getPlayerNames,
  getPlayerById,
  createPlayer,
  deletePlayerById,
  getAllPlayerDataById,
  updatePlayer,
};

// export const deleteUserById = async (id) => {
//   const isUser = getUserById(id);
//   if (!isUser) return { error: `User not found` };
//   const { rows } = client.query("DELETE FROM users WHERE id = $1", [id]);
//   return { deleted: id };
// };

// export const patchUserById = async (id, prev) => {
//   const { name, mail, image } = prev;
//   const full_name = name
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
//
//   try {
//   } catch (error) {
//     return { error };
//   }
//   const user = await getUserById(id);
//   if (!prev) return { error: "User not found" };
//
//   const { rows } = await client.query(
//     `
//       UPDATE users
//       SET
//         name = $1,
//         mail = $2,
//         image = $3,
//         full_name = $4
//       WHERE id = $5;`,
//     [name || user.name, mail || user.mail, image || user.image, full_name, id],
//   );
//   return { updated_user: id };
// };

// export const getUserByMail = async (mail) => {
//   const { rows } = await client.query("select * from users where mail = $1", [
//     mail,
//   ]);
//   try {
//     return rows[0];
//   } catch (error) {
//     return { error };
//   }
// };
