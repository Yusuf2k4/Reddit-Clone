import { useContext, useImperativeHandle, useRef, useState } from "react";
import {
  UserRound,
  Pencil,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";
import { logout } from "../../util/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

export default function ProfileModal({ ref }) {
  const dialogRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, saveUser } = useContext(UserContext);

  const navigate = useNavigate();

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        dialogRef.current?.showModal();
        setIsModalOpen(true);
      },
      close: () => {
        dialogRef.current?.close();
        setIsModalOpen(false);
      },
    }),
    [],
  );

  

  const closeModal = () => {
    dialogRef.current?.close();
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    saveUser(null);
    closeModal();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setIsModalOpen(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          closeModal();
        }
      }}
      className="fixed right-4 top-16 left-auto m-0
                w-72 rounded-xl border border-[#343536]
                bg-[#1c1c1c] p-2 text-white shadow-2xl
                backdrop:bg-black/30"
    >
      {/* User profile */}
      <button
        onClick={() => {
          closeModal();
          navigate("/profile?tab=posts")
        }}
        className="flex w-full items-center gap-3 rounded-lg
          p-3 text-left hover:bg-[#2a2a2b]"
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center
          justify-center rounded-full bg-[#343536]"
        >
          <UserRound size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">View profile</p>
          <p className="mt-0.5 truncate text-xs text-gray-400">
            u/{user?.userName}
          </p>
        </div>

        <ChevronRight size={16} className="text-gray-400" />
      </button>

      {/* Edit avatar */}
      <button
        onClick={() => {
          closeModal();
          // Open edit avatar flow here
        }}
        className="flex w-full items-center gap-3 rounded-lg
          px-3 py-3 text-sm hover:bg-[#2a2a2b]"
      >
        <Pencil size={19} className="text-gray-300" />
        <span>Edit avatar</span>
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-lg
          px-3 py-3 text-sm text-red-400 hover:bg-[#2a2a2b]"
      >
        <LogOut size={19} />
        <span>Log out</span>
      </button>

      <div className="mx-2 my-2 border-t border-[#343536]" />

      {/* Settings */}
      <button
        onClick={() => {
          closeModal();
        }}
        className="flex w-full items-center gap-3 rounded-lg
          px-3 py-3 text-sm hover:bg-[#2a2a2b]"
      >
        <Settings size={19} className="text-gray-300" />
        <span>Settings</span>
      </button>
    </dialog>
  );
}
