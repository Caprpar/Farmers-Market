export type PlayerRow = {
  id: string;
  name: string;
  password_hash: string;
  current_balance: number;
  highest_score: number;
};

export interface PlayerRowWithError {
  data: PlayerRow;
  error: unknown;
}

export type PlayerRowResponse =
  | { ok: true; data: PlayerRow }
  | { ok: false; error: string };

export type PlayerAuthResponse =
  | { ok: true; data: { token: string } & PlayerRow }
  | { ok: false; error: string };

export type betButton = {
  value: number;
  isPressed: boolean;
  isDisabled: boolean;
};
