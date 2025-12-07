import Content from "./Content";

export default function SignUpStep1({ handleLogin , handleEmail, email}) {
  return (
    <div className="text-center px-6">
      <h1 className="text-white text-3xl font-bold">Sign up</h1>

      <p className=" text-sm text-gray-400 mt-1">
        By continuing, you agree to our{" "}
        <span className="text-blue-600">User Agreement</span> and acknowledge
        that you understand the{" "}
        <span className="text-blue-600">privacy policy</span>
      </p>

      <Content />

      <div>
        <input
          type="email"
          className="p-4 rounded-2xl w-full mt-4 bg-slate-700 text-white"
          placeholder="Email or Username"
          required
          value={email}
          onChange={(e) => handleEmail("email", e.target.value)}
        />
      </div>
    </div>
  );
}
