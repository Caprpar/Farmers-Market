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

export type betButton = {
  value: number;
  isPressed: boolean;
  isDisabled: boolean;
};
