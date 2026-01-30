/** @format */

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const Signup = () => {
  const {
    loading,
    setLoading,
    googleLogin,
    createUser,
    updateUserNamePhoto,
    logOut,
  } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [userImgName, setUserImgName] = useState("Choose profile picture...");
  const [isChecked, setIsChecked] = useState(false);
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    setLoading(true);

    try {
     
      const imageFile = event.target.image.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_API
        }`,
        formData
      );

      if (!res.data.success) throw new Error("Image upload failed");
      const userImgURL = res.data.data.display_url;

      
      const result = await createUser(data.email, data.password);
      const createdUser = result.user;


      await updateUserNamePhoto(data.name, userImgURL);

      
      const userInfo = {
        name: data.name, 
        email: data.email,
        image: userImgURL,
        role: "user", 
        status: "active", 
        createdAt: new Date(),
        totalEarnings: 0,
        currentBalance: 0,
      };

      const dbResponse = await axiosSecure.post("/create_user", userInfo);

      if (dbResponse.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account created successfully!",
          background: "#111827",
          color: "#fff",
          confirmButtonColor: "#E11D48",
        });
        navigate(from, { replace: true });
      } else {
        toast.error(dbResponse.data.message || "User save failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  const handleImgChange = (file) => {
    if (file) {
      setUserImgName(file.name);
    }
  };

  
  const checkUserStatus = async (email) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/status/${email}`);
    if (res.data?.status === "disabled") {
      await logOut(); 
      navigate("/account-information");
      return false;
    }
    return true;
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const isActive = await checkUserStatus(result.user.email);
        if (isActive) {
          navigate(from, { replace: true });
        }
      })
      .catch((err) => setServerError(err.message));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] px-4 py-24 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[150px] md:text-[200px] font-black text-white leading-none -rotate-12 translate-y-40">
          SHAJGHOR
        </h1>
      </div>

      <div className="w-full max-w-2xl bg-[#1f2937] rounded-2xl shadow-2xl p-6 md:p-12 border border-gray-700 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            CREATE <span className="text-[#FBBF24]">ACCOUNT</span>
          </h2>
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">
            Start your beauty journey with us
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#FBBF24] uppercase tracking-wider ml-1">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full px-5 py-3.5 bg-[#111827] border border-gray-600 rounded-xl text-white outline-none focus:border-[#E11D48] transition-all"
                placeholder="Ex: Jane Doe"
              />
              {errors.name && (
                <p className="text-[#E11D48] text-[10px] italic ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#FBBF24] uppercase tracking-wider ml-1">
                Email Address
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full px-5 py-3.5 bg-[#111827] border border-gray-600 rounded-xl text-white outline-none focus:border-[#E11D48] transition-all"
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="text-[#E11D48] text-[10px] italic ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password with Show/Hide */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#FBBF24] uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-5 py-3.5 bg-[#111827] border border-gray-600 rounded-xl text-white outline-none focus:border-[#E11D48] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FBBF24] text-[10px] font-black uppercase tracking-tighter hover:text-white transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#E11D48] text-[10px] italic ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Custom Image Upload */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#FBBF24] uppercase tracking-wider ml-1">
                Profile Photo
              </label>
              <label
                htmlFor="fileInput"
                className="flex items-center justify-between w-full px-5 py-3.5 bg-[#111827] border border-gray-600 rounded-xl cursor-pointer hover:border-[#FBBF24] transition-all group"
              >
                <span className="text-gray-400 text-sm truncate pr-2">
                  {userImgName}
                </span>
                <span className="bg-[#E11D48] group-hover:bg-[#FBBF24] group-hover:text-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all">
                  BROWSE
                </span>
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                {...register("image", { required: "Photo is required" })}
                onChange={(e) => handleImgChange(e.target.files[0])}
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-3 py-2 px-1">
            <input
              type="checkbox"
              id="terms"
              onChange={() => setIsChecked(!isChecked)}
              className="w-4 h-4 accent-[#E11D48] rounded cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-gray-400 text-[11px] uppercase font-bold cursor-pointer select-none"
            >
              I agree to the{" "}
              <span className="text-[#FBBF24] hover:underline">
                Terms and Conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isChecked || loading}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.3em] text-sm transition-all shadow-lg ${
              !isChecked || loading
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#E11D48] hover:bg-[#FBBF24] hover:text-black text-white active:scale-[0.98]"
            }`}
          >
            {loading ? <Loading /> : "Sign Up Now"}
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-bold text-xs uppercase hover:bg-[#FBBF24]"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="G"
              className="w-4 h-4"
            />
            Google Login
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-[11px] font-bold tracking-widest uppercase">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-[#FBBF24] hover:text-white transition-colors ml-1 underline decoration-2 underline-offset-4"
          >
            Log In
          </Link>
        </p>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Signup;
