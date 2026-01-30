/** @format */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import { FaHistory, FaCheckCircle, FaReceipt } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSec />;

  return (
    <div className="p-4 md:p-8 bg-[#111827] min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h2 className="
          text-xl
          sm:text-2xl
          md:text-3xl
          font-black
          uppercase
          tracking-widest
          text-white
          flex
          flex-wrap
          items-center
          gap-3
        ">
          <FaHistory className="text-[#FBBF24] shrink-0" />
          <span>
            Payment <span className="text-[#FBBF24]">History</span>
          </span>
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm mt-2 uppercase tracking-tighter">
          View all your successful transactions and invoices
        </p>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-[#1f2937] rounded-3xl border border-gray-700 shadow-2xl">
        <table className="table w-full min-w-[800px] border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-800/50 text-gray-400 uppercase text-[10px] tracking-[0.2em]">
            <tr>
              <th className="py-6 px-8 text-left">#</th>
              <th className="text-left">Service Info</th>
              <th className="text-left">Transaction ID</th>
              <th className="text-left">Price</th>
              <th className="text-right px-8">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-700">
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-black/20 transition-colors"
              >
                <td className="py-6 px-8 text-gray-500 font-bold">
                  {index + 1}
                </td>

                <td>
                  <div className="font-bold text-white text-sm sm:text-md uppercase">
                    {payment.serviceTitle || payment.serviceName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {payment.date || "N/A"}
                  </div>
                </td>

                <td className="font-mono text-xs text-blue-400 break-all">
                  {payment._id.toUpperCase()}
                </td>

                <td className="text-[#FBBF24] font-black text-base sm:text-lg">
                  ৳ {payment.price}
                </td>

                <td className="text-right px-8">
                  <span className="
                    inline-flex
                    items-center
                    gap-2
                    bg-green-500/10
                    text-green-500
                    px-3 sm:px-4
                    py-2
                    rounded-full
                    text-[10px]
                    font-black
                    uppercase
                    border
                    border-green-500/20
                    shadow-lg
                    shadow-green-500/5
                  ">
                    <FaCheckCircle /> Success
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="p-12 sm:p-24 text-center">
            <FaReceipt className="text-5xl sm:text-6xl text-gray-800 mx-auto mb-4" />
            <p className="text-gray-600 uppercase tracking-widest text-xs sm:text-sm italic">
              এখনও পর্যন্ত কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
