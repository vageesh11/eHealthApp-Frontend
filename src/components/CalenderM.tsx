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
 
  const [view, setView] = useState<"Day" | "Work Week" | "Month">("Day");
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

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };

  const handleTimeClick = (hour: number, day?: Date) => {
    const selected = new Date(day || startDate || new Date());
    selected.setHours(hour, 0, 0, 0);
    alert(
      `You clicked ${selected.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })} at ${selected.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`
    );
  };

  /** Day View */
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return (
      <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-200 py-3 px-4 flex flex-col items-start">
          <span className="text-4xl text-gray-900">{startDate?.getDate()}</span>
          <span className="text-lg text-gray-700">
            {startDate?.toLocaleDateString("en-US", { weekday: "long" })}
          </span>
        </div>

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

  /** Work Week View */
  const renderWorkWeekView = () => {
    if (!startDate) return null;

    const startOfWeek = new Date(startDate);
    const dayOfWeek = startOfWeek.getDay();
    const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });

    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-8 bg-gray-200">
          <div className="p-2 text-center font-bold text-gray-700">Time</div>
          {days.map((day) => (
            <div
              key={day.toDateString()}
              className="p-2 text-center font-semibold text-gray-700"
            >
              {day.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })}
            </div>
          ))}
        </div>

        <div className="divide-y divide-gray-300">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 h-16">
              <div className="flex justify-center text-sm text-gray-600 border-r border-gray-300">
                {formatHour(hour)}
              </div>
              {days.map((day) => (
                <button
                  key={day.toDateString() + hour}
                  onClick={() => handleTimeClick(hour, day)}
                  className="border-r border-gray-300 hover:bg-blue-100 transition"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  /** Month View */
  const renderMonthView = () => {
    if (!startDate) return null;

    const year = startDate.getFullYear();
    const month = startDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Date[] = [];
    for (let i = firstDay.getDay(); i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    for (let i = 1; days.length % 7 !== 0; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return (
      <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-200 text-center font-bold">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() =>
                alert(
                  `You clicked ${day.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}`
                )
              }
              className={`p-4 h-20 border border-gray-300 hover:bg-blue-100 transition ${
                day.getMonth() !== month ? "bg-gray-100 text-gray-400" : ""
              }`}
            >
              {day.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleDateChange = (direction: "prev" | "next") => {
    setStartDate((prev) => {
      if (!prev) return new Date();
      const newDate = new Date(prev);

      if (view === "Day") {
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
      } else if (view === "Work Week") {
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      } else if (view === "Month") {
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      }

      return newDate;
    });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-500 text-white px-4 py-2 shadow-md rounded-xl">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-500 hover:bg-gray-700"
            onClick={() => setStartDate(new Date())}
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>Today</span>
          </button>

          <button
            className="p-2 rounded-xl hover:bg-gray-700"
            onClick={() => handleDateChange("prev")}
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          <button
            className="p-2 rounded-xl hover:bg-gray-700"
            onClick={() => handleDateChange("next")}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

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

      {view === "Day" && renderDayView()}
      {view === "Work Week" && renderWorkWeekView()}
      {view === "Month" && renderMonthView()}
    </div>
  );
};

export default CalenderM;
