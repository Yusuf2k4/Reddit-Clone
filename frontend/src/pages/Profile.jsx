import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../util/api";

const Profile = () => {
  const { user, saveUser } = useContext(UserContext);
  async function handleLogout() {
    await logout();
    saveUser(null);
  }
  return (
    <div className="w-full text-white  max-w-4xl  flex items-center justify-center p-4 gap-4">
      <div>Profile</div>
      <button
        className={`px-4 py-2 bg-red-600 rounded-full hover:cursor-pointer ${
          user ? "" : "hidden"
        }`}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
