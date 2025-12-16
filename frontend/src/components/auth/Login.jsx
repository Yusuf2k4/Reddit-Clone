import { Eye } from "lucide-react";
import Content from "./Content";
import { useContext, useEffect, useState } from "react";
import { getUser, logUser } from "../../util/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

export default function Login({ handleLogin, dialogRef }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false)
  const {saveUser} = useContext(UserContext)
  const navigate = useNavigate()

  function handleFormData(feild, value) {
    setFormData((prev) => ({
      ...prev,
      [feild]: value,
    }));
  }
  console.log(formData);
  
  async function LogInUser(){
    const logData = await logUser(formData)
    const userData = await getUser();
    saveUser(userData)
    dialogRef.current.close(); // BUG HERE (this does not work)
    navigate("/")
  }
  
  return (
    // 1. CONTAINER: Use flex-col and h-full to make it stretch to the modal's height
    <div className="flex flex-col h-full w-full justify-between">
      {/* 2. TOP CONTENT: Use flex-1 to make this section take up all available space. 
             overflow-y-auto ensures the content scrolls if the form fields are too long. */}
      <div className="flex-1 text-center px-6 pt-4 overflow-y-auto">
        <h1 className="text-white text-3xl font-bold">Login</h1>

        <p className=" text-sm text-gray-400 mt-1 mb-6">
          {" "}
          {/* Added margin-bottom */}
          By continuing, you agree to our{" "}
          <span className="text-blue-600">User Agreement</span> and acknowledge
          that you understand the{" "}
          <span className="text-blue-600">privacy policy</span>
        </p>

        <Content />

        <form>
          <input
            type="text"
            className="p-4 rounded-2xl w-full mt-4 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Email or Username"
            value={formData.username}
            onChange={(e) => handleFormData("username", e.target.value)}
          />

          <div className="relative mt-6">
            <input
              type={showPassword ? "text": "password"}
              placeholder="Password"
              className="w-full p-4 rounded-2xl bg-slate-700 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.password}
              onChange={(e) => handleFormData("password", e.target.value)}
            />

            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white transition"
              onClick={() => setShowPassword(prev => !prev) }
            >
              <Eye size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* 3. BOTTOM BUTTON + TEXT: Removed absolute positioning. 
             shrink-0 ensures it stays put at the bottom and never gets squashed. */}
      <div className="w-full shrink-0 max-w-md mx-auto text-center p-6  border-gray-700">
        {" "}
        {/* Added background/border for separation */}
        <p className="text-center text-white mt-1">
          New to reddit?{" "}
          <button
            type="button"
            className="text-blue-400 hover:cursor-pointer hover:underline"
            onClick={handleLogin}
          >
            Sign up
          </button>
        </p>
        <div className="w-full flex items-center justify-center p-3">
          <button
            type="submit"
            className="p-2 bg-orange-400 w-full rounded-full text-xl hover:cursor-pointer hover:bg-orange-300 transition-all duration-500"
            onClick={LogInUser}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
