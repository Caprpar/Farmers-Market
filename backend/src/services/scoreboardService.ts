import { db } from "../database.ts";
import type { QueryResult } from "pg";

type player_with_highscore = {
  player: string;
  highscore: number;
};

export const getScoreboard = async () => {
  const { rows }: QueryResult<player_with_highscore[]> = await db.query(`
    SELECT p.name AS player, p.id AS id,
    COALESCE(MAX(p.highest_score),0) AS highscore
    FROM player p
      LEFT JOIN player_session ps ON ps.player_id = p.id
      LEFT JOIN session s ON s.player_id = ps.id
    GROUP BY p.id
    ORDER BY highscore DESC;
`);
  if (!rows) return { error: "No highscore found" };
  try {
    return rows;
  } catch (error) {
    return { error };
  }
};

export default {
  getScoreboard,
};
