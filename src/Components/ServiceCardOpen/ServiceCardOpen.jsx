import React from "react";
import { Link } from "react-router-dom";

const ServiceCardOpen = ({ data }) => {
  return (
    <div className="container mx-auto px-6 mt-16">
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#E11D48] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  {service.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black mb-2 text-gray-800 uppercase tracking-tight line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[#E11D48] font-black text-2xl">
                    ৳ {service.price}
                  </p>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {service.mode}
                  </span>
                </div>
                <Link to={`/service/${service._id}`}>
                  <button className="btn w-full bg-[#111827] text-white hover:bg-[#FBBF24] hover:text-black border-none font-bold uppercase tracking-widest rounded-xl transition-all duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-[0.3em]"></div>
      )}
    </div>
  );
};

export default ServiceCardOpen;
