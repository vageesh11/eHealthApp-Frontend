import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">eHealthApp</h1>

        <div className="flex items-center space-x-6 text-white text-xl">
          <FaBell className="cursor-pointer hover:text-gray-400"/>
          <FaUserCircle className="cursor-pointer hover:text-gray-400"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
