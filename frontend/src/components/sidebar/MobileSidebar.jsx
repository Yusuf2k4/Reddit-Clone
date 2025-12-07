// components/sidebar/MobileSidebar.jsx
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarContent from "./SidebarContent";


const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          isOpen ? "opacity-60 pointer-events-auto bg-black" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-[rgb(26,26,27)] text-white transition-transform md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-7" />
            
          </div>
          <button onClick={onClose} className="p-1 rounded-md">
            <X />
          </button>
        </div>

        {/* Render the shared SidebarContent here.
            The drawer provides the container height + overflow.
        */}
        <div className="p-3 overflow-y-auto h-[calc(100%-64px)]">
          {/* pass sidebarOpen={true} so content renders */}
          <SidebarContent sidebarOpen={true} />
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
