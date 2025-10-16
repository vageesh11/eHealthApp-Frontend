import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-[rgb(13,152,186)] w-full">

      <div className="px-3 sm:px-6 md:px-8 py-3 sm:py-4 flex justify-between items-center">

        {/* Left: Sidebar toggle + Logo */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-white">
          <button
            onClick={toggleSidebar}
            className="p-2 sm:p-2.5 rounded-md hover:bg-[rgb(0,109,111)]"
          >
            <FaBars className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate">eHealthApp</h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-white">
          <div className="p-2 sm:p-2.5 rounded-full cursor-pointer hover:bg-[rgb(0,109,111)]">
            <FaBell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="p-2 sm:p-2.5 rounded-full cursor-pointer hover:bg-[rgb(0,109,111)]">
            <FaUserCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
