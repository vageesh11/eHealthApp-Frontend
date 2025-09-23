import React from "react";
import CalenderM from "../components/CalenderM";

const Appointment: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <CalenderM />
      <div className="mt-4">
        <h1 className="text-xl font-bold">Appointments</h1>
      </div>
    </div>
  );
};

export default Appointment;
