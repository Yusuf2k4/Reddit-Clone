export default function SignUpStep3({increaseStep, handleGender}) {
  function OnClick(type){
    increaseStep();
    handleGender("gender", type)
  }
  return (
    <div className="text-center px-6">
      <h1 className="text-2xl text-white font-semibold">About you</h1>
      <p className="text-sm text-gray-400 mt-2">
        Tell us about yourself to improve your experience on Reddit.
      </p>

      <div className="mt-18 flex flex-col">
        <p className="text-gray-400">how do you identify?</p>
        <button
          className="px-4 py-3 rounded-3xl w-full mt-2 bg-slate-700 text-white hover:cursor-pointer hover:bg-orange-500  transition-all duration-300 hover:text-black"
          type="button"
          onClick={() => OnClick("Female")}
          

        >
          Woman
        </button>
        <button
          className="px-4 py-3 rounded-3xl w-full mt-2 bg-slate-700 text-white hover:cursor-pointer hover:bg-orange-500  transition-all duration-300 hover:text-black"
          type="button"
          onClick={() => OnClick("Male")}

        >
          Man
        </button>
        <button
          className="px-4 py-3 rounded-3xl w-full mt-2 bg-slate-700 text-white hover:cursor-pointer hover:bg-orange-500  transition-all duration-300 hover:text-black"
          type="button"
          onClick={() => OnClick("None")}
        >
          Prefer Not to say
        </button>
      </div>
    </div>
  );
}
