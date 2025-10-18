import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const expanded = isOpen || isHovered;

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const menuItems = [
    { name: "Dashboard", icon: "/images/fi_grid.svg", path: "/" },
    { name: "Appointments", icon: "/images/fi_calendar.svg", path: "/appointment" },
    { name: "Patients", icon: "/images/fi_user.svg", path: "/patients" },
    { name: "Doctors", icon: "/images/Frame.svg", path: "/doctors" },
    { name: "Inbox", icon: "/images/fi_inbox.svg", path: "/inbox" },
  ];

  const bottomItems = [
    { name: "Help", icon: "/images/fi_help-circle.svg", path: "/help" },
    { name: "Settings", icon: "/images/fi_settings.svg", path: "/settings" },
  ];

  const renderMenuItem = (item: typeof menuItems[0], index: number) => {
    const isActive = activeIndex === index;
    return (
      <li key={index} className="flex">
        <Link
          to={item.path}
          onClick={() => handleClick(index)}
          className={`flex items-center p-4 cursor-pointer w-full transition-colors duration-200 
            ${isActive ? "bg-gray-200" : "hover:bg-gray-200"}`}
        >
          <img
            src={item.icon}
            alt={`${item.name} Icon`}
            className=""
            style={isActive ? { filter: "invert(35%) sepia(94%) saturate(5151%) hue-rotate(200deg) brightness(95%) contrast(101%)" } : {}}
          />
          <span
            className={`ml-4 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 hidden"} 
            ${isActive ? "text-[#016BFF]" : ""}`}
          >
            {item.name}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <div
      className={`bg-white text-black transition-all duration-300 flex flex-col justify-between ${expanded ? "w-64" : "w-20"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Menu */}
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <nav className="mb-6">
        <ul>
          {bottomItems.map((item, index) =>
            renderMenuItem(item, menuItems.length + index)
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
