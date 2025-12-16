export interface AllPlayerData {
  id: string;
  name: string;
  password_hash: string;
  current_balance: number;
  highest_score: number;
}

export interface UpdateUserConfirmation {
  user_updated: Partial<PlayerNameRow>;
}

export interface AddUserConfirmation {
  user_added: Partial<PlayerNameRow>;
}

export interface DeleteUserConfirmation {
  user_deleted: Partial<PlayerNameRow>;
}

export type ErrorResult = {
  error: unknown;
};

export type Result<T> =
  | {
      ok: true;
      data: T;
    }
  | { ok: false; error: unknown };

export type PlayerNameRow = {
  id: number;
  name: string;
};

export type PlayerRow = {
  id: string;
  name: string;
  password_hash: string;
  current_balance: number;
  highest_score: number;
};

export interface WithAuth {
  token: string;
}

export interface AuthRequest extends Request {
  player: PlayerRow;
}
