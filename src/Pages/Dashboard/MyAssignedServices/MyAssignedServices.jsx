/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import Swal from "sweetalert2";
import {
  FaTasks,
  FaInfoCircle,
  FaSyncAlt,
  FaCheckDouble,
  FaHourglassHalf,
} from "react-icons/fa";

const MyAssignedServices = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-services", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-assigned-services/${user?.email}`);
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, currentStatus) => {
    let nextStatus = "";

    if (!currentStatus || currentStatus === "pending") {
      nextStatus = "Planning Phase";
    } else if (currentStatus === "Planning Phase") {
      nextStatus = "Materials Prepared";
    } else if (currentStatus === "Materials Prepared") {
      nextStatus = "On the Way to Venue";
    } else if (currentStatus === "On the Way to Venue") {
      nextStatus = "Setup in Progress";
    } else if (currentStatus === "Setup in Progress") {
      nextStatus = "Completed";
    } else {
      return;
    }

    try {
      const res = await axiosSecure.patch(`/assigned-services/status/${id}`, {
        status: nextStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `Next Step: ${nextStatus}`,
          text: "Keep up the good work!",
          icon: "success",
          background: "#1f2937",
          color: "#FBBF24",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  if (isLoading) return <LoadingSec />;

  return (
    <div className="w-full p-4 md:p-8 bg-[#111827] min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter flex flex-wrap items-center gap-3">
            <FaTasks className="text-[#FBBF24] shrink-0" />
            Assigned <span className="text-[#FBBF24]">Tasks</span>
          </h2>
          <p className="text-gray-500 text-[10px] sm:text-xs mt-1 uppercase tracking-widest">
            Manage your work progress
          </p>
        </div>

        <div className="bg-[#1f2937] px-4 sm:px-6 py-2 rounded-full border border-gray-700 w-fit">
          <span className="text-gray-400 text-xs font-bold uppercase">
            Total Jobs:
          </span>{" "}
          <span className="text-[#FBBF24] font-black">
            {services.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#1f2937] rounded-3xl border border-gray-700 shadow-2xl">
        <table className="table w-full min-w-[900px] text-left">
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-[10px] tracking-[0.2em]">
            <tr>
              <th className="py-6 px-8">#</th>
              <th>Service Title</th>
              <th>Client Email</th>
              <th>Current Status</th>
              <th className="text-right px-8">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {services.map((service, index) => (
              <tr
                key={service._id}
                className="hover:bg-black/10 transition-colors"
              >
                <td className="py-6 px-8 text-gray-500 font-bold">
                  {index + 1}
                </td>

                <td className="font-bold uppercase text-xs sm:text-sm">
                  {service.serviceTitle || service.serviceName}
                </td>

                <td className="text-xs text-gray-400 break-all">
                  {service.userEmail}
                </td>

                <td>
                  <span
                    className={`px-4 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-2 w-fit ${
                      service.decoratorStatus === "completed"
                        ? "bg-green-500/10 text-green-500"
                        : service.decoratorStatus === "in-progress"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {service.decoratorStatus === "completed" && (
                      <FaCheckDouble />
                    )}
                    {service.decoratorStatus === "in-progress" && (
                      <FaSyncAlt className="animate-spin" />
                    )}
                    {(!service.decoratorStatus ||
                      service.decoratorStatus === "pending") && (
                      <FaHourglassHalf />
                    )}
                    {service.decoratorStatus || "pending"}
                  </span>
                </td>

                <td className="text-right px-8">
                  {service.decoratorStatus === "completed" ? (
                    <span className="text-green-500 font-black text-[10px] uppercase italic">
                      Work Done!
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          service._id,
                          service.decoratorStatus || "pending"
                        )
                      }
                      disabled={service.decoratorStatus === "Completed"}
                      className={`px-3 sm:px-4 py-2 rounded-xl font-black text-[9px] sm:text-[10px] uppercase transition-all active:scale-95 shadow-lg ${
                        service.decoratorStatus === "Completed"
                          ? "bg-green-600 text-white cursor-not-allowed opacity-80"
                          : "bg-[#FBBF24] hover:bg-[#E11D48] text-black hover:text-white"
                      }`}
                    >
                      {(!service.decoratorStatus ||
                        service.decoratorStatus === "pending") &&
                        "Start Planning"}
                      {service.decoratorStatus === "Planning Phase" &&
                        "Materials Ready?"}
                      {service.decoratorStatus === "Materials Prepared" &&
                        "Start Journey"}
                      {service.decoratorStatus === "On the Way to Venue" &&
                        "Start Setup"}
                      {service.decoratorStatus === "Setup in Progress" &&
                        "Finish Work"}
                      {service.decoratorStatus === "Completed" &&
                        "Task Finished ✅"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-16 sm:py-24 bg-[#1f2937] rounded-3xl border border-dashed border-gray-700 mt-6">
          <FaInfoCircle size={40} className="mx-auto text-gray-700 mb-4" />
          <h3 className="text-gray-500 font-black uppercase tracking-widest text-xs sm:text-sm">
            No assigned tasks
          </h3>
        </div>
      )}
    </div>
  );
};

export default MyAssignedServices;
