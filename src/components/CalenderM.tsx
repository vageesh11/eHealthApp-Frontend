import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaChevronDown,
  FaRegCalendarAlt,
  FaBriefcase,
  FaCalendarWeek,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalenderM: React.FC = () => {
  const [view, setView] = useState<"Day" | "Work Week" | "Month">("Month");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [openRightDropdown, setOpenRightDropdown] = useState(false);

  const handleViewChange = (newView: "Day" | "Work Week" | "Month") => {
    setView(newView);
    setOpenRightDropdown(false);
  };

  const getIcon = (option: "Day" | "Work Week" | "Month") => {
    switch (option) {
      case "Day":
        return <FaRegCalendarAlt className="w-4 h-4 mr-2" />;
      case "Work Week":
        return <FaBriefcase className="w-4 h-4 mr-2" />;
      case "Month":
        return <FaCalendarWeek className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  // Format hours in AM/PM format
  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };

  // When user clicks a time slot
  const handleTimeClick = (hour: number) => {
    const selected = new Date(startDate || new Date());
    selected.setHours(hour, 0, 0, 0);
    alert(`You clicked ${selected.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`);
  };

  // Day view with stacked date + day name + clickable timings
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
        {/* Date + Day stacked vertically */}
        <div className="bg-gray-200 py-3 px-4 flex flex-col items-start">
          <span className="text-4xl text-gray-900">
            {startDate?.getDate()}
          </span>
          <span className="text-lg text-gray-700">
            {startDate?.toLocaleDateString("en-US", { weekday: "long" })}
          </span>
        </div>

        {/* Hours List */}
        <div className="divide-y divide-gray-300">
          {hours.map((hour) => (
            <button
              key={hour}
              onClick={() => handleTimeClick(hour)}
              className="flex h-20 w-full hover:bg-blue-100 transition"
            >
              <div className="w-16 text-right pr-3 text-gray-600 text-sm">
                {formatHour(hour)}
              </div>
              <div className="flex-1 border-l border-gray-300 h-full bg-white"></div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-500 text-white px-4 py-2 shadow-md rounded-xl">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Today Button */}
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-500 hover:bg-gray-700"
            onClick={() => setStartDate(new Date())}
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>Today</span>
          </button>

          {/* Left Arrow */}
          <button
            className="p-2 rounded-xl hover:bg-gray-700"
            onClick={() =>
              setStartDate((prev) => {
                if (!prev) return new Date();
                const newDate = new Date(prev);
                newDate.setDate(newDate.getDate() - (view === "Day" ? 1 : 7));
                return newDate;
              })
            }
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow */}
          <button
            className="p-2 rounded-xl hover:bg-gray-700"
            onClick={() =>
              setStartDate((prev) => {
                if (!prev) return new Date();
                const newDate = new Date(prev);
                newDate.setDate(newDate.getDate() + (view === "Day" ? 1 : 7));
                return newDate;
              })
            }
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

          {/* Date Picker */}
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat="MMMM d, yyyy"
            customInput={
              <button className="flex items-center gap-1 font-medium">
                {startDate
                  ? startDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select Date"}
                <FaChevronDown className="w-3 h-3" />
              </button>
            }
            popperClassName="z-50"
          />
        </div>

        {/* Right Section: Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-500 hover:bg-gray-700"
            onClick={() => setOpenRightDropdown((prev) => !prev)}
          >
            {getIcon(view)}
            <span>{view}</span>
            <FaChevronDown
              className={`w-3 h-3 transition-transform ${
                openRightDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {openRightDropdown && (
            <div className="absolute right-0 mt-2 bg-gray-500 rounded-xl shadow-lg z-50 min-w-[160px]">
              {(["Day", "Work Week", "Month"] as const).map((option) => (
                <button
                  key={option}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-700"
                  onClick={() => handleViewChange(option)}
                >
                  {getIcon(option)}
                  <span>{option}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Show Day View */}
      {view === "Day" && renderDayView()}
    </div>
  );
};

export default CalenderM;
