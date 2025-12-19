import type { PlayerRow, PlayerRowWithError } from "../types.js";

export function getAuthHeaders(): Headers {
  const token: string | null = localStorage.getItem("auth_token");
  const headers = new Headers({ "Content-Type": "application/json" });
  if (token) headers.set("authorization", token);
  return headers;
}

export async function confirmLogin(username: string, password: string) {
  const headers = getAuthHeaders();
  const res = await fetch("http://localhost:3000/api/player/auth", {
    method: "POST",
    headers,
    body: JSON.stringify({ name: username, password }),
  });
  const { data, error } = await res.json();
  if (!error) {
    localStorage.setItem("auth_token", data.token);
  }
  return { data, error };
}

export async function getPlayerData(): Promise<PlayerRowWithError> {
  const headers = getAuthHeaders();
  const res = await fetch(`http://localhost:3000/api/player/0`, { headers });
  const { data, error } = await res.json();
  return { data, error };
}

export async function createPlayer(
  username: string,
  password: string,
  confirmPassword: string,
): Promise<PlayerRowWithError> {
  const res = await fetch("http://localhost:3000/api/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username, password, confirmPassword }),
  });
  const { data, error } = await res.json();
  console.log({ data, error });
  return { data, error };
}

export async function patchPlayer(
  updated_data: Partial<PlayerRow>,
): Promise<PlayerRowWithError> {
  const headers = getAuthHeaders();
  const res = await fetch(`http://localhost:3000/api/player/0`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updated_data),
  });
  const { data, error } = await res.json();
  return { data, error };
}
