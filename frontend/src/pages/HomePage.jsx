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
  console.log(tagList);

  const logoURL = await uploadImage(logo, "Image");
  const bannerURL = await uploadImage(banner, "Banner");

  const data = {
    name,
    description,
    logo: logoURL,
    banner: bannerURL,
    tagList,
  };
  console.log(data);

  const response = await fetch("http://localhost:8080/create-community", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return { error: "Backend failed to save" };
  }
  return { ok: true, communityName: data.name };
}
