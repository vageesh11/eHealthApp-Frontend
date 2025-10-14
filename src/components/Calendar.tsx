import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <div className="flex items-center gap-2 mb-5">
      {/* Calendar Icon */}
      <label className="cursor-pointer flex items-center gap-2 text-gray-800 hover:bg-[rgb(152,215,216)] p-2 rounded">
        <FaRegCalendarAlt size={20} />
        {/* Hidden Date Picker (click icon to open) */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="absolute opacity-0 cursor-pointer w-6"
        />
      </label>

      {selectedDate && (
        <span className="ml-2 font-medium text-sm text-gray-600">
          {new Date(selectedDate).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default Calendar;
