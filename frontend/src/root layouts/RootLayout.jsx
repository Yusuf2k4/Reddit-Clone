import { Bell, MessageCircle, Plus, Search, Menu } from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import MobileSidebar from "../components/sidebar/MobileSidebar";
import LoginModal from "../components/modal/LoginModal";
import { UserContext } from "../context/UserContext";

const RootLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const signUpRef = useRef();
  const {user} = useContext(UserContext)
  
  
  return (
    <div>
      <nav className="bg-[rgb(26,26,27)] py-3 px-4 border-b-[1px] border-b-white fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          {/* Mobile menu btn */}
          <button
            className="md:hidden p-1 rounded-md"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          {/* Logo (hidden on mobile) */}
          <div className="hidden md:flex items-center">
            <Link to="/">
              <img src="logo.svg" alt="Logo" className="h-8" />
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center bg-gray-700 px-3 py-2 rounded-full text-white w-full max-w-[600px]">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="search"
                placeholder="Search Reddit"
                className="bg-transparent outline-none text-sm placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            {/* hide on mobile */}
            <div className="hidden md:flex items-center space-x-5 text-white">
              <Link to="/chats" className={`${user ? "":"hidden" }`}>
                <MessageCircle />
              </Link>
              <Link to="/post" className={`${user ? "":"hidden" }`}>
                <div className="flex items-center space-x-1">
                  <Plus />
                  <span>Create</span>
                </div>
              </Link>
              <Link to="/notifications" className={`${user ? "":"hidden" }`}>
                <Bell />
              </Link>
            </div>

            {/* Login button - visible only on small screens, positioned to the right */}
            <button
              onClick={() => signUpRef.current.open()}
              className={`px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 ${user ? "hidden": ""}`}
              aria-label="Login"
            >
              Login
            </button>
            <LoginModal ref={signUpRef} />

            {/* Always visible on all sizes (you can hide if you prefer to show profile only when logged in) */}
            <Link to="/profile" className="">
              <img
                src="https://www.svgrepo.com/show/57063/reddit.svg"
                alt="profile"
                className={`h-8 w-8 rounded-full object-cover cursor-pointer bg-white ${user ? "": "hidden"}`}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex md:gap-x-[28%]">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="mt-16 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
