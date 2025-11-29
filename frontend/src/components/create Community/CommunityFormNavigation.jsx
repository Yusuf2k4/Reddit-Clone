import React from "react";

function CommunityFormNavigation({ step, setStep, handleSubmit, isSubmitting}) {
  return (
    <div className="w-full bg-[#1a1a1b] border-t border-gray-800 p-4 shrink-0 flex justify-end gap-3 md:gap-4">
      <button
        className="px-6 py-2 rounded-full border border-gray-600 text-gray-300 font-medium text-sm
        hover:bg-gray-800 hover:border-gray-500 transition-all duration-200"
        type="button"
        onClick={() => setStep(Math.max(0, step - 1))}
      >
        {step === 1 ? "Cancel" : "Back"}
      </button>

      {step <= 2 && (
        <button
          className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium text-sm
          hover:bg-indigo-500 active:scale-95 transition-all duration-200 shadow-md shadow-indigo-900/20"
          type="button"
          onClick={() => setStep(Math.min(3, step + 1))}
          disabled={isSubmitting}
        >
          Next
        </button>
      )}

      {step === 3 && (
        <button
          className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium text-sm
          hover:bg-indigo-500 active:scale-95 transition-all duration-200 shadow-md shadow-indigo-900/20"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Create Community
        </button>
      )}
    </div>
  );
}

export default CommunityFormNavigation;