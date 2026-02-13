import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onExpandChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const location = useLocation();

  const expanded = isOpen || isHovered;

  const menuItems = [
    { name: "Home", icon: "/images/fi_sidebar.svg", path: "/home" },
    { name: "Dashboard", icon: "/images/fi_grid.svg", path: "/dashboard" },
    { name: "Appointments", icon: "/images/fi_calendar.svg", path: "/appointment" },
    { name: "Patients", icon: "/images/fi_user.svg", path: "/patients" },
    { name: "Doctors", icon: "/images/Frame.svg", path: "/doctors" },
    { name: "Inbox", icon: "/images/fi_inbox.svg", path: "/inbox" },
  ];

  const bottomItems = [
    { name: "Help", icon: "/images/fi_help-circle.svg", path: "/help" },
    { name: "Settings", icon: "/images/fi_settings.svg", path: "/settings" },
  ];

  useEffect(() => {
    const allItems = [...menuItems, ...bottomItems];
    const currentIndex = allItems.findIndex((item) => item.path === location.pathname);
    setActiveIndex(currentIndex !== -1 ? currentIndex : null);
  }, [location.pathname]);

  const renderMenuItem = (item: typeof menuItems[0], index: number) => {
    const isActive = activeIndex === index;

    return (
      <li key={index}>
        <Link
          to={item.path}
          onClick={() => setActiveIndex(index)}
          className={`flex items-center p-4 cursor-pointer w-full transition-colors duration-200 ${
            isActive ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
        >
          <img
            src={item.icon}
            alt={`${item.name} Icon`}
            className="w-[20px] h-[20px]"
            style={
              isActive
                ? {
                    filter:
                      "invert(35%) sepia(94%) saturate(5151%) hue-rotate(200deg) brightness(95%) contrast(101%)",
                  }
                : {}
            }
          />
          <span
            className={`ml-4 transition-opacity duration-300 ${
              expanded ? "opacity-100" : "opacity-0 hidden"
            } ${isActive ? "text-[#016BFF]" : ""}`}
          >
            {item.name}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white text-black shadow-md transition-all duration-300 flex flex-col justify-between ${
        expanded ? "w-55" : "w-18"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        onExpandChange?.(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onExpandChange?.(false);
      }}
    >
      {/* ABC Title */}
      <div className="flex items-center justify-center h-[64px]">
        <h1 className="text-xl font-semibold hover:text-[#016BFF]">
          {expanded ? "ABC" : "A"}
        </h1>
      </div>

      {/* Top Menu */}
      <nav className="flex-1 mt-2">
        <ul>{menuItems.map((item, index) => renderMenuItem(item, index))}</ul>
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
