
import React, { useState, useEffect } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; location?: string; time: string }) => void;
  selectedTime: string;
  selectedDate: Date | null;
  position: { top: number; left: number }; 
  viewportWidth: number; 
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedTime,
  selectedDate,
  position,
  viewportWidth,
}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [timeFirstHalf, setTimeFirstHalf] = useState(selectedTime || "");
  const [timeSecondHalf, setTimeSecondHalf] = useState("");

  const [openBelow, setOpenBelow] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);

  useEffect(() => {
    setTimeFirstHalf(selectedTime || "");
    setTimeSecondHalf("");

   
    const viewportHeight = window.innerHeight;
    if (position.top < 200) setOpenBelow(true);
    else if (viewportHeight - position.top < 250) setOpenBelow(false);
    else setOpenBelow(false);

    
    const popupWidth = 288; 
    if (position.left + popupWidth > viewportWidth - 16) setOpenLeft(true);
    else setOpenLeft(false);
  }, [selectedTime, isOpen, position, viewportWidth]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    const finalTime = timeFirstHalf || timeSecondHalf || selectedTime;
    onSave({ title, location, time: finalTime });
    setTitle("");
    setLocation("");
    setTimeFirstHalf("");
    setTimeSecondHalf("");
  };

  const generateTimeOptions = (baseHour: number, baseMinute: number) => {
    const base = new Date();
    base.setHours(baseHour);
    base.setMinutes(baseMinute);
    const times: string[] = [];
    for (let i = 1; i <= 6; i++) {
      const next = new Date(base.getTime() + i * 5 * 60000);
      const hh = next.getHours().toString().padStart(2, "0");
      const mm = next.getMinutes().toString().padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
    return times;
  };

  const [clickedHour] = selectedTime.split(":").map(Number);
  const firstHalf = generateTimeOptions(clickedHour, 0);
  const secondHalf = generateTimeOptions(clickedHour, 30);

  return (
    <div
      className="absolute z-[9999]"
      style={{
        top: openBelow ? position.top + 25 : position.top,
        left: openLeft ? position.left - 288 + 8 : position.left,
        transform: openBelow ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="bg-white rounded-xl shadow-xl p-4 w-72 border border-gray-200">
        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
          Add Event
        </h2>

        {selectedDate && (
          <p className="text-xs text-gray-600 mb-2 text-center">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <label className="block text-xs font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="w-full border border-gray-300 rounded-md p-1.5 mb-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <label className="block text-xs font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="w-full border border-gray-300 rounded-md p-1.5 mb-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <label className="block text-xs font-medium text-gray-700 mb-1">
          Time (first half)
        </label>
        <select
          value={timeFirstHalf}
          onChange={(e) => setTimeFirstHalf(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-1.5 mb-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value={`${clickedHour.toString().padStart(2, "0")}:00`}>
            {`${clickedHour.toString().padStart(2, "0")}:00`}
          </option>
          {firstHalf.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label className="block text-xs font-medium text-gray-700 mb-1">
          Time (second half)
        </label>
        <select
          value={timeSecondHalf}
          onChange={(e) => setTimeSecondHalf(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-1.5 mb-4 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value={`${clickedHour.toString().padStart(2, "0")}:30`}>
            {`${clickedHour.toString().padStart(2, "0")}:30`}
          </option>
          {secondHalf.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400 text-sm transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
