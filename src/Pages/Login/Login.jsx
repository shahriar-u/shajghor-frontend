/** @format */

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaKey, FaUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const { userLogin, googleLogin, logOut, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [serverError, setServerError] = useState(null);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();


  const checkUserStatus = async (email) => {
    const res = await axios.get(`http://localhost:5000/user/status/${email}`);
    if (res.data?.status === "disabled") {
      await logOut(); 
      navigate("/account-information");
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const result = await userLogin(data.email, data.password);
      

      const isActive = await checkUserStatus(result.user.email);
      
      if (isActive) {
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          timer: 1500,
          showConfirmButton: false,
          background: "#111827",
          color: "#fff",
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      setServerError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const isActive = await checkUserStatus(result.user.email);
        if (isActive) {
          navigate(from, { replace: true });
        }
      })
      .catch(err => setServerError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] px-4 py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[180px] font-black text-white leading-none -rotate-12 translate-y-40">SHAJGHOR</h1>
      </div>

      <div className="w-full max-w-md bg-[#1f2937] rounded-xl shadow-2xl p-8 md:p-10 border border-gray-700 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E11D48] rounded-full flex items-center justify-center border-2 border-[#FBBF24] mx-auto mb-4 shadow-lg">
            <span className="font-bold text-3xl text-white">S</span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Login <span className="text-[#FBBF24]">Now</span></h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-[#111827] flex items-center rounded-md border border-gray-600 focus-within:border-[#E11D48]">
            <span className="py-3 px-4 text-gray-500 border-r border-gray-600"><FaUser /></span>
            <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email Address" className="outline-none bg-transparent py-2 text-white px-4 w-full text-sm" />
          </div>
          
          <div className="bg-[#111827] flex items-center rounded-md border border-gray-600 focus-within:border-[#E11D48] relative">
            <span className="py-3 px-4 text-gray-500 border-r border-gray-600"><FaKey /></span>
            <input {...register("password", { required: "Password is required" })} type={showPassword ? "text" : "password"} placeholder="Password" className="outline-none bg-transparent py-2 text-white px-4 w-full text-sm" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-gray-500 text-[10px] font-bold">{showPassword ? "HIDE" : "SHOW"}</button>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="terms" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="w-4 h-4 accent-[#E11D48]" />
            <label htmlFor="terms" className="text-[11px] text-gray-400 cursor-pointer">I agree to the <span className="text-[#FBBF24]">terms and conditions</span></label>
          </div>

          {serverError && <p className="text-[11px] text-[#E11D48] font-bold italic">{serverError}</p>}

          <button type="submit" disabled={!isChecked || loading} className={`w-full py-4 rounded-lg font-black uppercase text-xs transition-all ${isChecked ? "bg-[#E11D48] text-white hover:bg-[#FBBF24] hover:text-black" : "bg-gray-700 text-gray-500"}`}>
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="relative flex py-8 items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500 font-bold text-[10px]">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-bold text-xs uppercase hover:bg-[#FBBF24]">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-4 h-4" />
          Google Login
        </button>
         <p className="text-center mt-8 text-gray-500 text-[11px] font-bold tracking-widest uppercase">
                  Don't Have An Account?
                  <Link
                    to="/signup"
                    className="text-[#FBBF24] hover:text-white transition-colors ml-1 underline decoration-2 underline-offset-4"
                  >
                    Sing Up
                  </Link>
                </p>
      </div>
    </div>
  );
};

export default Login;