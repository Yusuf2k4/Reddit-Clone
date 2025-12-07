export default function SignUpStep2({handleUsernameAndPassword, username,password}) {
  return (
    <div className="text-center px-6">
      <h1 className="text-2xl text-white font-semibold">
        Create your username and password
      </h1>
      <p className="text-sm mt-2 text-gray-400">
        Reddit is anonymous, so your username is what you'll go by here. Choose
        wisely-because once you get a name, you cant't change it
      </p>

      <div className="mt-6">
        <input
          type="text"
          id="username"
          className="p-4 rounded-3xl w-full  bg-slate-700 text-white relative"
          onChange={(e) => handleUsernameAndPassword("userName", e.target.value)}
          placeholder="Username"
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 rounded-3xl w-full mt-8 bg-slate-700 text-white"
          onChange={(e) => handleUsernameAndPassword("password", e.target.value)}
          value={password}
        />
      </div>
    </div>
  );
}
