import { useContext, useEffect, useState } from "react";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";

import SignUpStep4 from "./SIgnUpStep4";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import { getUser, logUser } from "../../util/api";

export default function SignUp({ handleLogin, dialogRef, setStep, step }) {
  const { saveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "",
    tags: [],
  });

  function decrementStep() {
    setStep((prev) => Math.max(prev - 1, 1));
  }
  function incrementStep() {
    setStep((prev) => Math.min(prev + 1, 4));
  }
  function handleFormData(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  function handleTag(tag) {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  async function registerUser(formData) {
    const response = await fetch("http://localhost:8080/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      return { error: "FAILED FOR SOME REASON" };
    }
    await response.text();
    const data = {username: formData.userName, password: formData.password} 
    const logData = await logUser(data);
    const user = await getUser();
    saveUser(user);
    dialogRef.current.close();
    navigate("/");
    
  }

  return (
    <form
      className="flex flex-col h-full w-full justify-between"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={`absolute top-2 left-3 `} onClick={decrementStep}>
        <ArrowLeft size={32} />
      </div>
      <div className="flex-1 w-full overflow-hidden flex flex-col">
        {step === 1 && (
          <SignUpStep1
            handleLogin={handleLogin}
            handleEmail={handleFormData}
            email={formData.email}
          />
        )}
        {step === 2 && (
          <SignUpStep2
            handleUsernameAndPassword={handleFormData}
            username={formData.userName}
            password={formData.password}
          />
        )}
        {step === 3 && (
          <SignUpStep3
            increaseStep={incrementStep}
            handleGender={handleFormData}
          />
        )}
        {step === 4 && (
          <SignUpStep4 handleTag={handleTag} selectedTag={formData.tags} />
        )}
      </div>

      <div
        className={`w-full shrink-0 text-center p-6 
        ${step === 3 ? "hidden" : "block"} `}
      >
        {step === 1 && (
          <p className="text-center text-white mt-1">
            Already a user?{" "}
            <button
              type="button"
              className="text-blue-400 hover:cursor-pointer hover:underline"
              onClick={handleLogin}
            >
              Log in
            </button>
          </p>
        )}

        <div className="w-full flex items-start justify-center p-3">
          <button
            className="p-2 bg-orange-400 w-full max-w-md rounded-full text-xl hover:cursor-pointer hover:bg-orange-300 transition-all duration-500"
            type={step === 4 ? "submit" : "button"}
            onClick={step === 4 ? () => registerUser(formData) : incrementStep}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}
