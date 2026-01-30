/** @format */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";
import ServiceCardOpen from "../../Components/ServiceCardOpen/ServiceCardOpen";

const Home = () => {
  const [services, setServices] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("http://localhost:5000/services")
    fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching services:", err));

    fetch(`${import.meta.env.VITE_API_URL}/decorators`)
      .then((res) => res.json())
      .then((data) => {
        setDecorators(data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching decorators:", err));
  }, []);

  const reasons = [
    {
      id: 1,
      title: "High-Quality Materials",
      description:
        "All the materials SHAJGHOR uses are state-of-the-art with absolute quality.",
      icon: "👍",
    },
    {
      id: 2,
      title: "Own Factory Setup",
      description:
        "We own a world-class factory setup, ready to dispatch any interior design.",
      icon: "🏭",
    },
    {
      id: 3,
      title: "Luxury Experience Center",
      description:
        "We have the largest interior design experience centre in Dhaka.",
      icon: "💎",
    },
    {
      id: 4,
      title: "Timely Delivery",
      description:
        "We blend time in our interior design, we craft what you want on time.",
      icon: "⏰",
    },
    {
      id: 5,
      title: "100+ Employees",
      description:
        "SHAJGHOR is proud to have over 100 expert employees specializing in crafts.",
      icon: "👥",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Elizabeth P.",
      rating: 5,
      category: "Wedding Decoration",
      comment:
        "Shajghor assembled the stage decor for my wedding in less than 2 hours. Fantastic job!",
    },
    {
      id: 2,
      name: "Tiffany B.",
      rating: 5,
      category: "Home Interior",
      comment:
        "David did an awesome job assembling the smart lights for our nursery. Really appreciate this!",
    },
    {
      id: 3,
      name: "Amanda L.",
      rating: 4,
      category: "Office Setup",
      comment:
        "Joe was great with communication, fast, professional and did a fantastic job.",
    },
  ];

  const processes = [
    {
      id: "01",
      title: "Concept",
      description:
        "Every concept starts with a conversation. We take time to discuss your vision.",
    },
    {
      id: "02",
      title: "Design",
      description:
        "Once locked, we use cutting-edge tools to craft a stunning design plan.",
    },
    {
      id: "03",
      title: "Development",
      description:
        "We take the concepts and the design blueprint to get on the field to bring life.",
    },
  ];

  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <div className="relative h-[600px] md:h-[85vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/wFWdxg3V/c78c03d87fb4eaeb840dea4895ec4d67.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#E11D48] font-bold tracking-[4px] uppercase mb-4">
              Modern Decoration & Smart Solutions
            </p>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Transform Your Space Into <br />{" "}
              <span className="text-[#FBBF24]">Something Magical</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Shajghor brings your dream ceremonies and smart home interiors to
              life with professional expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button className="btn bg-[#E11D48] hover:bg-[#FBBF24] hover:text-black text-white border-none px-10 h-14 rounded-full text-lg font-bold">
                Read More
              </button>
              <Link to={'/services'}>
                <button className="btn bg-[#FBBF24] hover:bg-[#E11D48] hover:text-white text-black border-none px-10 h-14 rounded-full text-lg font-bold">
                Order Now
              </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- service */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 uppercase">
            Our Premium <span className="text-[#E11D48]">Services</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#FBBF24] mx-auto mt-4"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-bars loading-lg text-[#E11D48]"></span>
          </div>
        ) : (
          <ServiceCardOpen data={services} />
        )}
      </section>

      {/* ---decorator --- */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 uppercase">
              Expert <span className="text-[#E11D48]">Decorators</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium tracking-widest uppercase text-xs">
              The minds behind the magic
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {decorators.map((dev) => (
              <div
                key={dev._id}
                className="bg-white p-8 rounded-3xl text-center shadow-xl hover:-translate-y-2 transition-all duration-300 border-b-8 border-[#FBBF24]"
              >
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <img
                    src={dev.image || dev.photo}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    alt={dev.name}
                  />
                  <div className="absolute -bottom-2 right-0 bg-[#E11D48] text-white p-2 rounded-full text-xs">
                    <FaStar />
                  </div>
                </div>
                <h3 className="font-black text-lg text-gray-900 uppercase tracking-tight">
                  {dev.name}
                </h3>
                <p className="text-xs text-[#E11D48] font-bold mb-4 uppercase tracking-widest">
                  {dev.specialty || "Interior Expert"}
                </p>
                <div className="flex justify-center gap-1 text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={10} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight">
                WHY <br />
                <span className="text-[#FBBF24]">CHOOSE US</span>
              </h2>
              <p className="text-gray-500 mb-8 font-medium">
                Leading interior design company in Dhaka offering luxury,
                modern, and creative solutions for your space.
              </p>
              <button className="btn bg-black text-white hover:bg-[#E11D48] border-none rounded-none px-10 h-14 w-fit uppercase font-black tracking-widest">
                Explore More
              </button>
            </div>
            {reasons.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-10 rounded-3xl hover:bg-[#FBBF24]/10 transition-colors duration-300"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Map Section --- */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-white text-center mb-12 uppercase">
            Our <span className="text-[#FBBF24]">Coverage</span> Area
          </h2>
          <div className="h-[450px] rounded-3xl overflow-hidden border-8 border-gray-800 shadow-2xl">
            <MapContainer
              center={[23.8103, 90.4125]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[23.8103, 90.4125]}>
                <Popup>Shajghor HQ</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* --- Working Process --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">
              Our <span className="text-[#E11D48]">Process</span>
            </h2>
            <div className="w-24 h-2 bg-[#FBBF24] mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {processes.map((step) => (
              <div key={step.id} className="relative group">
                <span className="absolute -top-16 -left-8 text-[150px] font-black text-gray-50 group-hover:text-yellow-50 transition-colors z-0">
                  {step.id}
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-widest">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
