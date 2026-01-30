/** @format */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: profile = {}, isLoading, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user?.email}`);
      return res.data;
    },
  });

  const handleUpdateProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: '<span class="text-[#FBBF24]">Update Profile</span>',
      background: "#1f2937",
      color: "#fff",
      html:
        `<input id="swal-input1" class="swal2-input bg-gray-800 border-gray-600 text-white" placeholder="Full Name" value="${profile.name || ''}">` +
        `<input id="swal-input2" class="swal2-input bg-gray-800 border-gray-600 text-white" placeholder="Phone Number" value="${profile.phone || ''}">` +
        `<input id="swal-input3" class="swal2-input bg-gray-800 border-gray-600 text-white" placeholder="Address" value="${profile.address || ''}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#FBBF24",
      confirmButtonText: "Update Now",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-input1").value,
          phone: document.getElementById("swal-input2").value,
          address: document.getElementById("swal-input3").value,
        };
      },
    });

    if (formValues) {
      try {
        const res = await axiosSecure.patch(`/users/update-profile/${user?.email}`, formValues);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Your profile has been updated successfully.",
            icon: "success",
            background: "#1f2937",
            color: "#fff",
          });
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to update profile", "error");
      }
    }
  };

  if (isLoading) return <LoadingSec />;

  return (
    <div className="p-4 md:p-8 bg-[#111827] min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-[#1f2937] rounded-3xl border border-gray-700 overflow-hidden shadow-2xl">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-[#FBBF24] to-[#d9a320]"></div>
        
        <div className="px-8 pb-10">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="p-2 bg-[#1f2937] rounded-full">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-32 h-32 rounded-full object-cover border-4 border-[#1f2937]" />
              ) : (
                <FaUserCircle className="w-32 h-32 text-gray-600 border-4 border-[#1f2937] rounded-full bg-[#1f2937]" />
              )}
            </div>
            <button 
              onClick={handleUpdateProfile}
              className="mb-2 flex items-center gap-2 bg-[#FBBF24] text-black px-6 py-2 rounded-xl font-black uppercase text-xs hover:bg-white transition-all shadow-lg"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{profile.name || "User Name"}</h2>
              <span className="text-[#FBBF24] text-[10px] font-black uppercase tracking-widest bg-[#FBBF24]/10 px-3 py-1 rounded-full">
                {profile.role || "Member"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 rounded-2xl text-[#FBBF24]"><FaEnvelope /></div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Email Address</p>
                  <p className="text-white text-sm">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800 rounded-2xl text-[#FBBF24]"><FaPhoneAlt /></div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Phone Number</p>
                  <p className="text-white text-sm">{profile.phone || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 col-span-full">
                <div className="p-3 bg-gray-800 rounded-2xl text-[#FBBF24]"><FaMapMarkerAlt /></div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Address</p>
                  <p className="text-white text-sm">{profile.address || "No address added yet"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;