import React from "react";
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex">
      <div
        className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h2
            className={`text-xl font-bold transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            MyApp
          </h2>
          <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-6">
          <ul>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaHome size={24} />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >Home</span>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaUserAlt size={24} />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >Profile</span>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaCog size={24} />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >Settings</span>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaSignOutAlt size={24} />
              <span
                className={`ml-4 transition-opacity duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 hidden"
                }`}>Logout</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
