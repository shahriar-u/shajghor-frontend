/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import {
  FaCalendarDay,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";

const TodaysSchedule = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const todayDate = new Date().toLocaleDateString("en-GB");

  const { data: todayTasks = [], isLoading } = useQuery({
    queryKey: ["today-schedule", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/today-schedule/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSec />;

  return (
    <div className="p-4 md:p-8 bg-[#111827] min-h-screen text-white">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1f2937] p-4 sm:p-6 rounded-3xl border border-gray-700 shadow-xl gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter flex flex-wrap items-center gap-3">
            <FaCalendarDay className="text-[#FBBF24] shrink-0" />
            Today's <span className="text-[#FBBF24]">Schedule</span>
          </h2>
          <p className="text-gray-500 text-[10px] sm:text-xs mt-1 uppercase tracking-widest font-bold">
            Date: {todayDate}
          </p>
        </div>

        <div>
          <span className="bg-[#FBBF24]/10 text-[#FBBF24] px-4 sm:px-6 py-2 rounded-full border border-[#FBBF24]/20 text-[10px] sm:text-xs font-black uppercase tracking-widest">
            {todayTasks.length} Tasks Remaining
          </span>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <div
              key={task._id}
              className="bg-[#1f2937] border-l-8 border-[#FBBF24] p-4 sm:p-6 rounded-2xl shadow-2xl hover:translate-x-0 sm:hover:translate-x-2 transition-transform duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tight">
                  {task.serviceTitle}
                </h3>
                <span className="text-[9px] bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg font-bold uppercase">
                  {task.decoratorStatus || "Pending"}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-400 text-xs sm:text-sm">
                  <FaMapMarkerAlt className="text-[#FBBF24] mt-0.5 shrink-0" />
                  <span className="break-words">
                    {task.address || "Location not provided"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm">
                  <FaPhoneAlt className="text-[#FBBF24] shrink-0" />
                  <span className="break-all">
                    {task.userPhone || task.userEmail}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm">
                  <FaClock className="text-[#FBBF24] shrink-0" />
                  <span>Morning Shift (9:00 AM)</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest">
                  Client:{" "}
                  <span className="text-white">
                    {task.userName || "Customer"}
                  </span>
                </div>
                <button className="bg-white/5 hover:bg-[#FBBF24] hover:text-black text-white px-4 py-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase transition-all border border-gray-600">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 sm:py-20 text-center bg-[#1f2937] rounded-3xl border border-dashed border-gray-700">
            <p className="text-gray-600 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-xs sm:text-sm">
              No work assigned for today
            </p>
            <p className="text-gray-700 text-[10px] sm:text-xs mt-2 uppercase italic font-bold tracking-widest">
              Enjoy your day off or check upcoming tasks!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysSchedule;
