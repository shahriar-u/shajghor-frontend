/** @format */

import React from "react";

const LoadingSec = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111827] relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute w-64 h-64 bg-[#E11D48] rounded-full blur-[120px] opacity-20 animate-pulse"></div>

      <div className="relative flex flex-col items-center">
        {/* Main Spinner */}
        <div className="relative w-24 h-24">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-[#FBBF24]/20 rounded-full"></div>
          {/* Animated Ring */}
          <div className="absolute inset-0 border-4 border-t-[#E11D48] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          
          {/* Center Logo/Initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-[#FBBF24] animate-pulse">S</span>
          </div>
        </div>

        {/* Text Section */}
        <div className="mt-8 text-center">
          <h2 className="text-white font-black tracking-[0.4em] uppercase text-xs mb-2">
            Shajghor
          </h2>
          <div className="flex gap-1 justify-center">
            <span className="w-1.5 h-1.5 bg-[#FBBF24] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-[#FBBF24] rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSec;