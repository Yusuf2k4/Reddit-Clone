import React from "react";
import Home from "../components/Home";
import { uploadImage } from "../firebase/storage";
import { redirect, useNavigate } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Home></Home>
    </>
  );
};

export default HomePage;

export async function getTopics() {
  const response = await fetch("http://localhost:8080/topic");
  if (!response.ok) {
    throw new Error("failed to retreive data");
  }
  const data = await response.json();
  return data;
}

export async function createCommunity({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const logo = formData.get("logo");
  const banner = formData.get("Banner");
  const tagList = JSON.parse(formData.get("tagList"));
  let logoURL = "";
  let bannerURL = "";
  if (logo instanceof File && logo.size > 0) {
    logoURL = await uploadImage(logo, "Image");
  }
  else{
    logoURL = null;
  }

  // upload banner only if valid file
  if (banner instanceof File && banner.size > 0) {
    bannerURL = await uploadImage(banner, "Banner");
  }
  else{
    bannerURL = null;
  }

  
  const data = {
    name,
    description,
    logo: logoURL,
    banner: bannerURL,
    tagList,
  };

  

  const response = await fetch("http://localhost:8080/create-community", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!response.ok) {
    return { error: "Backend failed to save" };
  }
  return { ok: true, communityName: data.name };
}
