import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white border-t-2 border-[#E11D48] pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* 1. Brand & About Section */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#FBBF24] bg-[#E11D48]">
              <span className="font-bold text-xl text-white">S</span>
            </div>
            <span className="text-2xl font-bold tracking-wider text-white">
              SHAJ<span className="text-[#E11D48]">GHOR</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            আপনার স্বপ্নকে বাস্তবে রূপ দিতে আমরা বদ্ধপরিকর। আধুনিক ইন্টেরিয়র
            এবং ইভেন্ট ডেকোরেশনে আমরাই আপনার বিশ্বস্ত সঙ্গী।
          </p>
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FBBF24] hover:text-black transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FBBF24] hover:text-black transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FBBF24] hover:text-black transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FBBF24] hover:text-black transition-all duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* 2. Contact Details Section */}
        <div>
          <h3 className="text-[#FBBF24] font-bold text-lg mb-6 uppercase tracking-widest">
            Contact Info
          </h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#E11D48] mt-1" />
              <span>
                House 45, Road 12, Dhanmondi,
                <br /> Dhaka, Bangladesh
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#E11D48]" />
              <span>+880 1234 567 890</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#E11D48]" />
              <span>info@shajghor.com</span>
            </li>
          </ul>
        </div>

        {/* 3. Business Working Hours Section */}
        <div>
          <h3 className="text-[#FBBF24] font-bold text-lg mb-6 uppercase tracking-widest">
            Business Hours
          </h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <FaClock className="text-[#E11D48] mt-1" />
              <div>
                <p className="text-white font-medium">Saturday - Thursday</p>
                <p>10:00 AM - 08:00 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaClock className="text-gray-600 mt-1" />
              <div>
                <p className="text-gray-500 font-medium">Friday</p>
                <p className="text-red-500">Weekly Holiday</p>
              </div>
            </li>
          </ul>
        </div>

        {/* 4. Quick Links Section */}
        <div>
          <h3 className="text-[#FBBF24] font-bold text-lg mb-6 uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link
                to="/services"
                className="hover:text-[#E11D48] transition-colors"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#E11D48] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#E11D48] transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-[#E11D48] transition-colors"
              >
                Join as Professional
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-[#FBBF24] font-bold">SHAJGHOR</span>. All Rights
          Reserved.
        </p>
        <p className="mt-2 italic">Design & Developed by Your Team</p>
      </div>
    </footer>
  );
};

export default Footer;
