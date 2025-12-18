export function getAuthHeaders(): Headers {
  const token: string | null = localStorage.getItem("auth_token");
  const headers = new Headers({ "Content-Type": "application/json" });
  if (token) headers.set("authorization", token);
  return headers;
}
