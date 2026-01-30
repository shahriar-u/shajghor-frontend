/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import { FaInfoCircle } from "react-icons/fa";
import ServiceCard from "../../../Components/ServiceCard/ServiceCard";

const AllServices = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-services-admin", user?.email], 
    queryFn: async () => {
      
      const res = await axiosSecure.get(`/services?email=${user?.email}`); 
      return res.data;
    },
  });

  if (isLoading) return <LoadingSec />;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            All <span className="text-[#E11D48]">Services</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">
            Manage all professional packages in the system
          </p>
        </div>
        
        <div className="flex gap-4">
            <div className="bg-[#111827] px-6 py-2 rounded-full border border-gray-700">
              <span className="text-gray-400 text-xs font-bold uppercase">
                Total Services:{" "}
              </span>
              <span className="text-[#FBBF24] font-black">{services.length}</span>
            </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 gap-6">
        
        <ServiceCard data={services} refetch={refetch} />
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-20 bg-[#1f2937] rounded-3xl border border-dashed border-gray-700">
          <FaInfoCircle size={40} className="mx-auto text-gray-700 mb-4" />
          <h3 className="text-gray-500 font-black uppercase tracking-widest">
            No services found in database
          </h3>
        </div>
      )}
    </div>
  );
};

export default AllServices;