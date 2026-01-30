/** @format */

import { useQuery } from "@tanstack/react-query";
import {
  FaUserShield,
  FaPaintBrush,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSec from "../../../Components/LoadingSec/LoadingSec";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();


  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });


  const handleRoleChange = (user, newRole) => {
    if (user.role === newRole) return;

    axiosSecure
      .patch(`/users/role/${user._id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Role Updated!",
            text: `${user.displayName} এখন একজন ${newRole}`,
            background: "#1f2937",
            color: "#fff",
            confirmButtonColor: "#FBBF24",
          });
        }
      });
  };


  const handleStatusToggle = (user) => {
    const newStatus = user.status === "active" ? "disabled" : "active";

    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${newStatus} ${user.displayName}`,
      icon: "warning",
      showCancelButton: true,
      background: "#1f2937",
      color: "#fff",
      confirmButtonColor: "#E11D48",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/status/${user._id}`, { status: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: `User is now ${newStatus}`,
                icon: "success",
                background: "#1f2937",
                color: "#fff",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          });
      }
    });
  };
  if (isLoading) return <LoadingSec />;

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
          Manage <span className="text-[#FBBF24]">Users</span>
        </h2>
        <span className="bg-[#E11D48] px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">
          Total: {users.length} Users
        </span>
      </div>

      <div className="overflow-x-auto bg-[#1f2937] rounded-3xl border border-gray-700 shadow-2xl">
        <table className="table w-full text-left">
          <thead className="bg-[#111827] text-gray-500 uppercase text-[10px] tracking-[0.2em]">
            <tr>
              <th className="p-6">User Info</th>
              <th className="p-6">Current Role</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-center">Update Access</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-[#111827]/30 transition-all"
              >
                {/* User Info */}
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.image || "https://i.ibb.co/manual/user.png"}
                      className={`w-12 h-12 rounded-2xl object-cover border-2 ${
                        user.status === "active"
                          ? "border-green-500/50"
                          : "border-red-500/50"
                      }`}
                      alt=""
                    />
                    <div>
                      <p className="font-black text-gray-200 text-sm">
                        {user.displayName}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role Badge */}
                <td className="p-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
                      user.role === "admin"
                        ? "bg-red-500/10 text-red-500"
                        : user.role === "decorator"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                {/* Status Toggle */}
                <td className="p-6">
                  <button
                    onClick={() => handleStatusToggle(user)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${
                      user.status === "active"
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    }`}
                  >
                    {user.status === "active" ? (
                      <FaToggleOn size={18} />
                    ) : (
                      <FaToggleOff size={18} />
                    )}
                    <span className="text-[10px] font-black uppercase">
                      {user.status === "active" ? "Active" : "Disabled"}
                    </span>
                  </button>
                </td>

                {/* Role Selection & Actions */}
                <td className="p-6">
                  <div className="flex items-center justify-center gap-3">
                    <select
                      value={user.role || "user"}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="bg-[#111827] border border-gray-700 text-gray-300 text-[11px] font-bold rounded-lg px-3 py-2 outline-none focus:border-[#FBBF24] transition-all"
                    >
                      <option value="user">USER</option>
                      <option value="decorator">DECORATOR</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
