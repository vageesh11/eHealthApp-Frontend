import React, { useState } from "react";
import { FaUserAlt, FaCog, FaQuestionCircle, FaInbox, FaUserMd, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const expanded = isOpen || isHovered;


  return (
    <div
      className={`bg-[rgb(13,152,186)] text-white transition-all duration-300 flex flex-col justify-between ${expanded ? "w-64" : "w-20"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <nav className="mt-6">
        <ul>
          {/* Home */}
          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <img
              src="/images/fi_grid.png"
              alt="Dashboard Icon"
              className="w-6 h-6" />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Dashboard
            </span>
          </li>

          {/* Profile → Opens Appointment page */}
          <li>
            <Link
              to="/appointment"
              className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer"
            >
              <FaCalendarAlt size={24} />
              <span
                className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                  }`}
              >
                Appointments
              </span>
            </Link>
          </li>

          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <FaUserAlt size={24} />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Patients
            </span>
          </li>

          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <FaUserMd size={24} />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Doctors
            </span>
          </li>

          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <FaInbox size={24} />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Inbox
            </span>
          </li>
        </ul>
      </nav>


      <nav className="mb-6">
        <ul>
          <li className="flex items-center p-4 hover:bg-[rgb(0,109,111)] cursor-pointer">
            <FaQuestionCircle size={24} />
            <span
              className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"
                }`}
            >
              Help
            </span>
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


        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
