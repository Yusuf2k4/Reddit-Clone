// components/sidebar/Sidebar.jsx
import {
  ChartNoAxesColumnIncreasing,
  Compass,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { ArrowCircleDownRight, ArrowCircleUpRight } from "phosphor-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import SidebarContent from "./SidebarContent"; // NEW
// removed direct imports of MainFeed/CustomFeed/CreateCommunity/Line

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      setIsMd(window.innerWidth < 768);
    };
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <>
      <div className="mt-16 min-h-screen  transition-all duration-300">
        <div
          className={`${
            isOpen ? "lg:w-68 md:w-48 sm:w-0" : "w-14"
          } z-50 md:min-h-screen md:fixed md:border-r  md:border-white md:transition-all md:duration-300 lg:min-h-screen lg:fixed lg:border-r lg:border-white lg:transition-all duration-300`}
        >
          <div className="w-10 h-10 rounded-full absolute top-6 right-[-20.3px] border-white border-1 bg-[rgb(26,26,27)] ">
            <button
              type="button"
              className="w-full h-full rounded-full flex items-center justify-center text-2xl text-white cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Menu />
            </button>
          </div>

          {/* Main feed - keep same desktop-only condition */}
          {!isMd && (
            <div className="space-y-0 h-[calc(100vh-4rem)] overflow-y-auto pr-1">
              {isOpen && <SidebarContent sidebarOpen={isOpen} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
