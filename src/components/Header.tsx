
import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";


interface HeaderProps {
  sidebarExpanded: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarExpanded }) => {
  const location = useLocation();

  const routeTitles: Record<string, string> = {
    "/home": "Home",
    "/dashboard": "Dashboard",
    "/appointment": "Appointments",
    "/patients": "Patients",
    "/doctors": "Doctors",
    "/inbox": "Inbox",
    "/help": "Help",
    "/settings": "Settings",
  };

  
  const currentTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <header
      className={`bg-gray-100 h-[64px] flex items-center justify-between px-[24px] py-[12px] gap-[10px] transition-all duration-300 ${
        sidebarExpanded ? "ml-[256px]" : "ml-[80px]"
      }`}
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <img
          src="/images/fi_sidebar.svg"
          alt="Sidebar Icon"
          className="cursor-pointer object-contain"
          style={{ width: "25px", height: "25px" }}
        />
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
          {currentTitle}
        </h1>

          <Breadcrumbs />

      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="p-2 sm:p-2.5 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <img
            src="/images/u_plus.svg"
            alt="Add Icon"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>

        <div className="p-2 sm:p-2.5 bg-white rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center">
          <img
            src="/images/fi_bell.svg"
            alt="Notification"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>

        <img
          src="/images/Ellipse 1.svg"
          alt="Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
