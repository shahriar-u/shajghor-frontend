/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSec from "../../Components/LoadingSec/LoadingSec";
import ServiceCardOpen from "../../Components/ServiceCardOpen/ServiceCardOpen";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  
  useEffect(() => {
    setIsLoading(true);
    
    axios
      .get(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => {
        setServices(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || service.category === filterType;

    
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    const matchesPrice = service.price >= min && service.price <= max;

    return matchesSearch && matchesType && matchesPrice;
  });

  if (isLoading) return <LoadingSec />;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#111827] py-16 text-center text-white">
        <h1 className="text-4xl font-black uppercase tracking-widest">
          Our <span className="text-[#FBBF24]">Services</span>
        </h1>
        <div className="w-20 h-1 bg-[#E11D48] mx-auto mt-4"></div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-6 -mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search service..."
            className="input input-bordered w-full focus:outline-[#E11D48]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="select select-bordered w-full focus:outline-[#E11D48]"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Wedding">Wedding Ceremony</option>
            <option value="Home Decor">Home Interior</option>
            <option value="Birthday">Birthday Party</option>
            <option value="Corporate">Corporate Event</option>
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min ৳"
              className="input input-bordered w-full"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max ৳"
              className="input input-bordered w-full"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button className="btn bg-[#E11D48] hover:bg-[#FBBF24] text-white hover:text-black border-none font-bold uppercase tracking-widest transition-all duration-300">
            Total Found: {filteredServices.length}
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 mt-16">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredServices.map((service) => (
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
          <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-[0.3em]">
            No Services Found Matching Your Criteria
          </div>
        )}
      </div>

      <ServiceCardOpen date={filteredServices}/>
    </div>
  );
};

export default Services;
