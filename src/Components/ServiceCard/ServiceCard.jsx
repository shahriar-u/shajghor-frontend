/** @format */

import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ServiceCard = ({ data, refetch }) => {
  const [axiosSecure] = useAxiosSecure(); 

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E11D48",
      cancelButtonColor: "#3085d6",
      background: "#1f2937",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/services/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch(); 
              Swal.fire({
                title: "Deleted!",
                text: "Service has been removed.",
                icon: "success",
                background: "#1f2937",
                color: "#fff",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Could not delete the service.", "error");
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((service) => (
        <div
          key={service._id}
          className="bg-[#1f2937] rounded-3xl border border-gray-700 overflow-hidden hover:border-[#FBBF24]/50 transition-all group shadow-xl"
        >
          {/* Service Image & Status Badge */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={service.image}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={service.title}
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg
                  ${
                    service.status === "approved"
                      ? "bg-green-900/80 text-green-400 border-green-500/30"
                      : service.status === "pending"
                      ? "bg-yellow-900/80 text-yellow-400 border-yellow-500/30"
                      : "bg-red-900/80 text-red-400 border-red-500/30"
                  }`}
              >
                {service.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-white leading-tight flex-1 line-clamp-1 uppercase">
                {service.title}
              </h3>
              <span className="text-[#FBBF24] font-black text-lg ml-2">
                ${service.price}
              </span>
            </div>

            <div className="flex gap-2 mb-4">
              <span className="text-[9px] bg-[#111827] text-gray-400 px-2 py-1 rounded border border-gray-800 uppercase font-bold">
                {service.category}
              </span>
              <span className="text-[9px] bg-[#111827] text-gray-400 px-2 py-1 rounded border border-gray-800 uppercase font-bold">
                {service.mode}
              </span>
            </div>

            <p className="text-gray-500 text-xs line-clamp-2 mb-6 italic">
              {service.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
              <Link to={`/dashboard/edit-service/${service._id}`} className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 p-2 bg-blue-600/20 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs font-bold uppercase">
                  <FaEdit /> Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(service._id)}
                className="p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;