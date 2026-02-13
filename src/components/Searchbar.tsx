

import React from "react";
import { FaSearch } from "react-icons/fa";

export interface SearchbarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center border border-gray-300 px-2 py-1 rounded-md w-full  bg-white focus-within:ring-1 focus-within:ring-blue-400 transition">
      {/* Search Icon */}
      <FaSearch className="text-gray-400 mr-1 text-xs" />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full text-xs outline-none placeholder-gray-400 bg-transparent"
      />
    </div>
  );
};

export default Searchbar;
