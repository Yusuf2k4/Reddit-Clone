import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const RootLayout = () => {
  const closed = false;
  return (
    <div className="">
      <nav className="bg-[rgb(26,26,27)] py-3 px-6 border-b-[1px] border-b-white fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center gap-6">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src="logo.svg" alt="Logo" className="h-8" />
            </Link>
          </div>

          {/* Center: Search */}
          <div className="flex-1 flex justify-center ml-24">
            <div className="flex items-center bg-gray-700 px-4 py-2 rounded-full text-white w-full max-w-[600px]">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="search"
                placeholder="Search Reddit"
                className="bg-transparent outline-none text-sm placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* Right: Icons + Profile */}
          <div className="flex items-center text-white space-x-5">
            <Link to="/chats">
              <MessageCircle className="hover:text-orange-500 cursor-pointer" />
            </Link>
            <Link to="/post">
              <div className="flex items-center space-x-1 hover:text-orange-500 cursor-pointer">
                <Plus />
                <span>Create</span>
              </div>
            </Link>
            <Link to="/notifications">
              <Bell className="hover:text-orange-500 cursor-pointer" />
            </Link>
            <Link to="/profile">
              <img
                src="profile.jpg"
                alt="profile"
                className="h-8 w-8 rounded-full object-cover cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Add top margin to avoid content being hidden behind the navbar */}
      <div className="flex gap-x-[28%] ">
        <Sidebar />

        <div className="mt-16 shrink  transition-all duration-300 ease-in-out w-full">
          <Outlet />
        </div>

       
      </div>
    </div>
  );
};

export default RootLayout;