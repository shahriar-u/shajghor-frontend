/** @format */

import React, { useContext, useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSec from "../../Components/LoadingSec/LoadingSec";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  const userCurrentLocation = useLocation();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/service/${id}`);
        setService(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        
        if (err.response?.status === 404) {
          setService(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceData();
    }
    
  }, [id]);


  const handleBooking = async (e) => {
    e.preventDefault();

    const form = e.target;
    const date = form.date.value;
    const location = form.location.value;
    const phone = form.phone.value;

    const bookingData = {
      serviceId: service?._id,
      serviceTitle: service?.title,
      price: service?.price,
      image: service?.image,
      userName: user?.displayName,
      userEmail: user?.email,
      date,
      location,
      phone,
      paymentStatus: "pending",
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Booking Successful!",
          text: "অ্যাডমিন শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
          icon: "success",
          background: "#111827",
          color: "#fff",
          confirmButtonColor: "#FBBF24",
        });

       
        document.getElementById("booking-modal").checked = false;
        form.reset();
        navigate("/dashboard/my-booking");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "বুকিং করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
        "error"
      );
    }
  };

  const checkLogin = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "বুকিং করতে আগে লগইন করুন",
        icon: "warning",
        background: "#111827",
        color: "#fff",
        showCancelButton: true,
        confirmButtonColor: "#FBBF24",
        confirmButtonText: "Login Now",
        cancelButtonColor: "#374151",
      }).then((result) => {
        if (result.isConfirmed) {
          
          navigate("/login", { state: { from: userCurrentLocation } });
        }
      });
      return false;
    }
    return true;
  };
  if (loading) return <LoadingSec />;


  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-[#111827] text-white">
        <h2 className="text-2xl font-bold mb-4">Service Not Found!</h2>
        <button onClick={() => navigate(-1)} className="btn btn-warning">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ইমেজ সেকশন */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E11D48] to-[#FBBF24] rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img
            src={service.image}
            alt={service.title}
            className="relative rounded-[30px] shadow-2xl w-full h-[550px] object-cover border-8 border-white bg-gray-200"
          />
        </div>

        {/* কন্টেন্ট সেকশন */}
        <div>
          <span className="bg-[#E11D48]/10 text-[#E11D48] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
            {service.category}
          </span>
          <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter text-gray-900 leading-tight">
            {service.title}
          </h2>
          <div className="flex items-center gap-4 mb-8">
            <p className="text-[#E11D48] text-4xl font-black tracking-tighter">
              ৳ {service.price}
            </p>
            <div className="h-8 w-[2px] bg-gray-200"></div>
            <p className="text-gray-400 font-bold uppercase text-sm">
              Professional Service
            </p>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 bg-white p-6 rounded-2xl border-l-4 border-[#FBBF24] shadow-sm">
            {service.description}
          </p>

          <label
            onClick={checkLogin}
            htmlFor={user ? "booking-modal" : ""}
            className="btn bg-[#111827] hover:bg-[#E11D48] text-white border-none px-12 h-16 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-300 active:scale-95"
          >
            Confirm Booking
          </label>
        </div>
      </div>

      {/* Booking Modal */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[#111827] text-white border border-gray-700 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-2xl uppercase tracking-tighter">
              Service <span className="text-[#FBBF24]">Booking</span>
            </h3>
            <label
              htmlFor="booking-modal"
              className="btn btn-sm btn-circle bg-gray-800 border-none text-white"
            >
              ✕
            </label>
          </div>

          <form onSubmit={handleBooking} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full bg-[#1f2937] border-gray-700 text-sm focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-[#1f2937] border-gray-700 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                Contact Number
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="017XXXXXXXX"
                className="input input-bordered w-full bg-[#1f2937] border-gray-700 focus:border-[#FBBF24] transition-all"
              />
            </div>

            <div className="form-control space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="input input-bordered bg-[#1f2937] border-gray-700 focus:border-[#FBBF24]"
              />
            </div>

            <div className="form-control space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                Event Location
              </label>
              <textarea
                name="location"
                placeholder="Full address of the event venue..."
                required
                className="textarea textarea-bordered bg-[#1f2937] border-gray-700 focus:border-[#FBBF24] h-24"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn w-full bg-[#E11D48] border-none text-white hover:bg-[#FBBF24] hover:text-black font-black uppercase tracking-widest h-14 rounded-xl shadow-lg transition-all"
              >
                Place Booking Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
