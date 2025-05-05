import React from "react";
import {
  FaUser,
  FaBook,
  FaDollarSign,
  FaChartLine,
  FaGraduationCap,
  FaHandHoldingUsd,
  FaTicketAlt,
  FaCogs,
  FaDatabase,
  FaWrench,
  FaRegBuilding,
  FaBriefcaseMedical,
  FaReceipt,
  FaDashcube,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/navbar/sidebarSlice";
import { logout, selectRole } from "../../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCollapsed } = useSelector((state) => state.sidebar);
  const role = useSelector(selectRole);

  const sidebarItems = [
    { to: "/dashboard", icon: <FaDashcube />, label: "Dashboard" },
    { to: "/profile", icon: <FaUser />, label: "Profile" },
    { to: "/database", icon: <FaDatabase />, label: "Database" },
    { to: "/resources", icon: <FaBriefcaseMedical />, label: "Resources" },
    { to: "/settings", icon: <FaCogs />, label: "Settings" }

  ];

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <aside
      className={`h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-blue-950 fixed overflow-y-hidden sm:overflow-y-auto transition-all duration-300`}
    >
      <nav className="flex flex-col justify-between h-full">
        <div>
          <div
            className={`p-5 flex items-center justify-between py-10 ${
              isCollapsed && "justify-center"
            }`}
          >
            <div
              className="flex items-center cursor-pointer mx-auto"
              onClick={handleToggleSidebar}
            >
              <img
                src="/logo1.jpeg"
                alt="Logo"
                className="h-50 w-50 object-contain"
              />
              
            </div>
          </div>
          <ul className="flex flex-col space-y-2 px-2">
            {sidebarItems.map(({ to, icon, label }) => (
              <NavLink
                to={to}
                key={to}
                className={({ isActive }) => `flex w-full`}
              >
                {({ isActive }) => (
                  <li
                    className={`px-4 py-3 flex items-center rounded-3xl w-full transition-all duration-200 
                      ${isActive 
                        ? "bg-blue-900 text-white" 
                        : "text-white hover:bg-blue-800/50"
                      }
                      ${!isCollapsed ? "justify-start" : "justify-center"}
                    `}
                  >
                    <div className={`flex items-center ${!isCollapsed ? "w-6 mr-3" : "w-6"}`}>
                      {icon}
                    </div>
                    {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;