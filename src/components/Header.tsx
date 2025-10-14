import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";


interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {

  return (
    <header className="bg-[rgb(13,152,186)]">

      <div className="px-6 py-4 flex justify-between items-center">

        <div className="flex items-center space-x-4 text-white">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-[rgb(0,109,111)]"
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-xl font-bold">eHealthApp</h1>
        </div>


        <div className="flex items-center space-x-4 text-white text-xl">
          <div className="p-2 rounded-full cursor-pointer hover:bg-[rgb(0,109,111)]">
            <FaBell />
          </div>
          <div className="p-2 rounded-full cursor-pointer hover:bg-[rgb(0,109,111)]">
            <FaUserCircle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


