import React, { useState, useMemo, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Searchbar from "../components/Searchbar";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/calendarSlice";
import { v4 as uuidv4 } from "uuid";



interface Patient {
  id: string;
  name: string;
  email: string;
}

interface AppointmentModalProps {
  onClose: () => void;
  selectedDate: Date | null;
  selectedTime: string | null;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ onClose, selectedTime, selectedDate }) => {
  const dispatch = useDispatch();

  const [patientsList, setPatientsList] = useState<Patient[]>([
    { id: "PID158057", name: "John Doe", email: "john.doe@email.com" },
    { id: "PID158058", name: "Ananya Rao", email: "ananya.rao@email.com" },
    { id: "PID158059", name: "Vikram Singh", email: "vikram.singh@email.com" },
    { id: "PID158060", name: "Priya Jacob", email: "priya.jacob@email.com" },
    { id: "PID158061", name: "Rahul", email: "rahul.rahul@email.com" },
  ]);

  const colors = [
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-teal-200",
    "bg-rose-200",
  ];

  const [fromTime, setFromTime] = useState(selectedTime ? selectedTime : "");
  const [toTime, setToTime] = useState(() => {
    if (selectedTime) {
      const [hour, minute] = selectedTime.split(":").map(Number);
      const to = new Date();
      to.setHours(hour, minute + 30, 0, 0);
      return `${to.getHours().toString().padStart(2, "0")}:${to
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    }
    return "";
  });
  const [date, setDate] = useState<Date | null>(selectedDate ? selectedDate : null);


  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchPatient, setSearchPatient] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  const [selectedVisit, setSelectedVisit] = useState("");
  const [showVisitDropdown, setShowVisitDropdown] = useState(false);
  const [searchVisit, setSearchVisit] = useState("");

  const [visitMode, setVisitMode] = useState("Offline");
  const [reason, setReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [fromHours, setFromHours] = useState("");
  const [fromMinutes, setFromMinutes] = useState("");
  const [fromAmpm, setFromAmpm] = useState("AM");

  const [toHours, setToHours] = useState("");
  const [toMinutes, setToMinutes] = useState("");
  const [toAmpm, setToAmpm] = useState("AM");

  useEffect(() => {
    if (selectedTime) {
      const [hour, minute] = selectedTime.split(":").map(Number);
      let fromHr = hour;
      let fromAmPm = "AM";

      if (fromHr >= 12) {
        fromAmPm = "PM";
        if (fromHr > 12) fromHr -= 12;
      } else if (fromHr === 0) {
        fromHr = 12;
      }


      const toDate = new Date();
      toDate.setHours(hour);
      toDate.setMinutes(minute + 30);
      let toHr = toDate.getHours();
      let toMin = toDate.getMinutes();
      let toAmPm = "AM";
      if (toHr >= 12) {
        toAmPm = "PM";
        if (toHr > 12) toHr -= 12;
      } else if (toHr === 0) {
        toHr = 12;
      }

      setFromHours(fromHr.toString().padStart(2, "0"));
      setFromMinutes(minute.toString().padStart(2, "0"));
      setFromAmpm(fromAmPm);

      setToHours(toHr.toString().padStart(2, "0"));
      setToMinutes(toMin.toString().padStart(2, "0"));
      setToAmpm(toAmPm);
    } else {

      setFromHours("");
      setFromMinutes("");
      setFromAmpm("AM")
      setToHours("");
      setToMinutes("");
      setToAmpm("AM");
    }
  }, [selectedTime]);

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    } else {
      setDate(null);
    }
  }, [selectedDate]);


  const visitTypes = [
    { label: "Follow-up Appointment", color: "bg-purple-500" },
    { label: "New Patient Appointment", color: "bg-blue-500" },
    { label: "Routine Check-up", color: "bg-green-500" },
    { label: "Emergency Appointment", color: "bg-red-500" },
    { label: "Lab Test/Diagnostic Appointment", color: "bg-pink-500" },
    { label: "Procedure/Surgery Appointment", color: "bg-orange-500" },
    { label: "Specialist Referral Appointment", color: "bg-teal-500" },
    { label: "Second Opinion Appointment", color: "bg-violet-500" },
    { label: "Medication Review Appointment", color: "bg-yellow-500" },
  ];

  const filteredPatients = useMemo(
    () =>
      patientsList.filter((p) =>
        p.name.toLowerCase().includes(searchPatient.toLowerCase())
      ),
    [patientsList, searchPatient]
  );

  const filteredVisits = useMemo(
    () =>
      visitTypes.filter((v) =>
        v.label.toLowerCase().includes(searchVisit.toLowerCase())
      ),
    [visitTypes, searchVisit]
  );

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };



  const handleAddToList = (name: string) => {
    if (!name.trim()) return;
    const newPatient = {
      id: "PID" + Math.floor(100000 + Math.random() * 900000),
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@email.com`,
    };
    setPatientsList((prev) => [...prev, newPatient]);
    setSelectedPatient(newPatient);
    setShowPatientDropdown(false);
    setSearchPatient("");
  };



  const visitTypeColors: Record<string, { border: string; bg: string }> = {
    "Follow-up Appointment": { border: "#a254f0ff", bg: "#c19ee6ff" },
    "New Patient Appointment": { border: "#2563EB", bg: "#649ce4ff" },
    "Routine Check-up": { border: "#16A34A", bg: "#b5e8c7ff" },
    "Emergency Appointment": { border: "#DC2626", bg: "#e5a4a4ff" },
    "Lab Test/Diagnostic Appointment": { border: "#DB2777", bg: "#e9a4cbff" },
    "Procedure/Surgery Appointment": { border: "#F97316", bg: "#f0cd9fff" },
    "Specialist Referral Appointment": { border: "#0D9488", bg: "#a7eedeff" },
    "Second Opinion Appointment": { border: "#6427d5ff", bg: "#8d77efff" },
    "Medication Review Appointment": { border: "#EAB308", bg: "#FEF9C3" },
  };

  const [appointmentDate, setAppointmentDate] = useState(
    selectedDate || new Date()
  );

  const handleAddAppointment = () => {
    const formatTime = (hours: string, minutes: string, ampm: string) => {
      if (!hours || !minutes) return "";
      let h = parseInt(hours);
      if (ampm === "PM" && h < 12) h += 12;
      if (ampm === "AM" && h === 12) h = 0;
      return `${h.toString().padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    };

    const computedFromTime = formatTime(fromHours, fromMinutes, fromAmpm);
    const computedToTime = formatTime(toHours, toMinutes, toAmpm);

    if (!appointmentDate || !selectedPatient || !selectedVisit || !computedFromTime || !computedToTime) {
      alert("Please fill all fields");
      return;
    }

    const selectedColors =
      visitTypeColors[selectedVisit] || { border: "#6B7280", bg: "#c4cddeff" };

    const newEvent = {
      id: uuidv4(),
      patientName: selectedPatient.name,
      visitType: selectedVisit,
      visitMode,
      date: appointmentDate.toISOString(),
      fromTime: computedFromTime,
      toTime: computedToTime,
      reason,
      color: selectedColors.border,
      colorBorder: selectedColors.border,
      colorBg: selectedColors.bg,
      initials: getInitials(selectedPatient.name),
    };

    dispatch(addEvent(newEvent));
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-opacity-00 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        {/* Title Row */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Appointment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <img
              src="/images/x-01.svg"
              alt="Add"
              className="w-5 h-5 mr-1"
            />
          </button>
        </div>

        {/* Enter Patient ID */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-medium mb-1">
            Enter Patient ID
          </label>

          <div className="relative">
            <button
              className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-1 rounded-xl
               text-left"
              onClick={() => setShowPatientDropdown(!showPatientDropdown)}
            >
              <span className="text-gray-400"
              >{selectedPatient ? selectedPatient.name : "Select"}</span>
              <FaChevronDown
                className={`text-gray-400 transition-transform duration-200 ${showPatientDropdown ? "rotate-180" : ""
                  }`}
              />
            </button>

            {showPatientDropdown && (
              <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                <div className="p-2 border-b border-gray-100 sticky top-0 bg-white w-full">
                  <Searchbar
                    placeholder="Search..."
                    value={searchPatient}
                    onChange={setSearchPatient}
                  />
                </div>

                {filteredPatients.length > 0 ? (
                  filteredPatients.map((p, index) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPatient(p);
                        setShowPatientDropdown(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-400 text-sm font-semibold ${colors[index % colors.length]
                          }`}
                      >
                        {getInitials(p.name)}
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="font-medium text-gray-600">{p.name}</p>
                        <p className="text-xs text-gray-500 bg-gray-100 px-3 py-0.5 rounded-lg">{p.id}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-gray-400 text-sm mb-3">
                      Not found in the list
                    </p>
                    <button
                      onClick={() => handleAddToList(searchPatient)}
                      className="flex items-center px-3 py-1 border border-blue-400 text-blue-500 rounded-full text-sm hover:bg-blue-50"
                    >
                      <img
                        src="/images/u_plus-circle (1).svg"
                        alt="Add"
                        className="w-3 h-3 mr-1"
                      />
                      Add to list
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {selectedPatient && (
            <div className="mt-4 p-3 border rounded-lg bg-gray-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg font-semibold">
                {getInitials(selectedPatient.name)}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {selectedPatient.name}
                </p>
                <p className="text-sm text-gray-500">{selectedPatient.id}</p>
                <p className="text-sm text-blue-600">{selectedPatient.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Visit Type */}
        <div className="mb-4">
          <label className="block text-gray-400 font-medium text-sm mb-1">
            Visit Type
          </label>

          <div className="relative">
            <button
              className="w-full flex justify-between items-center border border-gray-300 rounded-xl
               px-3 py-1 text-left"
              onClick={() => setShowVisitDropdown(!showVisitDropdown)}
            >
              <span className="text-gray-400"
              >{selectedVisit || "Select"}</span>
              <FaChevronDown
                className={`text-gray-400 transition-transform duration-200 ${showVisitDropdown ? "rotate-180" : ""
                  }`}
              />
            </button>

            {showVisitDropdown && (
              <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                  <Searchbar
                    placeholder="Search..."
                    value={searchVisit}
                    onChange={setSearchVisit}
                  />
                </div>

                {filteredVisits.map((v, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedVisit(v.label);
                      setShowVisitDropdown(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className={`w-2 h-2 rounded-full ${v.color}`}></span>
                    <span className="text-gray-800 text-sm">{v.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Visit Mode & Date (Same Row) */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* Visit Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Visit Mode <span className="text-gray-400">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visitMode"
                  checked={visitMode === "Offline"}
                  onChange={() => setVisitMode("Offline")}
                  className="text-blue-500 w-3.5 h-3.5 focus:ring-blue-400"
                />
                {/* <img src="/images/fi_video.svg" alt="Online" className="w-5 h-5" /> */}
                <span>Offline</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visitMode"
                  checked={visitMode === "Online"}
                  onChange={() => setVisitMode("Online")}
                  className="text-blue-500 w-3.5 h-3.5 focus:ring-blue-400"
                />
                {/* /<img src="/images/Frame (1).svg" alt="Offline" className="w-5 h-5" /> */}
                <span>Online</span>
              </label>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={date ? date.toLocaleDateString("en-GB") : ""}
                onClick={() => setIsOpen(!isOpen)}
                readOnly
                placeholder="DD/MM/YY"
                className="w-full border border-gray-300 text-black placeholder-black rounded-lg px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
              />
              <img
                src="/images/fi_calendar (2).svg"
                alt="Calendar Icon"
                onClick={() => setIsOpen(!isOpen)}
                className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer"
              />
              {isOpen && (
                <div
                  className="absolute z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DatePicker
                    selected={date}
                    onChange={(d) => {
                      setDate(d);
                      setIsOpen(false);
                    }}
                    inline
                    dateFormat="dd/MM/yy"
                    onClickOutside={() => setIsOpen(false)}
                  />

                </div>
              )}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* From Time */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              From Time
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300">
              <div className="flex items-center w-full px-2 py-0.5 text-sm">
                <input
                  type="text"
                  value={fromHours}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    setFromHours(val);
                    if (val.length === 2) document.getElementById("fromMinutes")?.focus();
                  }}
                  placeholder="hh"
                  className="w-5 text-center outline-none placeholder-black text-black"
                  maxLength={2}
                />
                <span className="text-gray-600 text-lg">:</span>
                <input
                  id="fromMinutes"
                  type="text"
                  value={fromMinutes}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    setFromMinutes(val);
                  }}
                  placeholder="mm"
                  className="w-6 text-center outline-none placeholder-black text-black"
                  maxLength={2}
                />
              </div>
              <select
                value={fromAmpm}
                onChange={(e) => setFromAmpm(e.target.value)}
                className="px-2 py-2 text-sm border-l border-gray-300 outline-none focus:ring-0"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
              <div className="px-3 py-0.5 border-gray-300 flex items-center justify-center bg-white border-l">
                <img
                  src="/images/Icon.svg"
                  alt="Clock Icon"
                  className="w-8 h-8 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* To Time */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              To Time
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300">
              <div className="flex items-center w-full px-2 py-0.5 text-sm">
                <input
                  type="text"
                  value={toHours}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    setToHours(val);
                    if (val.length === 2) document.getElementById("toMinutes")?.focus();
                  }}
                  placeholder="hh"
                  className="w-5 text-center outline-none placeholder-black text-black"
                  maxLength={2}
                />
                <span className="text-gray-600 text-lg">:</span>
                <input
                  id="toMinutes"
                  type="text"
                  value={toMinutes}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    setToMinutes(val);
                  }}
                  placeholder="mm"
                  className="w-6 text-center outline-none placeholder-black text-black"
                  maxLength={2}
                />
              </div>
              <select
                value={toAmpm}
                onChange={(e) => setToAmpm(e.target.value)}
                className="px-2 py-2 text-sm border-l border-gray-300 outline-none focus:ring-0"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
              <div className="px-3 py-0.5 border-gray-300 flex items-center justify-center bg-white border-l">
                <img
                  src="/images/Icon.svg"
                  alt="Clock Icon"
                  className="w-8 h-8 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reason Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Reason
          </label>
          <textarea
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 text-black  placeholder-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            rows={3}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 border rounded-xl text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAddAppointment}
            className="px-4 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Add Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;

