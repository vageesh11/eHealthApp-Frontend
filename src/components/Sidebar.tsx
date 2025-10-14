import React, { useState } from "react";
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const expanded = isOpen || isHovered;


  return (
    <div
      className={`bg-[rgb(13,152,186)] text-white transition-all duration-300 ${expanded ? "w-64" : "w-20"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <nav className="mt-6">
        <ul>
          {/* Home */}
          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <FaHome size={24} />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Home
            </span>
          </li>

          {/* Profile → Opens Appointment page */}
          <li>
            <Link
              to="/appointment"   // <-- changed this to your Appointment route
              className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer"
            >
              <FaUserAlt size={24} />
              <span
                className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                  }`}
              >
                Profile
              </span>
            </Link>
          </li>

          {/* Settings */}
          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <FaCog size={24} />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Settings
            </span>
          </li>

          {/* Logout */}
          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <FaSignOutAlt size={24} />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
