export async function logUser(data) {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    return { error: "Login failed" };
  }
}
export async function getUser() {
  const response = await fetch("http://localhost:8080/me", {
    credentials: "include",
  });
  if (!response.ok) {
    return { error: "fetching user failed" };
  }
  const data = await response.json();
  return data;
}
