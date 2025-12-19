import type {
  PlayerAuthResponse,
  PlayerRow,
  PlayerRowResponse,
} from "../types.js";

export function getAuthHeaders(): Headers {
  const token: string | null = localStorage.getItem("auth_token");
  const headers = new Headers({ "Content-Type": "application/json" });
  if (token) headers.set("authorization", token);
  return headers;
}

export async function confirmLogin(
  username: string,
  password: string,
): Promise<PlayerAuthResponse> {
  const headers = getAuthHeaders();
  const res = await fetch("http://localhost:3000/api/player/auth", {
    method: "POST",
    headers,
    body: JSON.stringify({ name: username, password }),
  });
  const body = (await res.json()) as PlayerAuthResponse;
  console.log(body);
  if (body.ok) {
    localStorage.setItem("auth_token", body.data.token);
  }
  return body;
}

export async function getPlayerData(): Promise<PlayerRowResponse> {
  const headers = getAuthHeaders();
  const res = await fetch(`http://localhost:3000/api/player/0`, { headers });
  const body = (await res.json()) as PlayerAuthResponse;
  return body;
}

export async function createPlayer(
  username: string,
  password: string,
  confirmPassword: string,
): Promise<PlayerRowResponse> {
  const res = await fetch("http://localhost:3000/api/player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username, password, confirmPassword }),
  });
  const body = (await res.json()) as PlayerRowResponse;
  return body;
}

export async function patchPlayer(
  updated_data: Partial<PlayerRow>,
): Promise<PlayerRowResponse> {
  const headers = getAuthHeaders();
  const res = await fetch(`http://localhost:3000/api/player/0`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updated_data),
  });
  const body = (await res.json()) as PlayerRowResponse;
  return body;
}
