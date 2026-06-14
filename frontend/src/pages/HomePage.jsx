import React from "react";
import Home from "../components/Home";
import { uploadImage } from "../firebase/storage";
import { redirect, useNavigate } from "react-router-dom";
import CreateCommunity from "../components/create Community/CreateCommunity";
import { postCommunity } from "../util/api";

const HomePage = () => {
  return (
    <>
      <Home></Home>
    </>
  );
};

export default HomePage;


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


  const response = await postCommunity(data)
  return response;
  
}
