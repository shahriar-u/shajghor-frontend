/** @format */

import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";
import { FaPlusCircle, FaImage, FaDollarSign, FaSpinner } from "react-icons/fa";
import { useState } from "react";

const EditService = () => {
  const service = useLoaderData();
  const [userRole] = useRole();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const { register, handleSubmit } = useForm();

  if (!service) {
    return (
      <div className="text-white text-center py-20 font-bold uppercase tracking-widest">
        Loading Service Data...
      </div>
    );
  }

  const onSubmit = async (data) => {
    setIsUpdating(true);
    const updatedInfo = {
      ...data,
      price: parseFloat(data.price),
      decoratorCommission: parseFloat(data.decoratorCommission),
      status: userRole === "admin" ? data.status : service.status,
    };

    try {
      const res = await axiosSecure.put(
        `/services/${service._id}`,
        updatedInfo
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Service details have been saved successfully.",
          icon: "success",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#E11D48",
        });
        navigate("/dashboard/services");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while updating.",
        icon: "error",
        background: "#1f2937",
        color: "#fff",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const inputStyle =
    "w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FBBF24] transition-all text-white placeholder-gray-600";
  const labelStyle =
    "block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
          Edit <span className="text-[#FBBF24]">Service</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
          Update the details of: {service?.title}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#1f2937] p-8 rounded-3xl border border-gray-700 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className={labelStyle}>Service Title</label>
            <input
              {...register("title", { required: true })}
              defaultValue={service?.title}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Price ($)</label>
            <div className="relative">
              <FaDollarSign
                className="absolute left-4 top-4 text-gray-600"
                size={12}
              />
              <input
                type="number"
                {...register("price", { required: true })}
                defaultValue={service?.price}
                className={`${inputStyle} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Decorator Commission ($)</label>
            <div className="relative">
              <FaDollarSign
                className="absolute left-4 top-4 text-gray-600"
                size={12}
              />
              <input
                type="number"
                {...register("decoratorCommission", { required: true })}
                defaultValue={service?.decoratorCommission}
                className={`${inputStyle} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Image URL</label>
            <div className="relative">
              <FaImage
                className="absolute left-4 top-4 text-gray-600"
                size={12}
              />
              <input
                {...register("image", { required: true })}
                defaultValue={service?.image}
                className={`${inputStyle} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Service Mode</label>
            <select
              {...register("mode", { required: true })}
              defaultValue={service?.mode}
              className={inputStyle}
            >
              <option value="On-site">On-site (At Home/Ceremony)</option>
              <option value="In-studio">In-studio (Consultation)</option>
              <option value="Hybrid">Hybrid (Both)</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>Event Category</label>
            <select
              {...register("category", { required: true })}
              defaultValue={service?.category}
              className={inputStyle}
            >
              <option value="Wedding">Wedding Ceremony</option>
              <option value="Home Decor">Home Interior</option>
              <option value="Birthday">Birthday Party</option>
              <option value="Corporate">Corporate Event</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className={labelStyle}>Service Description</label>
            <textarea
              {...register("description", { required: true })}
              defaultValue={service?.description}
              rows="4"
              className={inputStyle}
            ></textarea>
          </div>

          {userRole === "admin" && (
            <div className="col-span-1 md:col-span-2 p-6 bg-black/40 rounded-2xl border border-yellow-500/20 mt-2">
              <label className={`${labelStyle} text-[#FBBF24]`}>
                Admin Control: Update Status
              </label>
              <select
                {...register("status")}
                defaultValue={service?.status}
                className={inputStyle}
              >
                <option value="pending">Pending (Reviewing)</option>
                <option value="active">Active (Visible to users)</option>
                <option value="paused">Paused (Temporarily Hidden)</option>
              </select>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className={`mt-8 w-full font-black py-4 rounded-xl transition-all duration-500 uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg group ${
            isUpdating
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-[#E11D48] hover:bg-[#FBBF24] hover:text-black text-white"
          }`}
        >
          {isUpdating ? (
            <>
              <FaSpinner className="animate-spin" /> Updating...
            </>
          ) : (
            <>
              <FaPlusCircle className="group-hover:rotate-90 transition-transform" />
              Update Service & Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditService;
