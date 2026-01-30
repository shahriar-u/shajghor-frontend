/** @format */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import { FaMoneyBillWave, FaChartBar, FaCrown, FaArrowUp } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const AdminRevenue = () => {
  const [axiosSecure] = useAxiosSecure();

  const colors = ["#FBBF24", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6", "#EC4899"];

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSec />;

  const { totalRevenue = 0, totalBookings = 0, chartData = [] } = stats;

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#111827] min-h-screen text-white">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest flex flex-wrap items-center gap-3">
          <FaMoneyBillWave className="text-[#FBBF24]" />
          Revenue <span className="text-[#FBBF24]">Monitoring</span>
        </h2>
        <p className="text-gray-500 text-[9px] sm:text-[10px] mt-1 uppercase tracking-[0.3em] font-bold">
          Financial Analytics & Business Intelligence
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 md:mb-12">
        <div className="bg-[#1f2937] p-5 sm:p-6 md:p-8 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden">
          <p className="text-gray-500 text-[9px] sm:text-[10px] font-black uppercase mb-2 tracking-widest">
            Total Revenue
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FBBF24]">
              ৳{totalRevenue}
            </h3>
            <div className="bg-green-500/10 text-green-500 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <FaArrowUp /> 12.5%
            </div>
          </div>
          <div className="absolute -right-2 -bottom-2 opacity-5 text-6xl md:text-7xl rotate-12">
            <FaMoneyBillWave />
          </div>
        </div>

        <div className="bg-[#1f2937] p-5 sm:p-6 md:p-8 rounded-3xl border border-gray-700 shadow-2xl">
          <p className="text-gray-500 text-[9px] sm:text-[10px] font-black uppercase mb-2 tracking-widest">
            Successful Sales
          </p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-400">
            {totalBookings}
            <span className="block text-[10px] text-gray-600 font-bold uppercase mt-1">
              Orders
            </span>
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#1f2937] p-4 sm:p-6 md:p-8 rounded-3xl border border-gray-700 mb-10 md:mb-12 shadow-inner">
        <h4 className="text-xs sm:text-sm font-black uppercase mb-6 md:mb-10 flex items-center gap-3 tracking-widest text-gray-400">
          <FaChartBar className="text-[#FBBF24]" /> Service Demand Histogram
        </h4>

        <div className="h-[260px] sm:h-[320px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={9}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "15px",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={28}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1f2937] rounded-3xl border border-gray-700 overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-6 md:p-8 border-b border-gray-700">
          <h4 className="text-xs sm:text-sm font-black uppercase flex items-center gap-3 tracking-widest text-gray-400">
            <FaCrown className="text-[#FBBF24]" /> Service Popularity Ranking
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full min-w-[700px]">
            <thead className="bg-gray-800/50 text-gray-500 uppercase text-[9px] tracking-[0.3em]">
              <tr>
                <th className="py-4 px-4 sm:px-8">Rank</th>
                <th>Service Name</th>
                <th className="text-center">Total Booked</th>
                <th className="text-right px-4 sm:px-8">Market Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {chartData.map((item, index) => {
                const percentage =
                  totalBookings > 0
                    ? ((item.count / totalBookings) * 100).toFixed(1)
                    : 0;
                return (
                  <tr key={index} className="hover:bg-black/20 transition">
                    <td className="py-4 px-4 sm:px-8">
                      {index === 0 ? (
                        <FaCrown className="text-[#FBBF24] text-lg" />
                      ) : (
                        <span className="font-black text-gray-600">
                          #{index + 1}
                        </span>
                      )}
                    </td>
                    <td className="font-bold text-white uppercase text-[11px] tracking-wider">
                      {item.name}
                    </td>
                    <td className="text-center">
                      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black">
                        {item.count}
                      </span>
                    </td>
                    <td className="text-right px-4 sm:px-8">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-black text-[#FBBF24]">
                          {percentage}%
                        </span>
                        <div className="w-20 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#FBBF24] h-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;
