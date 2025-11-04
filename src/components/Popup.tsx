import React, { useEffect, useRef } from "react";

interface PopupProps {
  event: any;
  position: { top: number; left: number };
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ event, position, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // 🧠 Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="fixed bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-[9999] w-72"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, 0)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{event.patientName}</h3>
          <p className="text-xs text-gray-500">{event.patientId}</p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <img
            src="/images/x-01.svg"
            alt="Close"
            className="w-5 h-5 mr-1"
          />
        </button>
      </div>

      <p className="text-sm font-medium text-gray-700">
        {event.fromTime} - {event.toTime}
      </p>
      <p className="text-sm text-gray-600 mt-2">{event.reason}</p>

      <div className="flex justify-end gap-3 mt-4">
        <button className="text-gray-500 font-medium text-sm">Cancel</button>
        <button className="text-blue-600 font-semibold text-sm">Reschedule</button>
      </div>
    </div>
  );
};

export default Popup;

