export async function createPost({ request }) {
  const payload = await request.json();
  const response = await fetch("http://localhost:8080/create/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    return { error: "Backend failed to save" };
  }
  const data = await response.json();


  return { ok: true, id: data, communityName: payload.community };
}

