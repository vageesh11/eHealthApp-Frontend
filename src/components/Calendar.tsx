
import React from "react";

interface CalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="flex items-center border border-gray-300 px-2 py-1 rounded-md w-full max-w-[120px] bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-400 transition">
      <label className="relative flex items-center gap-1 text-gray-500">
        
        <img
          src="/images/fi_calendar (2).svg"
          alt="Calendar Icon"
          className="w-3.5 h-3.5"
        />

        
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>

      {selectedDate && (
        <span className="ml-1 text-xs text-gray-700 truncate">
          {new Date(selectedDate).toLocaleDateString()}
        </span>
      )}
    </div>
  );
};

export default Calendar;
