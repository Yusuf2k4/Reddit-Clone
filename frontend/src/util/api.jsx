// Log the user in
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

// Get current User
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

// Create Post
export async function createPost({ request }) {
  const payload = await request.json();
  console.log(payload);
  const response = await fetch("http://localhost:8080/create/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!response.ok) {
    return { error: "Backend failed to save" };
  }
  const data = await response.json();

  return { ok: true, id: data, communityName: payload.community };
}

// Get all the communities
export async function getCommunities({ req, res }) {
  const response = await fetch("http://localhost:8080/communities");
  const data = await response.json();
  return data;
}

// Get post by ID
export async function getPostById({ params }) {
  const { id } = params;
  const respone = await fetch(`http://localhost:8080/post/${id}`);
  const data = await respone.json();
  return data;
}

// Create community
export async function postCommunity(data) {
  console.log("HELLO");
  console.log(data);
  const communityRequest = await fetch(
    "http://localhost:8080/create-community",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    },
  );
  if (!communityRequest.ok) {
    return { error: "Backend failed to save" };
  }
  return { ok: true, communityName: data.name };
}

// Get all topics
export async function getTopics() {
  const response = await fetch("http://localhost:8080/topic");
  if (!response.ok) {
    throw new Error("failed to retreive data");
  }
  const data = await response.json();
  return data;
}

// Register-User (sign up)
export async function signUpUser(formData) {
  const response = await fetch("http://localhost:8080/register-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    return { error: "FAILED FOR SOME REASON" };
  }
  return await response.text();
}

// Get communities by their name 
export async function searchCommunities(communityName) {
  const response = await fetch(
    `http://localhost:8080/communities/${communityName}`,
  );
  const data = await response.json();
  return data;
}


// Logout
export async function logout(){
  const response = await fetch("http://localhost:8080/logout", {
      method: "post",
      credentials: "include",
    });
    await response.text();
}

// Get Community By name
export async function getCommunityByName({ params }) {
  const { communityName } = params;
  const response = await fetch(`http://localhost:8080/r/${communityName}`);
  if (!response.ok) {
    throw new Error("Not found");
  }
 
  const data = response.json();
  return data;
}

//Fetch posts by community name 
export async function fetchPostsByCommunity(communityName, pageNo, size ){
  const response = await fetch(`http://localhost:8080/post/community/${communityName}?page=${pageNo}&size=${size}`);
  const data = await response.json();
  return data;
}