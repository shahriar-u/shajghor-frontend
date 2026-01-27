import React from 'react';
import { FaExclamationTriangle, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";

const AccountInformation = () => {
  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1f2937] p-10 rounded-3xl border border-red-500/30 text-center shadow-2xl relative">
        <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Account <span className="text-red-500">Disabled</span></h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          দুঃখিত! আপনার অ্যাকাউন্টটি ডিজেবল করা হয়েছে। বিস্তারিত জানতে আমাদের সাপোর্টে যোগাযোগ করুন।
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/" className="w-full bg-[#E11D48] text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-[#FBBF24] hover:text-black">Back to Home</Link>
          <button className="w-full bg-gray-800 text-gray-300 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"><FaHeadset /> Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;