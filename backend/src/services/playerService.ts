import { db } from "../database.ts";
import { player } from "../db/schema.ts";

export const getPlayerNames = async () => {
  const rows: { username: string }[] = await db
    .select({ username: player.username })
    .from(player);
  console.log("hej");
  if (!rows) return { error: "No player fond" };
  try {
    return rows;
  } catch (error) {
    return { error };
  }
};
export default {
  getPlayerNames,
};
