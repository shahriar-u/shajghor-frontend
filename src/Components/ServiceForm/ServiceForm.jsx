/** @format */
import { useForm } from "react-hook-form";
import { FaImage, FaDollarSign } from "react-icons/fa";

const ServiceForm = ({ initialData, onSubmit, userRole, buttonText }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || {},
  });

  const inputStyle =
    "w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FBBF24] transition-all text-white placeholder-gray-600";
  const labelStyle =
    "block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#1f2937] p-8 rounded-3xl border border-gray-700 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Title */}
        <div className="col-span-1 md:col-span-2">
          <label className={labelStyle}>Service Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Ex: Luxury Royal Wedding"
            className={inputStyle}
          />
        </div>

        {/* Price */}
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
              placeholder="299"
              className={`${inputStyle} pl-10`}
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className={labelStyle}>Image URL</label>
          <div className="relative">
            <FaImage
              className="absolute left-4 top-4 text-gray-600"
              size={12}
            />
            <input
              {...register("image", { required: true })}
              placeholder="URL link"
              className={`${inputStyle} pl-10`}
            />
          </div>
        </div>

        {/* Mode */}
        <div>
          <label className={labelStyle}>Service Mode</label>
          <select
            {...register("mode", { required: true })}
            className={inputStyle}
          >
            <option value="On-site">On-site</option>
            <option value="In-studio">In-studio</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className={labelStyle}>Event Category</label>
          <select
            {...register("category", { required: true })}
            className={inputStyle}
          >
            <option value="Wedding">Wedding</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Birthday">Birthday</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className={labelStyle}>Service Description</label>
          <textarea
            {...register("description", { required: true })}
            rows="4"
            className={inputStyle}
          ></textarea>
        </div>

        {/* Admin Only Status Field */}
        {userRole === "admin" && (
          <div className="col-span-1 md:col-span-2 p-4 bg-black/20 rounded-2xl border border-yellow-500/20">
            <label className={`${labelStyle} text-[#FBBF24]`}>
              Admin Control: Status
            </label>
            <select {...register("status")} className={inputStyle}>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-[#E11D48] hover:bg-[#FBBF24] hover:text-black text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default ServiceForm;
