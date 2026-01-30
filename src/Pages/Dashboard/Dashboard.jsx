/** @format */

import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSec from "../../Components/LoadingSec/LoadingSec";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaSignOutAlt,
  FaThLarge,
  FaPalette,
  FaPlusCircle,
  FaUsers,
  FaHistory,
  FaUserCog,
  FaListUl,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [userRole, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSec />;
  }

  const navItemStyles =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 mb-2 font-bold text-xs uppercase tracking-widest";
  const activeClass = "bg-[#E11D48] text-white shadow-lg shadow-[#e11d4844]";
  const inactiveClass = "text-gray-400 hover:bg-[#111827] hover:text-[#FBBF24]";

  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans">
      <div className="flex flex-col md:flex-row max-w-[1440px] mx-auto p-4 gap-6">
        {/* --- Sidebar --- */}
        <aside className="w-full md:w-72 bg-[#1f2937] rounded-2xl p-6 border border-gray-700 h-fit md:sticky md:top-6">
          <div className="text-center mb-8 border-b border-gray-700 pb-6">
            <div className="relative w-20 h-20 mx-auto mb-3">
              <img
                src={user?.photoURL || "https://i.ibb.co/manual/user.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-[#FBBF24] p-1"
              />
            </div>
            <h3 className="font-black text-sm uppercase truncate px-2">
              {user?.displayName}
            </h3>
            <p className="text-[10px] text-[#FBBF24] font-bold uppercase tracking-widest mt-1">
              {userRole || "User"} Mode
            </p>
          </div>

          <nav>
            <p className="text-[9px] text-gray-500 font-black mb-3 ml-2 uppercase tracking-[0.2em]">
              General
            </p>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FaUser size={14} /> My Profile
            </NavLink>

            <NavLink
              to="/dashboard/my-booking"
              className={({ isActive }) =>
                `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FaHeart size={14} /> My Booking
            </NavLink>
            <NavLink
              to="/dashboard/payment-history"
              className={({ isActive }) =>
                `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <FaHeart size={14} /> Payment History
            </NavLink>

            {/* --- DECORATOR মেনু --- */}
            {userRole === "decorator" && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-[9px] text-[#FBBF24] font-black mb-3 ml-2 uppercase tracking-[0.2em]">
                  Decorator Tools
                </p>

                <NavLink
                  to="/dashboard/my-assigned-services"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaPalette size={14} />
                  My Assigned S.
                </NavLink>
                <NavLink
                  to="/dashboard/today-schedule"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaPalette size={14} />
                  Today's Schedule
                </NavLink>
                <NavLink
                  to="/dashboard/earning-summary"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaPalette size={14} />
                  Earnings Summary
                </NavLink>
              </div>
            )}

            {/* --- ADMIN মেনু --- */}
            {userRole === "admin" && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-[9px] text-red-500 font-black mb-3 ml-2 uppercase tracking-[0.2em]">
                  Admin Control
                </p>

                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaUserCog size={14} /> Manage Decorators
                </NavLink>

                <NavLink
                  to="/dashboard/add-service"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaPlusCircle size={14} /> Add Service
                </NavLink>

                <NavLink
                  to="/dashboard/services"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaListUl size={14} /> All Service
                </NavLink>

                <NavLink
                  to="/dashboard/manage-bookings"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaCalendarCheck size={14} /> Manage Bookings
                </NavLink>

                <NavLink
                  to="/dashboard/revenue-monitoring"
                  className={({ isActive }) =>
                    `${navItemStyles} ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  <FaChartLine size={14} /> Revenue Monitoring
                </NavLink>
              </div>
            )}

            <button
              onClick={logOut}
              className={`${navItemStyles} text-[#E11D48] mt-8 w-full border border-red-900/30 group hover:bg-[#E11D48] hover:text-white`}
            >
              <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />{" "}
              Logout
            </button>
          </nav>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="flex-1 bg-[#1f2937] rounded-2xl p-6 md:p-10 border border-gray-700 min-h-[85vh]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
