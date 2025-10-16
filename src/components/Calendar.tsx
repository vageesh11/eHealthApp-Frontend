
//only for icon calender
import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <div className="flex items-center  border border-gray-300 px-2 py-1 rounded-md w-full max-w-[120px] bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-400 transition">
      {/* Calendar Icon */}
      <label className="cursor-pointer flex items-center gap-1 text-gray-500">
        <FaRegCalendarAlt className="text-xs" />

        {/* Hidden Date Input */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="absolute opacity-0 cursor-pointer w-6"
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

//it was selecting date
// import React, { useState } from "react";
// import { FaRegCalendarAlt } from "react-icons/fa";

// interface CalendarProps {
//   selectedDate?: string;
//   onChange?: (date: string) => void;
// }

// const Calendar: React.FC<CalendarProps> = ({
//   selectedDate: controlledDate,
//   onChange,
// }) => {
//   // Use internal state if not controlled
//   const [internalDate, setInternalDate] = useState<string>("");

//   const dateValue = controlledDate ?? internalDate;

//   const handleChange = (value: string) => {
//     if (onChange) {
//       onChange(value);
//     } else {
//       setInternalDate(value);
//     }
//   };

//   return (
//     <div className="flex items-center border border-gray-300 px-2 py-1 rounded-md w-full max-w-[120px] bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-400 transition">
//       <label className="cursor-pointer flex items-center gap-1 text-gray-500 w-full">
//         <FaRegCalendarAlt className="text-xs" />
//         <input
//           type="date"
//           value={dateValue}
//           onChange={(e) => handleChange(e.target.value)}
//           className="w-full text-xs outline-none bg-transparent cursor-pointer"
//         />
//       </label>
//     </div>
//   );
// };

// export default Calendar;
