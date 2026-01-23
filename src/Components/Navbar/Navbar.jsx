import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleSignOut = () => {
    logOut()
      .then(() => {
        
        localStorage.removeItem("access-token");
        
        navigate("/login"); 
      })
      .catch((err) => console.log(err));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-all duration-300 hover:text-[#FBBF24] ${
              isActive ? "text-[#FBBF24] font-bold" : "text-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `transition-all duration-300 hover:text-[#FBBF24] ${
              isActive ? "text-[#FBBF24] font-bold" : "text-white"
            }`
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition-all duration-300 hover:text-[#FBBF24] ${
              isActive ? "text-[#FBBF24] font-bold" : "text-white"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `transition-all duration-300 hover:text-[#FBBF24] ${
              isActive ? "text-[#FBBF24] font-bold" : "text-white"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#111827] text-white px-4 md:px-8 sticky top-0 z-50 shadow-lg border-b border-[#E11D48]">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden hover:text-[#FBBF24]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1f2937] rounded-box w-52 text-white border border-[#E11D48]"
          >
            {navOptions}
          </ul>
        </div>

        {/* Logo & Brand Name */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#FBBF24] bg-[#E11D48] transition-transform group-hover:scale-110">
            <span className="font-bold text-xl text-white">S</span>
          </div>
          <span className="text-2xl font-bold tracking-wider hidden sm:block transition-colors group-hover:text-[#FBBF24]">
            SHAJ
            <span className="text-[#E11D48] group-hover:text-[#FBBF24]">
              GHOR
            </span>
          </span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8 font-medium">
          {navOptions}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="hidden md:flex btn btn-sm btn-outline border-[#FBBF24] text-[#FBBF24] hover:bg-[#FBBF24] hover:text-black hover:border-[#FBBF24]"
            >
              Dashboard
            </Link>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-[#E11D48] hover:border-[#FBBF24] transition-colors"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/mJR7z88/user-placeholder.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#1f2937] rounded-box w-60 border border-[#E11D48] space-y-2"
              >
                <li className="px-4 py-2 border-b border-gray-700">
                  <p className="text-[#FBBF24] font-bold text-sm truncate">
                    {user?.displayName || "User Name"}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {user?.email}
                  </p>
                </li>
                <li className="md:hidden">
                  <Link to="/dashboard" className="hover:bg-gray-700">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="hover:bg-gray-700">
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-[#E11D48] font-bold hover:bg-[#E11D48] hover:text-white transition-all w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/login"
              className="btn border-none bg-[#E11D48] hover:bg-[#FBBF24] hover:text-black transition-all duration-300 text-white px-8"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn border-none bg-[#E11D48] hover:bg-[#FBBF24] hover:text-black transition-all duration-300 text-white px-8"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;