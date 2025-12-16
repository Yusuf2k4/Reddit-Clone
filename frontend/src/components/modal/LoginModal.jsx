import { X } from "lucide-react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import Login from "../auth/Login";

import SignUp from "../auth/SignUp";

export default function LoginModal({ ref }) {
  const dialogRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
      console.log("IS OPEN")
      setIsModalOpen(true);
    },
    close: () => {
      dialogRef.current.close();
      console.log("IS CLOSED")

      setIsModalOpen(false);
    },
  }));

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  function handleLogin() {
    setIsLogin((prev) => !prev);
  }

  
  return (
    <dialog
      ref={dialogRef}
      className="p-0 mx-auto my-auto relative bg-gray-800 h-[65vh] w-[28vw] min-w-[400px] min-h-[200px] rounded-4xl backdrop:backdrop-blur-lg "
    >
      <div
        className={`absolute top-2 right-2 ${step > 1 ? "hidden": ""}`}
        onClick={() => ref.current.close()}
      >
        <X size={32} />
      </div>

      {/* Changed: justify-center -> justify-between and added h-full */}
      {/* Parent Component */}
      <div className="flex flex-col items-center h-full w-full">
        {/* Added h-full and flex flex-col to the wrapper below so it stretches */}
        <div className="mt-4 max-w-md w-full h-full flex flex-col items-center justify-center p-6">
          {isLogin && <Login handleLogin={handleLogin} dialogRef = {dialogRef}/>}
          {/* ... Login or Signup ... */}
          {!isLogin && (
            <SignUp handleLogin={handleLogin} dialogRef={dialogRef} setStep={setStep} step ={step}/>
          )}
        </div>
      </div>
     
    </dialog>
  );
}
