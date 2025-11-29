import React from "react";

const Spinner = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md mx-4 bg-[#0b0b0b] rounded-lg p-8 text-center shadow-lg">
        {/* simple spinner */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-white animate-spin" />
        </div>

        <h3 className="text-lg font-semibold mb-2">Creating community…</h3>
        <p className="text-sm text-gray-300">
          Hang tight — we're processing your request. This may take a few
          seconds.
        </p>
      </div>
    </div>
  );
};

export default Spinner;
