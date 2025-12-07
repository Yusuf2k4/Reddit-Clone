export default function Content() {
  return (
    <>
      <div className="bg-white flex items-center justify-between mt-8 p-3 rounded-full">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="h-5 w-5"
        />
        <p className="mr-[27%] font-semibold">Continue with google</p>
      </div>
      <div className="bg-white flex items-center justify-between mt-8 p-3 rounded-full">
        <img
          src="https://www.svgrepo.com/show/475633/apple-color.svg"
          alt="Google logo"
          className="h-6 w-6"
        />
        <p className="mr-[27%] font-semibold">Continue with apple</p>
      </div>
      <div className="flex items-center gap-1 mt-8">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="text-gray-500 ">OR</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
    </>
  );
}
