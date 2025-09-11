import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedNurse, setSelectedNurse] = useState<string>("");

  const hospitals = ["Hospital 1", "Hospital 2", "Hospital 3", "Hospital 4","Hospital 5"];

  const doctors: Record<string, string[]> = {
    "Hospital 1": ["Doctor 1"],
    "Hospital 2": ["Doctor 1", "Doctor 2", "Doctor 3"],
    "Hospital 3": ["Doctor 1", "Doctor 2", "Doctor 3", "Doctor 4", "Doctor 5"],
    "Hospital 4": ["Doctor 1"], 
    "Hospital 5": ["Doctor 1"], 
  };

  const nurses: Record<string, string[]> = {
    "Doctor 1": ["Nurse 1", "Nurse 2", "Nurse 3"],
    "Doctor 2": ["Nurse 1"],
    "Doctor 3": ["Nurse 1"],
    "Doctor 4": ["Nurse 1", "Nurse 2", "Nurse 3"],
    "Doctor 5": ["Nurse 1"],
  };

  const [openHospital, setOpenHospital] = useState(false);
  const [openDoctor, setOpenDoctor] = useState(false);
  const [openNurse, setOpenNurse] = useState(false);

  //  hospital selection with if condition
  const handleHospitalSelect = (hospital: string) => {
    setSelectedHospital(hospital);
    setSelectedDoctor("");
    setSelectedNurse("");
    setOpenHospital(false);

    const doctorList = doctors[hospital] || [];

    // if only one doctor → auto-select
    if (doctorList.length === 1) {
      const singleDoctor = doctorList[0];
      setSelectedDoctor(singleDoctor);

      //  if nurse is one 
      const nurseList = nurses[singleDoctor] || [];
      if (nurseList.length === 1) {
        setSelectedNurse(nurseList[0]);
        setOpenNurse(false);
      }
    }
  };

  //  doctor selection
  const handleDoctorSelect = (doctor: string) => {
    setSelectedDoctor(doctor);
    const nurseList = nurses[doctor] || [];

    // one nurse
    if (nurseList.length === 1) {
      setSelectedNurse(nurseList[0]);
      setOpenNurse(false);
    } else {
      setSelectedNurse("");
      setOpenNurse(false);
    }
    setOpenDoctor(false);
  };

  const doctorList = selectedHospital ? doctors[selectedHospital] || [] : [];

  return (
    <div className="flex gap-2 mb-5">
      {/* Hospital Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setOpenHospital(!openHospital);
            setOpenDoctor(false);
            setOpenNurse(false);
          }}
          className="border rounded-lg w-39 py-0.3 px-1 flex text-sm justify-between items-center focus:ring-2 focus:ring-[rgb(0,109,111)]"
        >
          <span className="mr-4">{selectedHospital || "Select Hospital"}</span>
          <FaChevronDown
            size={12}
            className={`transition-transform duration-300 ${
              openHospital ? "rotate-180" : ""
            }`}
          />
        </button>

        {openHospital && (
          <div className="absolute mt-1 w-40 text-sm bg-white border rounded-lg shadow-lg z-10">
            {hospitals.map((hospital) => (
              <div
                key={hospital}
                onClick={() => handleHospitalSelect(hospital)}
                className="cursor-pointer hover:bg-[rgb(0,109,111)] hover:text-white px-3 py-2"
              >
                {hospital}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Dropdown or Direct Display */}
      {selectedHospital &&
        (doctorList.length > 1 ? (
          <div className="relative">
            <button
              onClick={() => {
                setOpenDoctor(!openDoctor);
                setOpenNurse(false);
              }}
              className="border rounded-lg w-39 py-0.3 px-1 text-sm flex justify-between items-center text-left focus:ring-2 focus:ring-[rgb(0,109,111)]"
            >
              <span className="mr-4">{selectedDoctor || "Select Doctor"}</span>
              <FaChevronDown
                size={12}
                className={`transition-transform duration-300 ${
                  openDoctor ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDoctor && (
              <div className="absolute mt-1 w-40 text-sm bg-white border rounded-lg shadow-lg z-10">
                {doctorList.map((doctor) => (
                  <div
                    key={doctor}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="cursor-pointer hover:bg-[rgb(0,109,111)] hover:text-white px-3 py-2"
                  >
                    {doctor}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // doctor name 
          selectedDoctor && (
            <div className="border rounded-lg w-39 py-0.3 px-1 text-sm flex items-center">
              {selectedDoctor}
            </div>
          )
        ))}

      {/* Nurse Dropdown */}
      {selectedDoctor && nurses[selectedDoctor]?.length > 1 && (
        <div className="relative">
          <button
            onClick={() => setOpenNurse(!openNurse)}
            className="border rounded-lg w-39 py-0.3 px-1 text-sm flex justify-between items-center text-left focus:ring-2 focus:ring-[rgb(0,109,111)]"
          >
            <span className="mr-4">{selectedNurse || "Select Nurse"}</span>
            <FaChevronDown
              size={12}
              className={`transition-transform duration-300 ${
                openNurse ? "rotate-180" : ""
              }`}
            />
          </button>

          {openNurse && (
            <div className="absolute mt-1 w-40 text-sm bg-white border rounded-lg shadow-lg z-10">
              {nurses[selectedDoctor]?.map((nurse) => (
                <div
                  key={nurse}
                  onClick={() => {
                    setSelectedNurse(nurse);
                    setOpenNurse(false);
                  }}
                  className="cursor-pointer hover:bg-[rgb(0,109,111)] hover:text-white px-3 py-2"
                >
                  {nurse}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Show nurse directly if only one */}
      {selectedDoctor && nurses[selectedDoctor]?.length === 1 && (
        <div className="border rounded-lg w-39 py-0.3 px-1 text-sm flex items-center">
          {selectedNurse}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
