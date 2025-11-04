import React, { useEffect } from "react";
import CalendarM from "../components/CalendarM";

const Appointment: React.FC = () => {
  useEffect(() => {
    // Disable scrollbar when entering Appointment page
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Re-enable when leaving the page
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);


  return (
    <div className="appointment-page min-h-screen bg-gray-100 overflow-hidden">
      <CalendarM />
      {/* <div className="mt-4">
        <h1 className="text-xl font-bold">Appointments</h1>
      </div> */}
    </div>
  );
};

export default Appointment;
