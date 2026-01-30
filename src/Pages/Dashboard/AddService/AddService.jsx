/** @format */

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaPlusCircle, FaImage, FaDollarSign } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddService = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const serviceInfo = {
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
        mode: data.mode,
        price: parseFloat(data.price),
        decoratorCommission: parseFloat(data.decoratorCommission),
        addedBy: user?.email,
        status: "pending",
        totalBookings: 0,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/services", serviceInfo);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "Service added successfully!",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Access Denied!",
        text:
          error.response?.data?.message ||
          "You don't have permission to add services.",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  const inputStyle =
    "w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#FBBF24] transition-all text-white placeholder-gray-600";
  const labelStyle =
    "block text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8 sm:mb-10 text-center md:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
          Create New <span className="text-[#E11D48]">Service</span>
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          Add your professional decoration package for StyleDecor users.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1f2937] p-4 sm:p-6 md:p-8 rounded-3xl border border-gray-700 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <label className={labelStyle}>Service Title</label>
            <input
              {...register("title", { required: true })}
              placeholder="Ex: Luxury Royal Wedding Decoration"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Price ($)</label>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-4 text-gray-600" size={12} />
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="299"
                className={`${inputStyle} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Decorator Commission ($)</label>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-4 text-gray-600" size={12} />
              <input
                type="number"
                {...register("decoratorCommission", { required: true })}
                placeholder="Ex: 150"
                className={`${inputStyle} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Image URL</label>
            <div className="relative">
              <FaImage className="absolute left-4 top-4 text-gray-600" size={12} />
              <input
                {...register("image", { required: true })}
                placeholder="https://i.ibb.co/example.jpg"
                className={`${inputStyle} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Service Mode</label>
            <select {...register("mode", { required: true })} className={inputStyle}>
              <option value="On-site">On-site (At Home/Ceremony)</option>
              <option value="In-studio">In-studio (Consultation)</option>
              <option value="Hybrid">Hybrid (Both)</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>Event Category</label>
            <select
              {...register("category", { required: true })}
              className={inputStyle}
            >
              <option value="Wedding">Wedding Ceremony</option>
              <option value="Home Decor">Home Interior</option>
              <option value="Birthday">Birthday Party</option>
              <option value="Corporate">Corporate Event</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}>Service Description</label>
            <textarea
              {...register("description", { required: true })}
              rows="4"
              placeholder="Describe your package..."
              className={inputStyle}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 sm:mt-8 w-full bg-[#E11D48] hover:bg-[#FBBF24] hover:text-black text-white font-black py-3 sm:py-4 rounded-xl transition-all duration-500 uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg text-xs sm:text-sm"
        >
          <FaPlusCircle /> Submit Service for Approval
        </button>
      </form>
    </div>
  );
};

export default AddService;
