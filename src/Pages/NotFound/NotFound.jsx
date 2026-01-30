import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[#111827] flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="container mx-auto text-center">
        {/* Animated Background Text */}
        <div className="relative inline-block mb-12">
          <h1 className="text-[140px] md:text-[250px] font-black text-white/[0.03] leading-none select-none">
            404
          </h1>

          {/* Central Decoration Frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-72 md:w-72 md:h-96 border-4 border-[#FBBF24] relative flex flex-col items-center justify-center group bg-[#111827]/50 backdrop-blur-sm shadow-2xl transition-transform duration-700 hover:rotate-3">
              {/* Inner Decorative Border */}
              <div className="absolute inset-3 border border-[#E11D48]/30"></div>

              {/* Shajghor Circle Logo Style */}
              <div className="w-16 h-16 bg-[#E11D48] rounded-full flex items-center justify-center border-2 border-[#FBBF24] mb-6 shadow-lg shadow-red-900/50">
                <span className="font-bold text-2xl text-white">S</span>
              </div>

              <span className="text-[#FBBF24] font-bold text-xl md:text-2xl tracking-[0.2em] uppercase animate-pulse">
                Lost Space
              </span>

              <div className="absolute bottom-6 w-12 h-1 bg-[#E11D48]"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <h2 className="text-white text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">
            Service <span className="text-[#E11D48]">Not Found</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 tracking-wide max-w-lg mx-auto">
            The space or decoration layout you are looking for has been moved or
            doesn't exist in our catalog. Let's get you back to our main
            interior showroom.
          </p>

          <Link to="/">
            <button className="relative group overflow-hidden px-12 py-4 bg-[#E11D48] text-white font-black uppercase tracking-[0.3em] text-xs transition-all duration-300 hover:bg-[#FBBF24] hover:text-black shadow-xl">
              <span className="relative z-10">Back to Showroom</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
