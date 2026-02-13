import React, { useEffect, useRef } from "react";

interface PopupProps {
  event: any;
  position: { top: number; left: number };
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ event, position, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="fixed z-[9999] bg-white rounded-2xl shadow-2xl border border-gray-100  p-6 transition-all"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, 0)",
      }}
    >
      {/* Gray Info Section */}
      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <div className="flex items-start justify-between">
          {/* Avatar + Details */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full text-white mt-3 text-xm font-semibold"
              style={{ backgroundColor: event.colorBorder || "#86EFAC" }}
            >
              {event.patientName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </div>

            {/* Patient Info */}
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-900">
                {event.patientName}
              </h3>

              {/* Patient ID pill */}
              <span className="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full w-fit mt-1">
                {event.patientId || "PID158057"}
              </span>

              {/* Time + Follow-up */}
              <div className="flex items-center gap-1 mt-3 text-sm text-gray-800 font-medium">
                <span>{event.fromTime || "09:00"}</span>
                <img
                  src="/images/fi_arrow-right.svg"
                  alt="arrow"
                  className="w-3 h-3"
                />
                <span>{event.toTime || "09:30"}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mx-2"></span>
                <span>{event.visitType || "FOLLOW-UP"}</span>
              </div>
            </div>
          </div>

          {/* Online/Offline Icon inside white circle */}
          <div className="bg-white rounded-full p-2 shadow-sm">
            <img
              src={
                event.visitMode === "Online"
                  ? "/images/fi_video.svg"
                  : "/images/Frame (1).svg"
              }
              alt="mode"
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Reason Section */}
      <div className="mt-2 mb-6">
        <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wide">
          REASON
        </p>
        <p className="text-sm text-gray-700 leading-snug">
          {event.reason ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-3">
        <button
          onClick={onClose}
          className="text-gray-500 font-semibold text-sm hover:text-gray-700"
        >
          CANCEL
        </button>
        <button className="text-blue-600 font-semibold text-sm hover:underline">
          RESCHEDULE
        </button>
      </div>
    </div>
  );
};

export default Popup;
