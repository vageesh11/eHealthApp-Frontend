import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav
      className="text-sm text-gray-600 flex items-center space-x-2 mt-1"
      aria-label="Breadcrumb"
    >
      <Link to="/home" className="hover:text-[#016BFF] font-medium">
        <img
          src="/images/fi_home.svg"
          alt="Home Icon"
          className="w-3 h-3 text-gray-400 ml-4"
        />
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label =
          name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");

        return (
          <span key={index} className="flex items-center space-x-2">
            <img
              src="/images/fi_chevron-right.svg"
              alt="Right Icon"
              className="w-4 h-4 text-gray-400"
            />
            {isLast ? (
              <span className="text-gray-400 font-semibold ">{label}</span>
            ) : (
              <Link to={routeTo} className="hover:text-[#016BFF] font-medium">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
