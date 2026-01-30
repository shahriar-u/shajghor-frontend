/** @format */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheckCircle, FaExclamationTriangle, FaUserPlus } from "react-icons/fa";

const ManageBookings = () => {
  const [axiosSecure] = useAxiosSecure();


  const { data: allBookings = [], refetch: refetchBookings, isLoading: isBookingsLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-bookings");
      return res.data || [];
    },
  });


  const { data: decorators = [], isLoading: isDecoratorsLoading } = useQuery({
    queryKey: ["availableDecorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/available-decorators");
      return res.data || [];
    },
  });


  const handleAssignPopup = async (bookingId) => {
   
    if (!decorators || decorators.length === 0) {
      return Swal.fire({
        title: "No Staff Found",
        text: "Please add decorators first.",
        icon: "warning",
        background: "#1f2937",
        color: "#fff",
      });
    }


    const options = {};
    decorators.forEach((d) => {
      options[d.email] = d.name || d.email; 
    });


    const { value: selectedEmail } = await Swal.fire({
      title: '<span class="text-[#FBBF24]">Assign Decorator</span>',
      input: "select",
      inputOptions: options,
      inputPlaceholder: "Choose a staff member",
      showCancelButton: true,
      confirmButtonColor: "#FBBF24",
      cancelButtonColor: "#374151",
      background: "#1f2937",
      color: "#fff",
      confirmButtonText: "Assign Now",
      inputValidator: (value) => {
        return !value && "You must select a decorator!";
      },
    });


    if (selectedEmail) {
      const selectedDecorator = decorators.find((d) => d.email === selectedEmail);
      const finalName = selectedDecorator.name || selectedDecorator.email;

      try {
   
        const res = await axiosSecure.patch(`/admin/assign-decorator/${bookingId}`, {
          decoratorEmail: selectedEmail,
          decoratorName: finalName,
          decoratorStatus: 'pending',
          status: "assigned",
        });


        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `Successfully assigned to ${finalName}`,
            icon: "success",
            timer: 2000, 
            showConfirmButton: false,
            background: "#1f2937",
            color: "#fff",
          });
          

          refetchBookings();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Could not assign.",
          icon: "error",
          background: "#1f2937",
          color: "#fff",
        });
      }
    }
  };

  if (isBookingsLoading || isDecoratorsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111827]">
        <span className="loading loading-spinner loading-lg text-[#FBBF24]"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#111827] min-h-screen text-white">
      <div className="mb-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter">
          Manage <span className="text-[#FBBF24]">Bookings</span>
        </h2>
      </div>

      <div className="overflow-x-auto bg-[#1f2937] rounded-3xl border border-gray-700">
        <table className="table w-full">
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-[10px]">
            <tr>
              <th className="py-6 px-8">Service Info</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Work Status</th>
              <th className="text-right px-8">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {allBookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-black/20">
                <td className="py-6 px-8">
                  <div className="font-bold text-white text-lg">{booking.serviceTitle}</div>
                  <div className="text-xs text-gray-500">{booking.userEmail}</div>
                </td>
                <td className="text-[#FBBF24] font-bold">৳ {booking.price}</td>
                <td>
                   <span className={`flex items-center gap-2 text-[10px] font-black uppercase ${
                    booking.paymentStatus === "paid" ? "text-green-500" : "text-red-500"
                  }`}>
                    {booking.paymentStatus === "paid" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                    {booking.paymentStatus || "Unpaid"}
                  </span>
                </td>
                <td>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${
                    booking.status === "assigned" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {booking.status || "Pending"}
                  </span>
                </td>
                <td className="text-right px-8">
                  {booking.status === "assigned" ? (
                    <div className="border-r-4 border-[#FBBF24] pr-4">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Staff</p>
                      <p className="text-sm font-black">{booking.decoratorName}</p>
                    </div>
                  ) : (
                    <button
                      disabled={booking.paymentStatus !== "paid"}
                      onClick={() => handleAssignPopup(booking._id)}
                      className="inline-flex items-center gap-2 bg-[#FBBF24] hover:bg-white text-black text-[11px] font-black uppercase px-6 py-3 rounded-xl transition-all shadow-lg"
                    >
                      <FaUserPlus className="text-lg" />
                      Assign Staff
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;