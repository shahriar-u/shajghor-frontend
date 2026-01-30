import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const { id } = useParams(); 
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      
      axiosSecure.patch(`/bookings/payment-success/${id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Payment Successful!",
              text: "আপনার বুকিংটি এখন কনফার্ম করা হয়েছে।",
              icon: "success",
              background: "#111827",
              color: "#fff",
              confirmButtonColor: "#FBBF24"
            });
            
            setTimeout(() => navigate("/dashboard/my-booking"), 3000);
          }
        })
        .catch(err => {
          console.error("Update failed:", err);
          navigate("/dashboard/my-booking");
        });
    }
  }, [id, axiosSecure, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
      <div className="w-16 h-16 border-4 border-[#FBBF24] border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-2xl font-bold uppercase tracking-widest">
        Verifying <span className="text-[#FBBF24]">Payment...</span>
      </h2>
      <p className="text-gray-400 mt-2">অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।</p>
    </div>
  );
};

export default PaymentSuccess;