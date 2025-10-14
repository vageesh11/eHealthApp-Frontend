import React, { useState, useMemo } from "react";
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
import Popup from "./Popup";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Event, addEvent } from "../store/calendarSlice";

const CalendarM: React.FC = () => {
  const [view, setView] = useState<"Day" | "Work Week" | "Month">("Day");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [openRightDropdown, setOpenRightDropdown] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>(""); // HH:mm
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.calendar.events);

  const today = new Date();

  const getIcon = (option: "Day" | "Work Week" | "Month") => {
    switch (option) {
      case "Day": return <FaRegCalendarAlt className="w-4 h-4 mr-2" />;
      case "Work Week": return <FaBriefcase className="w-4 h-4 mr-2" />;
      case "Month": return <FaCalendarWeek className="w-4 h-4 mr-2" />;
      default: return null;
    }
  };

  const formatHour = (hour: number) => hour.toString(); // 0–23

  const isoDateKey = (d: Date) => d.toISOString().split("T")[0];

  // --- Handle time click for popup floating near cell ---
  const handleTimeClick = (hour: number, e: React.MouseEvent<HTMLButtonElement>, day?: Date) => {
    if (view === "Month") return;
    const selected = new Date(day || startDate);
    selected.setHours(hour, 0, 0, 0);

    const hhmm = `${hour.toString().padStart(2, "0")}:00`;
    setSelectedTime(hhmm);
    setSelectedDate(selected);

    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
    setIsPopupOpen(true);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayKey = isoDateKey(startDate);

  const dayEventsMap = useMemo(() => {
    const map: { [key: number]: Event[] } = {};
    hours.forEach(h => map[h] = []);
    events.forEach(e => {
      if (e.date === dayKey) {
        const hour = parseInt(e.time.split(":")[0]);
        map[hour]?.push(e);
      }
    });
    return map;
  }, [events, dayKey]);

  const workWeekStart = new Date(startDate);
  const dayOfWeek = workWeekStart.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  workWeekStart.setDate(workWeekStart.getDate() + diff);

  const workWeekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(workWeekStart);
    d.setDate(workWeekStart.getDate() + i);
    return d;
  });

  const workWeekEventsMap = useMemo(() => {
    const map: { [key: string]: Event[] } = {};
    events.forEach(e => {
      map[e.date] = map[e.date] || [];
      map[e.date].push(e);
    });
    return map;
  }, [events]);

  // --- Render Day View ---
  const renderDayView = () => (
    <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-200 py-3 px-4 flex flex-col items-start">
        <span className="text-4xl text-gray-900">{startDate.getDate()}</span>
        <span className="text-lg text-gray-700">{startDate.toLocaleDateString("en-US", { weekday: "long" })}</span>
      </div>
      <div className="divide-y divide-gray-300">
        {hours.map(hour => {
          const hourEvents = dayEventsMap[hour] || [];
          const isToday =
            startDate.getFullYear() === today.getFullYear() &&
            startDate.getMonth() === today.getMonth() &&
            startDate.getDate() === today.getDate();

          return (
            <button
              key={hour}
              onClick={(e) => handleTimeClick(hour, e)}
              className={`flex h-20 w-full relative transition ${isToday ? "bg-pink-50 hover:bg-pink-100" : "hover:bg-blue-100"}`}
            >
              <div className="w-16 text-right pr-3 text-gray-600 text-sm">{formatHour(hour)}</div>
              <div className="flex-1 border-l border-gray-300 h-full relative bg-white">
                {hourEvents.map(ev => (
                  <div key={ev.id} className="absolute left-2 top-1 bg-pink-200 text-xs p-1 rounded">
                    {ev.title} {ev.location && `@ ${ev.location}`}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // --- Render Work Week View ---
  const renderWorkWeekView = () => (
    <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
      <div className="grid grid-cols-8 border-b border-gray-300 bg-gray-100">
        <div className="p-2 text-center font-bold text-gray-700 border-r border-gray-300">Time</div>
        {workWeekDays.map(day => {
          const isToday = day.getFullYear() === today.getFullYear() &&
            day.getMonth() === today.getMonth() &&
            day.getDate() === today.getDate();
          return (
            <div key={day.toDateString()} className={`p-2 text-center font-semibold text-gray-700 border-r border-gray-300 ${isToday ? "bg-pink-200 rounded" : ""}`}>
              {day.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
            </div>
          );
        })}
      </div>
      <div className="divide-y divide-gray-300">
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8 h-16">
            <div className="flex justify-center text-sm text-gray-600 border-r border-gray-300">{formatHour(hour)}</div>
            {workWeekDays.map(day => {
              const dateKey = isoDateKey(day);
              const hourEvents = (workWeekEventsMap[dateKey] || []).filter(e => parseInt(e.time.split(":")[0]) === hour);
              const isToday = day.getFullYear() === today.getFullYear() &&
                day.getMonth() === today.getMonth() &&
                day.getDate() === today.getDate();
              return (
                <button
                  key={day.toDateString() + hour}
                  onClick={(e) => handleTimeClick(hour, e, day)}
                  className={`border-r border-gray-300 relative transition ${isToday ? "bg-pink-50 hover:bg-pink-100" : "hover:bg-blue-100"}`}
                >
                  {hourEvents.map(ev => (
                    <div key={ev.id} className="absolute left-1 top-1 bg-pink-200 text-xs p-1 rounded">
                      {ev.title} {ev.location && `@ ${ev.location}`}
                    </div>
                  ))}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  // --- Render Month View ---
  const renderMonthView = () => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Date[] = [];
    const startWeekDay = firstDay.getDay();

    for (let i = startWeekDay; i > 0; i--) {
      const d = new Date(year, month, 1 - i);
      d.setHours(12);
      days.push(d);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      date.setHours(12);
      days.push(date);
    }

    while (days.length % 7 !== 0) {
      const nextDay = days.length - startWeekDay - lastDay.getDate() + 1;
      const d = new Date(year, month + 1, nextDay);
      d.setHours(12);
      days.push(d);
    }

    return (
      <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-200 text-center font-bold">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => <div key={day} className="p-2">{day}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const isToday = day.getFullYear() === today.getFullYear() &&
              day.getMonth() === today.getMonth() &&
              day.getDate() === today.getDate();
            return (
              <div key={idx} className={`p-4 h-20 border border-gray-300 ${day.getMonth() !== month ? "bg-gray-100 text-gray-400" : ""} ${isToday ? "bg-pink-200" : ""}`}>
                <div className="flex justify-between">{day.getDate()}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleDateChange = (direction: "prev" | "next") => {
    setStartDate(prev => {
      const newDate = new Date(prev);
      if (view === "Day") newDate.setDate(prev.getDate() + (direction === "next" ? 1 : -1));
      else if (view === "Work Week") newDate.setDate(prev.getDate() + (direction === "next" ? 7 : -7));
      else if (view === "Month") newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  return (
    <div className="p-4 relative">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-500 text-white px-4 py-2 shadow-md rounded-xl">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-500 hover:bg-gray-700" onClick={() => setStartDate(new Date())}>
            <FaCalendarAlt className="w-4 h-4" />Today
          </button>
          <button className="p-2 rounded-xl hover:bg-gray-700" onClick={() => handleDateChange("prev")}><FaChevronLeft className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl hover:bg-gray-700" onClick={() => handleDateChange("next")}><FaChevronRight className="w-4 h-4" /></button>

          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date || new Date())}
            dateFormat="MMMM d, yyyy"
            customInput={<button className="flex items-center gap-1 font-medium">{startDate.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}<FaChevronDown className="w-3 h-3"/></button>}
            popperClassName="z-50"
          />
        </div>

        {/* Right dropdown */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-500 hover:bg-gray-700" onClick={() => setOpenRightDropdown(prev => !prev)}>
            {getIcon(view)}{view}<FaChevronDown className={`w-3 h-3 transition-transform ${openRightDropdown ? "rotate-180" : ""}`} />
          </button>
          {openRightDropdown && (
            <div className="absolute right-0 mt-2 bg-gray-500 rounded-xl shadow-lg z-50 min-w-[160px]">
              {(["Day","Work Week","Month"] as const).map(option => (
                <button key={option} className="flex items-center w-full px-4 py-2 hover:bg-gray-700" onClick={() => { setView(option); setOpenRightDropdown(false); }}>
                  {getIcon(option)}{option}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Views */}
      {view === "Day" && renderDayView()}
      {view === "Work Week" && renderWorkWeekView()}
      {view === "Month" && renderMonthView()}

      {/* Popup near clicked cell */}
      {isPopupOpen && selectedDate && (
        <div
          style={{
            position: "absolute",
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 9999,
          }}
        >
          <Popup
            isOpen={isPopupOpen}
            selectedTime={selectedTime}
            selectedDate={selectedDate}
            onClose={() => { setIsPopupOpen(false); setSelectedTime(""); setSelectedDate(null); }}
            onSave={data => {
              const usedDate = selectedDate || startDate;
              dispatch(addEvent({
                id: Date.now(),
                title: data.title,
                date: isoDateKey(usedDate),
                time: data.time || selectedTime,
                location: data.location,
                view: view === "Day" ? "day" : "workweek",
              } as Event));
              setIsPopupOpen(false); setSelectedTime(""); setSelectedDate(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarM;


