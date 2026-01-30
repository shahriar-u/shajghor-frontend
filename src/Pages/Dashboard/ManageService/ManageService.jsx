/** @format */

import { useQuery } from "@tanstack/react-query";


import { FaCheck, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";

const ManageServices = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: services = [], isLoading, refetch } = useQuery({
        queryKey: ["all-services"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-services");
            return res.data;
        },
    });

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/services/status/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `Service ${newStatus}!`,
                        icon: "success",
                        background: "#1f2937",
                        color: "#fff"
                    });
                }
            })
    };

    if (isLoading) return <LoadingSec />;

    return (
        <div className="w-full">
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-8">
                Pending <span className="text-[#FBBF24]">Requests</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                    <div key={service._id} className="bg-[#1f2937] border border-gray-700 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:border-[#FBBF24]/50 transition-all">
                        <img src={service.image} className="w-24 h-24 object-cover rounded-xl border border-gray-600" alt="" />
                        
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg font-bold text-white">{service.title}</h3>
                            <p className="text-[#FBBF24] text-xs font-black uppercase tracking-widest mt-1">
                                By: {service.decoratorName}
                            </p>
                            <div className="flex gap-2 mt-3 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-black/40 rounded-full text-[10px] text-gray-400 border border-gray-700">{service.category}</span>
                                <span className="px-3 py-1 bg-black/40 rounded-full text-[10px] text-gray-400 border border-gray-700">{service.mode}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                             <div className="flex gap-2">
                                {service.status === 'pending' ? (
                                    <>
                                        <button onClick={() => handleStatusUpdate(service._id, 'approved')} className="p-3 bg-green-600/20 text-green-500 rounded-lg hover:bg-green-600 hover:text-white transition-all">
                                            <FaCheck size={14} />
                                        </button>
                                        <button onClick={() => handleStatusUpdate(service._id, 'denied')} className="p-3 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                            <FaTimes size={14} />
                                        </button>
                                    </>
                                ) : (
                                    <span className={`uppercase font-black text-[10px] px-4 py-2 rounded-lg ${service.status === 'approved' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                                        {service.status}
                                    </span>
                                )}
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageServices;