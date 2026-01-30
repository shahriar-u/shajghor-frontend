/** @format */

import { useState } from "react"; 
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import useAuth from "../../../hooks/useAuth";
import {
  FaTrashAlt,
  FaCreditCard,
  FaCheckCircle,
  FaRunning,
  FaHourglassStart,
  FaCheckDouble,
  FaSortAmountDown,
} from "react-icons/fa";

const MyBookings = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // প্রতি পেজে ৪টি
  const [sortBy, setSortBy] = useState("date"); 


  const {
    data: { result: bookings = [], totalCount = 0 } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", user?.email, currentPage, sortBy],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}&sort=${sortBy}`
      );
      return res.data;
    },
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);


  const handlePayment = async (booking) => {
    try {
      const paymentInfo = {
        price: booking?.price,
        name: booking.serviceTitle || booking.serviceName,
        user_email: user?.email,
        serviceID: booking._id,
      };
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      if (res.data?.url) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire({ icon: "error", title: "Oops...", text: "পেমেন্ট গেটওয়ে লোড করতে সমস্যা হয়েছে!" });
    }
  };


  const handleCancel = (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "বুকিংটি বাতিল করা হবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "হ্যাঁ, বাতিল করুন!",
      background: "#111827",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({ title: "Cancelled!", text: "বাতিল হয়েছে।", icon: "success", background: "#111827", color: "#fff" });
          }
        });
      }
    });
  };

  if (isLoading) return <LoadingSec />;

  return (
    <div className="p-4 md:p-8 bg-[#111827] min-h-screen">
      {/* হেডার এবং সর্টিং ড্রপডাউন */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-black uppercase tracking-widest text-white border-l-4 border-[#FBBF24] pl-4">
          My <span className="text-[#FBBF24]">Bookings</span>
        </h2>

        <div className="flex items-center gap-3 bg-[#1f2937] p-2 rounded-xl border border-gray-700 shadow-lg">
          <FaSortAmountDown className="text-[#FBBF24] ml-2" />
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); 
            }}
            className="bg-transparent text-white text-xs font-bold uppercase outline-none cursor-pointer pr-4"
          >
            <option value="date" className="bg-[#1f2937]">Sort by Date</option>
            <option value="price" className="bg-[#1f2937]">Sort by Price</option>
            <option value="paymentStatus" className="bg-[#1f2937]">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* বুকিং লিস্ট */}
      <div className="grid gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#1f2937] p-6 rounded-2xl border border-gray-700 flex flex-wrap justify-between items-center gap-6 shadow-xl hover:shadow-[#FBBF24]/5 transition-all duration-300"
            >
              {/* কার্ড ডিজাইন */}
              <div className="flex-1 min-w-[250px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${booking.paymentStatus === "paid" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {booking.paymentStatus === "paid" ? "Confirmed & Paid" : "Waiting for Payment"}
                  </span>
                </div>
                <h3 className="text-[#FBBF24] font-black text-2xl uppercase tracking-tighter">
                  {booking.serviceTitle || booking.serviceName}
                </h3>

                <div className="mt-4 flex flex-wrap gap-6 items-center">
                  <div className="text-white">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Price</p>
                    <p className="font-black text-xl">৳ {booking.price}</p>
                  </div>
                  <div className="h-8 w-[1px] bg-gray-700 hidden md:block"></div>
                  <div className="text-white">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Date</p>
                    <p className="font-bold text-sm text-gray-300">{booking.date || "Not set"}</p>
                  </div>
                  <div className="h-8 w-[1px] bg-gray-700 hidden md:block"></div>
                  <div className="text-white">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Work Progress</p>
                    <div className={`flex items-center gap-2 mt-1 px-3 py-1 rounded-full text-[10px] font-black uppercase ${booking.decoratorStatus === "completed" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-400"}`}>
                      {booking.decoratorStatus || "Pending"}
                    </div>
                  </div>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex items-center gap-3">
                {booking.paymentStatus === "paid" ? (
                  <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-500 border border-green-500/20 font-black text-xs uppercase rounded-xl">
                    <FaCheckCircle /> Paid
                  </div>
                ) : (
                  <button onClick={() => handlePayment(booking)} className="flex items-center gap-2 px-6 py-3 bg-[#FBBF24] text-black font-black text-xs uppercase rounded-xl hover:bg-white transition-all transform active:scale-95">
                    <FaCreditCard /> Pay Now
                  </button>
                )}
                <button onClick={() => handleCancel(booking._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl text-gray-600 uppercase tracking-widest">
            No bookings found
          </div>
        )}
      </div>

      {/* ৫. প্যাগিনেশন  */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-[#1f2937] text-white rounded-lg disabled:opacity-20 hover:bg-[#FBBF24] hover:text-black transition-all font-bold"
          >
            PREV
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setCurrentPage(num + 1)}
              className={`w-10 h-10 rounded-lg font-bold transition-all ${
                currentPage === num + 1 ? "bg-[#FBBF24] text-black" : "bg-[#1f2937] text-white hover:bg-gray-700"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-[#1f2937] text-white rounded-lg disabled:opacity-20 hover:bg-[#FBBF24] hover:text-black transition-all font-bold"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;