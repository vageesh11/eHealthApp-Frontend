
// import React, { useState, useEffect } from "react";

// interface PopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: { title: string; location?: string; time: string }) => void;
//   selectedTime: string;
//   selectedDate: Date | null;
// }

// const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSave, selectedTime, selectedDate }) => {
//   const [title, setTitle] = useState("");
//   const [location, setLocation] = useState("");
//   const [time, setTime] = useState(selectedTime || "");

//   useEffect(() => {
//     setTime(selectedTime || "");
//   }, [selectedTime]);

//   if (!isOpen) return null;

//   const handleSave = () => {
//     if (!title.trim()) {
//       alert("Please enter a title");
//       return;
//     }

//     onSave({ title, location, time });
//     setTitle("");
//     setLocation("");
//     setTime("");
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white rounded-xl shadow-lg p-6 w-80">
//         <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Event</h2>

//         {selectedDate && (
//           <p className="text-sm text-gray-600 mb-2">
//             {selectedDate.toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         )}

//         <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Event title"
//           className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
//         />

//         <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           placeholder="Location (optional)"
//           className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
//         />

//         <label className="block text-sm font-medium text-gray-700 mb-1">Time (24-hour)</label>
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
//         />

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;


import React, { useState, useEffect } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; location?: string; time: string }) => void;
  selectedTime: string;
  selectedDate: Date | null;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSave, selectedTime, selectedDate }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState(selectedTime || "");

  useEffect(() => {
    setTime(selectedTime || "");
  }, [selectedTime]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    onSave({ title, location, time });
    setTitle("");
    setLocation("");
    setTime("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Event</h2>

        {selectedDate && (
          <p className="text-sm text-gray-600 mb-2">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Time (24-hour)</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
