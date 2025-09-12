import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const options = ["Hospital", "Lab", "Clinic"];

const MultilevelDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className="inline-block w-56">
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="border rounded-lg px-4 py-2 flex items-center justify-between w-full bg-white shadow-md hover:bg-gray-50"
      >
        <span className="text-gray-700 font-medium">
          Health care
        </span>
        <FaChevronDown
          className={`ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="mt-2 w-full bg-white border rounded-xl shadow-lg p-2 space-y-2">
          {options.map((label) => (
            <label
              key={label}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg"
            >
              <input
                type="checkbox"
                checked={selected.includes(label)}
                onChange={() => toggleSelection(label)}
                className="accent-[rgb(0,109,111)]"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultilevelDropdown;
