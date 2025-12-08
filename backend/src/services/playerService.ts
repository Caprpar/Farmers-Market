import { db } from "../database.ts";
import type { QueryResult } from "pg";

interface players {
  id: number;
  name: string;
}

export const getPlayerNames = async () => {
  const { rows }: QueryResult<players> = await db.query(
    ` SELECT id, name from player`,
  );
  if (!rows) return { error: "No player fond" };
  try {
    return rows;
  } catch (error) {
    return { error };
  }
};

// export const createUser = async () => {
//   try {
//     const { rows } = await
//     return { name, mail };
//   } catch (error) {
//     return { error };
//   }
// };
//
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

// export const getUserById = async (id) => {
//   const { rows } = await client.query(
//     `SELECT json_build_object('id', id, 'name', name, 'mail', mail, 'image', image, 'full_name', full_name)  AS user FROM  users  WHERE id = $1`,
//     [id],
//   );
//   const user = rows[0].user;
//   if (!user) ({ error: "User not found" });
//   try {
//     return user;
//   } catch (error) {
//     return { error };
//   }
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

export default {
  // createUser,
  // deleteUserById,
  // patchUserById: patchUserById,
  // getUserById,
  getPlayerNames,
  // getUserByMail,
};
