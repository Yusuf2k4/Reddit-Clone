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
import MainFeed from "./MainFeed";
import CustomFeed from "./CustomFeed";
import Line from "../style/Line";
import CreateCommunity from "../create Community/CreateCommunity";


const Sidebar = () => {
  
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMd, setIsMd] = useState(false);
  const modalRef = useRef();
  useEffect(() => {
    const handleSize = () => {
      setIsMd(window.innerWidth < 768);
    };
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

 
    function openModal(){
      
      modalRef.current.open()
    }
  


  return (
    <>
      <div className="mt-16 min-h-screen hidden md:block transition-all duration-300">
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

          {/* Main feed*/}
          {!isMd && (
            <div className="space-y-0 h-[calc(100vh-4rem)] overflow-y-auto pr-1">
              {isOpen && (
                <>
                  <MainFeed isOpen={isOpen} />
                  <Line />
                  <CustomFeed
                    sidebarOpen={isOpen}
                    title="CUSTOM FEEDS"
                    items={[{ icon: <Plus />, label: "Create custom feed" }]}
                  />
                  <Line />
                  <CustomFeed
                    sidebarOpen={isOpen}
                    title="RECENT"
                    items={[
                      { icon: <img src="vite.svg" />, label: "r/soccer" },
                      { icon: <img src="vite.svg" />, label: "r/Science" },
                    ]}
                  />
                  <Line />
                  <CustomFeed
                    sidebarOpen={isOpen}
                    title="COMMUNITIES"
                    items={[
                      { icon: <Plus />, label: "Create community",action:openModal },
                      { icon: <Settings />, label: "Manage Communities" },
                      { icon: <img src="vite.svg" />, label: "r/soccer" },
                      { icon: <img src="vite.svg" />, label: "r/Science" },
                      { icon: <Compass />, label: "r/compass" },
                      
                    ]}
                  />
                </>
                
              )}
              <CreateCommunity ref={modalRef} />
            </div>
          )}
        </div>
        
      </div>
    </>
  );
};

export default Sidebar;