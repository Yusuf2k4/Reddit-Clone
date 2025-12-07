import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const {user, saveUser} = useContext(UserContext)
  async function handleLogout(){
    const response = await fetch("http://localhost:8080/logout",{
      method: "post",
      credentials: "include"
    })
    const text = await response.text();
    saveUser(null)
  }
  return (
    <div className="w-full text-white  max-w-4xl  flex items-center justify-center p-4 gap-4">
      <div>Profile</div>
      <button className={`px-4 py-2 bg-red-600 rounded-full hover:cursor-pointer ${user ? "":"hidden"}`} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
