import React from "react";
import { FaSearch } from "react-icons/fa";

export interface SearchbarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void; 
}

const Searchbar: React.FC<SearchbarProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="flex items-center border-b px-1.5 py-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="flex-grow outline-none text-sm"
      />
      <FaSearch className="text-gray-500 ml-2" />
    </div>
  );
};

export default Searchbar;
