import { serial, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const player = pgTable("player", {
  id: serial("id").primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  password_hash: varchar({ length: 255 }).notNull(),
  current_balance: integer().notNull(),
  sessions_played: integer().notNull(),
});

export const session = pgTable("session", {
  id: serial("id").primaryKey(),
  highest_bet: integer(),
  biggest_loss: integer(),
  biggest_win: integer(),
});

export const player_session = pgTable("player_session", {
  id: serial("id").primaryKey(),
  player_id: integer()
    .references(() => player.id)
    .notNull(),
  session_id: integer()
    .references(() => session.id)
    .notNull(),
});
