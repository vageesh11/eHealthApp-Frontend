import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { Event, addEvent } from "../store/calendarSlice";
import AppointmentModal from "../modals/AppointmentModal";

const CalendarM: React.FC = () => {
  const [view, setView] = useState<"Day" | "Week" | "Month">("Day");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isFromCellClick, setIsFromCellClick] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleOpenModal = (fromCell = false) => {
    setIsModalOpen(true);
    setIsFromCellClick(fromCell);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalPosition(null);
    setIsFromCellClick(false);
  };


  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.calendar.events);
  const today = new Date();

  const getEventsForDateAndHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const [time, ampm] = event.fromTime.split(" ");
      let [h] = time.split(":");
      let eventHour = parseInt(h);

      if (ampm === "PM" && eventHour !== 12) eventHour += 12;
      if (ampm === "AM" && eventHour === 12) eventHour = 0;

      return (
        eventDate.toDateString() === date.toDateString() &&
        eventHour === hour
      );
    });
  };

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime();
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentTime(new Date());
    setForceUpdate((prev) => !prev);
  }, [view, startDate]);

  useEffect(() => {
    if (scrollRef.current && (view === "Day" || view === "Week")) {
      const position =
        currentTime.getHours() * 64 + (currentTime.getMinutes() / 60) * 64;
      scrollRef.current.scrollTo({
        top: Math.max(0, position - 200),
        behavior: "smooth",
      });
    }
  }, [view, currentTime, forceUpdate]);

  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 800);
    };
    div.addEventListener("scroll", handleScroll);
    return () => div.removeEventListener("scroll", handleScroll);
  }, []);

  const getStartOfWeek = (d: Date) => {
    const copy = new Date(d);
    const day = copy.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    copy.setDate(copy.getDate() + diff);
    copy.setHours(12, 0, 0, 0);
    return copy;
  };

  const addDays = (d: Date, n: number) => {
    const c = new Date(d);
    c.setDate(c.getDate() + n);
    return c;
  };

  const isoDateKey = (d: Date) => d.toLocaleDateString("en-CA");
  const formatHour = (hour: number) => hour.toString();


  const handleTimeClick = (hour: number, e: React.MouseEvent, date: Date) => {
    e.stopPropagation();

    const existingEvents = getEventsForDateAndHour(date, hour);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    if (existingEvents.length === 0) {
      // Empty → open AppointmentModal
      setPopupPosition(null);
      setSelectedEvent(null);
      setSelectedDate(date);
      setSelectedTime(`${hour}:00`);
      setIsModalOpen(true);
      setIsFromCellClick(true);
    }
  };



  const handleHourCellClick = (date: Date,  hour: number, e: React.MouseEvent) => {
    e.stopPropagation();

    const existingEvents = getEventsForDateAndHour(date,hour);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    if (existingEvents.length > 0) {

      const event = existingEvents[0];
      setPopupPosition({
        top: rect.top + window.scrollY + 30,
        left: rect.left + rect.width + 10,
      });
      setSelectedEvent(event);
      setIsModalOpen(false);
    } else {

      setSelectedDate(date);
      setSelectedTime(`${hour}:00`);
      setSelectedEvent(null);
      setPopupPosition(null);
      setIsModalOpen(true);
      setIsFromCellClick(true);
    }
  };

  const handleEventClick = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setPopupPosition({
      top: rect.top + window.scrollY + rect.height + 10,
      left: rect.left + rect.width / 2,
    });

    setSelectedEvent(event);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const workWeekStart = getStartOfWeek(startDate);
  const workWeekDays = Array.from({ length: 7 }, (_, i) => addDays(workWeekStart, i));

  // ---- DAY VIEW ----
  const renderDayView = () => {
    const linePosition = currentTime.getHours() * 64 + (currentTime.getMinutes() / 60) * 64;
    return (
      <div key={`day-view-${forceUpdate}`}
        className="mt-2 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-[4rem_1fr] border-b border-gray-300 bg-white sticky top-0 z-10">
          <div className="w-16 h-16 flex items-center justify-center border-r border-gray-300">
            <img src="/images/Icon.svg" alt="Clock Icon" className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center bg-black text-white font-semibold tracking-wide rounded-tr-lg text-sm sm:text-base">
            {startDate.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()} -{" "}
            {String(startDate.getDate()).padStart(2, "0")}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="relative overflow-y-auto h-[calc(100vh-340px)] sm:h-[calc(100vh-320px)] lg:h-[calc(100vh-247px)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
        >
          <div className="relative">
            {startDate.toDateString() === currentTime.toDateString() && (
              <div
                key={`${view}-${forceUpdate}`}
                className="absolute left-[4rem] right-0 h-0.5 bg-red-500 z-20"
                style={{ top: `${linePosition}px` }}>
                <div
                  className="absolute -left-2 top-1/2 -translate-y-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderRight: "8px solid #ef4444",
                  }}
                />
              </div>
            )}

            {hours.map((hour) => (
              <div key={hour}
                onClick={(e) => handleHourCellClick(startDate, hour, e)}
                className="grid grid-cols-[4rem_1fr] h-16 border-b border-gray-200">
                <div className="flex items-center justify-center text-[11px] sm:text-sm text-gray-600 border-r border-gray-300">
                  {formatHour(hour)}
                </div>
                <div className="relative w-full h-full hover:bg-gray-100">
                  {/* Render all events for this hour */}
                  {getEventsForDateAndHour(startDate, hour).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => handleEventClick(e, event)}
                      className="absolute inset-x-0 h-full top-0 rounded-lg px-4 py-2 text-sm flex flex-col border-4 shadow-sm"
                      style={{
                        borderColor: event.colorBorder,
                        backgroundColor: event.colorBg,
                      }}
                    >

                      <div className="flex items-center justify-start gap-0 text-xs font-semibold text-gray-700 mb-1">
                        <span>{event.fromTime}</span>
                        <img
                          src="/images/fi_arrow-right.svg"
                          alt="arrow"
                          className="w-3 h-3 mx-1"
                        />
                        <span>{event.toTime}</span>
                      </div>


                      <div className="flex items-center justify-between relative">

                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center justify-center rounded-full text-white text-xs font-semibold w-6 h-6"
                            style={{ backgroundColor: event.colorBorder }}
                          >
                            {event.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>

                          {/* Visit Type */}
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                            <span className="text-[10px] font-semibold text-gray-900">
                              {event.visitType}
                            </span>
                          </div>
                        </div>

                        {/* Mode Icon (centered vertically) */}

                      </div>
                      <div className="absolute right-2 top-7 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm">
                        <img
                          src={
                            event.visitMode === "Online"
                              ? "/images/fi_video.svg"
                              : "/images/Frame (1).svg"
                          }
                          alt="mode"
                          className="w-6 h-6"
                        />
                      </div>
                    </div>


                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ---- WEEK VIEW ----
  const renderWeekView = () => {
    const todayKey = new Date().toDateString();
    const linePosition = currentTime.getHours() * 64 + (currentTime.getMinutes() / 60) * 64;

    return (
      <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="grid grid-cols-[4rem_repeat(7,1fr)] border-b border-gray-200 bg-white sticky top-0 z-10" style={{ width: "calc(100% - 8px)" }}>
          <div className="h-16 flex items-center justify-center border-r border-gray-200 bg-white">
            <img src="/images/Icon.svg" alt="Clock Icon" className="w-6 h-6" />
          </div>

          {workWeekDays.map((day, idx) => {
            const isToday = day.toDateString() === todayKey;
            return (
              <div
                key={day.toDateString()}
                className={`flex items-center justify-center h-16 font-semibold tracking-wide text-sm sm:text-base border-r border-gray-200 ${idx === workWeekDays.length - 1 ? "last:border-r-0" : ""
                  } ${isToday ? "bg-black text-white" : "bg-white text-gray-600"}`}
              >
                {day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()} -{" "}
                {String(day.getDate()).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        <div
          ref={scrollRef}
          className="relative overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500
          h-[calc(100vh-340px)] sm:h-[calc(100vh-320px)] lg:h-[calc(100vh-247px)]"
        >
          <div
            className="absolute left-[4rem] right-0 h-0.5 bg-red-500 z-20 pointer-events-none"
            style={{ top: `${linePosition}px` }}
          >
            <div
              className="absolute -left-2 top-1/2 -translate-y-1/2"
              style={{
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "8px solid #ef4444",
              }}
            />
          </div>

          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-[4rem_repeat(7,1fr)] h-16 border-b border-gray-200">
              <div className="flex items-center justify-center text-[11px] sm:text-sm text-gray-600 border-r border-gray-200 bg-white">
                {formatHour(hour)}
              </div>
              {workWeekDays.map((day, colIdx) => (
                <div
                  key={`${day.toDateString()}-${hour}`}
                  onClick={(e) => handleHourCellClick(day, hour, e)} // 👉 for empty cell
                  className={`relative w-full h-full border-r border-gray-200 hover:bg-gray-100 ${colIdx === workWeekDays.length - 1 ? "last:border-r-0" : ""}`}
                >
                  {getEventsForDateAndHour(day, hour).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => handleHourCellClick(day, hour, e)} // 👉 for filled cell
                      className="absolute inset-x-0 h-full top-0 rounded-lg px-3 py-2 text-sm flex flex-col border-4 shadow-sm cursor-pointer"
                      style={{
                        borderColor: event.colorBorder,
                        backgroundColor: event.colorBg,
                      }}
                    >
                      <div className="flex items-center justify-start gap-0 text-xs font-semibold text-gray-700 mb-1">
                        <span>{event.fromTime}</span>
                        <img src="/images/fi_arrow-right.svg" alt="arrow" className="w-3 h-3 mx-1" />
                        <span>{event.toTime}</span>
                      </div>

                      <div className="flex items-center justify-between relative">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center justify-center rounded-full text-[11px] text-white font-semibold w-6 h-6"
                            style={{ backgroundColor: event.colorBorder }}
                          >
                            {event.patientName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                            <span className="text-[6px] font-semibold text-gray-900">{event.visitType}</span>
                          </div>
                        </div>
                      </div>

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm">
                        <img
                          src={event.visitMode === "Online" ? "/images/fi_video.svg" : "/images/Frame (1).svg"}
                          alt="mode"
                          className="w-3.5 h-3.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}

            </div>
          ))}
        </div>
      </div>
    );
  };


  const renderMonthView = () => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekDay = (firstDay.getDay() + 6) % 7;

    const days: Date[] = [];


    for (let i = startWeekDay; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }

    // Current month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    // Next month's leading days
    while (days.length % 7 !== 0) {
      const nextDay = new Date(
        year,
        month + 1,
        days.length - startWeekDay - lastDay.getDate() + 1
      );
      days.push(nextDay);
    }

    const today = new Date();
    const totalWeeks = days.length / 7;

    return (
      <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-7 h-16 border-b border-gray-300 bg-gray-100 sticky top-0 z-10">
          {[
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ].map((day) => (
            <div
              key={day}
              className="flex items-center justify-center font-semibold text-[12px] sm:text-sm text-gray-500 border-r border-gray-200 last:border-r-0 h-16"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Month Grid */}
        <div
          className="grid border-t border-gray-200"
          style={{
            gridTemplateColumns: "repeat(7, minmax(90px, 1fr))",
            height: "calc(100vh - 247px)",
          }}
        >
          {days.map((day, idx) => {
            const isCurrentMonth = day.getMonth() === month;
            const isToday =
              day.getFullYear() === today.getFullYear() &&
              day.getMonth() === today.getMonth() &&
              day.getDate() === today.getDate();

            return (
              <div
                key={idx}
                className={`p-2 flex flex-col justify-start items-start border-b border-r border-gray-200 last:border-r-0 transition-colors duration-200 ${isCurrentMonth
                  ? "bg-white hover:bg-gray-50 cursor-pointer"
                  : "bg-gray-50 text-gray-400"
                  }`}
              >
                <div className="w-full flex justify-start">
                  {isToday ? (
                    <div
                      className="w-6 h-6 flex items-center justify-center text-blue-500 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: "#64A4FF26" }}
                    >
                      {String(day.getDate()).padStart(2, "0")}
                    </div>
                  ) : (
                    <div className="text-sm font-medium text-gray-700">
                      {String(day.getDate()).padStart(2, "0")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };



  // ---- Navigation & Controls ----
  const handleDateChange = (direction: "prev" | "next") => {
    setStartDate((prev) => {
      if (view === "Day") {
        const d = new Date(prev);
        d.setDate(prev.getDate() + (direction === "next" ? 1 : -1));
        return d;
      } else if (view === "Week") {
        return addDays(getStartOfWeek(prev), direction === "next" ? 7 : -7);
      } else {
        const d = new Date(prev);
        d.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
        return d;
      }
    });
  };

  const handleTodayClick = () => {
    const now = new Date();
    if (view === "Week") setStartDate(getStartOfWeek(now));
    else setStartDate(now);
  };

  const handleSetView = (v: "Day" | "Week" | "Month") => {
    setView(v);
    if (v === "Week") setStartDate((prev) => getStartOfWeek(prev));
  };

  // ---- DATE PICKER TEXT FIX ----
  const formatDatePickerText = () => {
    if (view === "Day") {
      return startDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }) + ` ${String(startDate.getDate()).padStart(2, "0")}`;
    } else if (view === "Week") {
      const start = getStartOfWeek(startDate);
      const end = addDays(start, 6);
      const formatDay = (d: Date) => String(d.getDate()).padStart(2, "0");
      return `${start.toLocaleDateString("en-US", {
        month: "short",
      })} ${formatDay(start)} - ${end.toLocaleDateString("en-US", {
        month: "short",
      })} ${formatDay(end)}`;
    } else {
      return startDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
  };

  const handleAddAppointmentClick = () => {
    setIsFromCellClick(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setIsModalOpen(true);
  };


  // ---- HEADER ----
  return (
    <div className="relative">
      <header className="flex justify-between items-center text-white px-1 py-2">
        <div className="flex items-center gap-2">
          <button onClick={() => setStartDate(new Date())} className="w-[100px] h-[50px] rounded-full bg-black text-white text-lg font-medium hover:bg-gray-800">
            Today
          </button>

          <div className="flex bg-white rounded-full shadow-sm border overflow-hidden">
            {["Day", "Week", "Month"].map((label, index) => {
              const isActive = view === label;
              const shapeClass = label === "Day" ? "rounded-l-full" : label === "Month" ? "rounded-r-full" : "rounded-none";
              return (
                <React.Fragment key={label}>
                  <button
                    onClick={() => setView(label as any)}
                    className={`px-3 py-1 text-lg font-medium w-[110px] h-[50px] transition-all duration-200 ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"
                      } ${shapeClass}`}
                  >
                    {label}
                  </button>
                  {index < 2 && <div className="w-[1px] bg-gray-300 h-[50px]" />}
                </React.Fragment>
              );
            })}
          </div>

          <button onClick={() => handleDateChange("prev")} className="p-3.5 bg-white rounded-full shadow hover:bg-gray-100 w-[50px] h-[50px]">
            <FaChevronLeft className="text-black" />
          </button>


          <DatePicker
            selected={startDate}
            onChange={(d) => setStartDate(d || new Date())}
            dateFormat="MMMM d, yyyy"
            customInput={
              <button className="flex items-center text-lg gap-2 font-medium text-black">
                {view === "Day" ? (
                  startDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                ) : view === "Week" ? (
                  (() => {
                    const start = getStartOfWeek(startDate);
                    const end = addDays(start, 6);
                    const sameMonth = start.getMonth() === end.getMonth();

                    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
                    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
                    const year = end.getFullYear();

                    return sameMonth
                      ? `${startMonth} ${String(start.getDate()).padStart(2, "0")} - ${String(
                        end.getDate()
                      ).padStart(2, "0")}, ${year}`
                      : `${startMonth} ${String(start.getDate()).padStart(2, "0")} - ${endMonth} ${String(
                        end.getDate()
                      ).padStart(2, "0")}, ${year}`;
                  })()
                ) : (
                  startDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                )}
                <FaChevronDown className="w-3 h-3" />
              </button>
            }
          />



          <button onClick={() => handleDateChange("next")} className="p-4 bg-white rounded-full w-[50px] h-[50px] shadow hover:bg-gray-100">
            <FaChevronRight className="text-black" />
          </button>
        </div>

        <button
          className="flex items-center gap-4 bg-[#168BD9] h-[50px] hover:bg-[#0f78be] text-white font-semibold text-lg px-4 py-2 rounded-full shadow transition-all duration-200"
          onClick={() => handleOpenModal(false)}

        >
          <img src="/images/u_plus-circle.svg" alt="Add Icon" className="w-6 h-6" />
          Add Appointment
        </button>
      </header>

      {view === "Day" && renderDayView()}
      {view === "Week" && renderWeekView()}
      {view === "Month" && renderMonthView()}


      {selectedEvent && popupPosition && (
        <Popup
          event={selectedEvent}
          position={popupPosition}
          onClose={() => setSelectedEvent(null)}
        />
      )}


      {isModalOpen && (
        <>
          {!isFromCellClick ? (

            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-blue-50/60 backdrop-blur-sm"></div>
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <AppointmentModal
                  onClose={handleCloseModal}
                  selectedDate={isFromCellClick ? selectedDate : null}
                  selectedTime={isFromCellClick ? selectedTime : null}
                />
              </div>
            </div>
          ) : (

            <div
              className="absolute z-50 bg-white rounded-xl shadow-2xl w-[400px] max-h-[90vh] overflow-y-auto border border-gray-200"
              style={{
                top: Math.min(modalPosition?.top || 0, window.innerHeight - 500),
                left: Math.min(modalPosition?.left || 0, window.innerWidth - 420),
                position: "absolute",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AppointmentModal
                onClose={handleCloseModal}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            </div>
          )}


        </>
      )}

    </div>
  );
};

export default CalendarM;

