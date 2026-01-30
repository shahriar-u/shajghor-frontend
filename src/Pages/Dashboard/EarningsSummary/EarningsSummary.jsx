/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import { FaWallet, FaChartLine, FaCheckCircle, FaFileInvoiceDollar } from "react-icons/fa";

const EarningSummary = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: earningsData = {}, isLoading } = useQuery({
    queryKey: ["earning-summary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorator-earnings/${user?.email}`);
      return res.data;
    },
  });

  const { totalEarnings = 0, taskCount = 0, history = [] } = earningsData;

  if (isLoading) return <LoadingSec />;

  return (
    <div className="p-4 md:p-8 bg-[#111827] min-h-screen text-white">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Total Earnings</p>
            <h2 className="text-5xl font-black text-[#FBBF24]">৳ {totalEarnings}</h2>
          </div>
          <FaWallet className="absolute -right-4 -bottom-4 text-8xl text-white/5 group-hover:text-[#FBBF24]/10 transition-all duration-500 rotate-12" />
        </div>

        <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] p-8 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Completed Tasks</p>
            <h2 className="text-5xl font-black text-blue-400">{taskCount}</h2>
          </div>
          <FaChartLine className="absolute -right-4 -bottom-4 text-8xl text-white/5 group-hover:text-blue-400/10 transition-all duration-500 -rotate-12" />
        </div>
      </div>

      {/* History Table */}
      <div className="mb-6">
        <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
          <FaFileInvoiceDollar className="text-[#FBBF24]" />
          Payment <span className="text-[#FBBF24]">Breakdown</span>
        </h3>
      </div>

      <div className="overflow-x-auto bg-[#1f2937] rounded-3xl border border-gray-700 shadow-xl">
        <table className="table w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-[10px] tracking-[0.2em]">
            <tr>
              <th className="py-6 px-8">#</th>
              <th>Service Title</th>
              <th>Completion Date</th>
              <th>Amount Received</th>
              <th className="text-right px-8">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {history.map((item, index) => (
              <tr key={item._id} className="hover:bg-black/20 transition-colors group">
                <td className="py-6 px-8 text-gray-500 font-bold">{index + 1}</td>
                <td>
                  <div className="font-bold text-white uppercase text-sm tracking-tight group-hover:text-[#FBBF24] transition-colors">
                    {item.serviceTitle || item.serviceName}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1 italic">Client: {item.userName}</div>
                </td>
                <td className="text-gray-400 text-sm">{item.date}</td>
                <td className="text-[#FBBF24] font-black text-lg">৳ {item.price}</td>
                <td className="text-right px-8">
                  <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-xl text-[9px] font-black uppercase border border-green-500/20">
                    <FaCheckCircle /> Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-600 uppercase tracking-widest text-sm font-bold">No earnings record available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningSummary;

