import { ChartNoAxesColumnIncreasing, Home, Menu, Search } from "lucide-react";
import { ArrowCircleDownRight, ArrowCircleUpRight } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { CgCommunity } from "react-icons/cg";
import { RiUserCommunityLine } from "react-icons/ri";
import { Link, Outlet, useLocation } from "react-router-dom";

const MainFeed = ({ isOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    {
      name: "Popular",
      path: "/popular",
      icon: <ArrowCircleUpRight size={20} />,
    },
    { name: "Explore", path: "/explore", icon: <Search size={20} /> },
    {
      name: "Communities",
      path: "/communities",
      icon:<RiUserCommunityLine/>,
    },
  ];
  return (
    <>
      <nav className="mt-5 px-3 space-y-1 transition-all duration-700">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-2.5 py-3 rounded-md transition-all duration-150 cursor-pointer
          ${isOpen ? "lg:w-58 md:w-38 sm:w-0" : "w-0"}
          ${
            isActive
              ? "bg-[rgb(36,36,37)] text-gray-200"
              : "text-gray-400 hover:bg-[rgb(36,36,37)] hover:text-gray-200"
          }`}
            >
              {item.icon}
              <p className="text-sm font-medium">{item.name}</p>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default MainFeed;
