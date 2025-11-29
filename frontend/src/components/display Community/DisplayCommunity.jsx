import React from "react";
import logo from "../../assets/MessiLogo.png";
import banner from "../../assets/LeoMessiBanner.png";
import { useNavigate,  useRouteLoaderData } from "react-router";
import CommunityPostList from "./CommunityPostList";




function DisplayCommunity() {
  const community = useRouteLoaderData("community");

  const navigate = useNavigate();
  function handlePost(){
    navigate(`/r/${community.name}/post`)
  }

  return (
    <div className="w-full min-h-screen bg-black/5 pb-10">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-[#1c1c1c] pb-4 max-w-[1150px]">
        {/* Banner Container - Stays Full Width relative to the Outlet */}
        <div className="relative w-full">
          <img
            src={community.banner}
            alt="Banner"
            className="w-full h-[100px] sm:h-[140px] md:h-[150px] object-cover"
          />

          {/* Avatar - Bottom positioned */}
          <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-8">
            <img
              src={community.logo}
              alt="Logo"
              className="
                h-20 w-20 
                sm:h-24 sm:w-24 
                md:h-32 md:w-32 
                rounded-full border-4 border-[#1c1c1c] bg-white 
                object-cover
              "
            />
          </div>
        </div>

        {/* Community Details */}
        {/* CHANGE: Added max-w-6xl and REMOVED mx-auto to align left with the body */}
        <div className="max-w-6xl px-4 sm:px-8 mt-10 sm:mt-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            
            {/* Left Side: Title */}
            <div className="md:pl-[140px] flex flex-col"> 
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold truncate">
                r/{community.name}
              </h1>
              
            </div>

            {/* Right Side: Buttons */}
            <div className="flex gap-3 mt-2 md:mt-0">
              <button className="text-white px-6 py-2 text-sm sm:text-base border border-gray-500 rounded-full hover:bg-gray-800 transition-colors hover:cursor-pointer" onClick={handlePost}>
                Create Post
              </button>
              <button className="text-white px-6 py-2 text-sm sm:text-base bg-blue-600 border border-transparent rounded-full hover:bg-blue-500 font-semibold transition-colors hover:cursor-pointer">
                Joined
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- BODY CONTENT --- */}
      {/* CHANGE: ma  x-w-6xl (smaller width) and NO mx-auto (aligns left) */}
      <div className="max-w-6xl px-4 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT SECTION (Feed) */}
          {/* ORDER: 2 on Mobile, 1 on Desktop */}
          <div className="order-2 lg:order-1 flex-1 min-w-0"> 
            <div className="w-full rounded-xl  flex  items-start justify-center text-white/50 ">
              <CommunityPostList community={community} />
            </div>
          </div>

          {/* RIGHT SECTION (About Card) */}
          {/* ORDER: 1 on Mobile, 2 on Desktop */}
          <div className="order-1 lg:order-2 w-full lg:w-[350px] shrink-0">
            <div className="bg-[#1c1c1c] shadow-lg rounded-xl p-5 border border-white/10 lg:sticky lg:top-24">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-200 text-base">About Community</p>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                 <img src={community.logo} className="w-8 h-8 rounded-full" alt="" />
                 <span className="font-bold text-white">r/{community.name}</span>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed break-word">
                {community.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-y-4 border-b border-white/10 pb-4">
                <div>
                    <p className="text-lg font-bold text-white">22.1k</p>
                    <p className="text-xs text-gray-400">Members</p>
                </div>
                <div>
                    <p className="text-lg font-bold text-white">150</p>
                    <p className="text-xs text-gray-400">Online</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <span>📅</span> Created Dec 21, 2023
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default DisplayCommunity;









export async function getCommunity({params}){
  const {communityName} = params
  const response = await fetch(`http://localhost:8080/r/${communityName}`);
  if(!response.ok){
    throw new Error("Not found")
  }
  const data = response.json();
  return data;
}