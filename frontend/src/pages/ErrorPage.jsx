export default function ErrorPage() {
  return (
    <div className="w-full h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
