import React, { useState } from "react";
import { FaChevronDown} from "react-icons/fa";
import Searchbar from "./Searchbar";

const Dropdown: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedNurse, setSelectedNurse] = useState<string>("");

  const hospitals = ["Hospital 1", "Hospital 2", "Hospital 3", "Hospital 4", "Hospital 5"];

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

  // Search states
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [nurseSearch, setNurseSearch] = useState("");

  // Filtered Lists
  const filteredHospitals = hospitals.filter((h) =>
    h.toLowerCase().includes(hospitalSearch.toLowerCase())
  );
  const doctorList = selectedHospital ? doctors[selectedHospital] || [] : [];
  const filteredDoctors = doctorList.filter((d) =>
    d.toLowerCase().includes(doctorSearch.toLowerCase())
  );
  const nurseList = selectedDoctor ? nurses[selectedDoctor] || [] : [];
  const filteredNurses = nurseList.filter((n) =>
    n.toLowerCase().includes(nurseSearch.toLowerCase())
  );

  // Hospital selection logic
  const handleHospitalSelect = (hospital: string) => {
    setSelectedHospital(hospital);
    setSelectedDoctor("");
    setSelectedNurse("");
    setOpenHospital(false);
    setHospitalSearch("");

    const doctorList = doctors[hospital] || [];
    if (doctorList.length === 1) {
      const singleDoctor = doctorList[0];
      setSelectedDoctor(singleDoctor);

      const nurseList = nurses[singleDoctor] || [];
      if (nurseList.length === 1) {
        setSelectedNurse(nurseList[0]);
        setOpenNurse(false);
      }
    }
  };

  // Doctor selection logic
  const handleDoctorSelect = (doctor: string) => {
    setSelectedDoctor(doctor);
    setDoctorSearch("");
    const nurseList = nurses[doctor] || [];

    if (nurseList.length === 1) {
      setSelectedNurse(nurseList[0]);
      setOpenNurse(false);
    } else {
      setSelectedNurse("");
      setOpenNurse(false);
    }
    setOpenDoctor(false);
  };

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
          <span>{selectedHospital || "Select Hospital"}</span>
          <FaChevronDown
            size={12}
            className={`transition-transform duration-300 ${openHospital ? "rotate-180" : ""}`}
          />
        </button>

        {openHospital && (
          <div className="absolute mt-1 w-50 text-sm bg-white border rounded-lg  z-10">
            {/* Searchbar with icon */}
            <div className="flex items-center px-2 py-1">
              {/* <FaSearch className="text-gray-400 mr-2" size={12} /> */}
              <Searchbar
                placeholder="Search Hospital..."
                value={hospitalSearch}
                onChange={setHospitalSearch}
              />
            </div>

            {filteredHospitals.map((hospital) => (
              <div
                key={hospital}
                onClick={() => handleHospitalSelect(hospital)}
                className="cursor-pointer hover:bg-[rgb(0,109,111)] hover:text-white px-3 py-2"
              >
                {hospital}
              </div>
            ))}
            {filteredHospitals.length === 0 && (
              <div className="px-3 py-2 text-gray-400">No results</div>
            )}
          </div>
        )}
      </div>

      {/* Doctor Dropdown */}
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
              <span>{selectedDoctor || "Select Doctor"}</span>
              <FaChevronDown
                size={12}
                className={`transition-transform duration-300 ${openDoctor ? "rotate-180" : ""}`}
              />
            </button>

            {openDoctor && (
              <div className="absolute mt-1 w-50 text-sm bg-white border rounded-lg shadow-lg z-10">
                {/*Searchbar  */}
                <div className="flex items-center px-2 py-1">
                  {/* <FaSearch className="text-gray-400 mr-2" size={12} /> */}
                  <Searchbar
                    placeholder="Search Doctor..."
                    value={doctorSearch}
                    onChange={setDoctorSearch}
                  />
                </div>

                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="cursor-pointer hover:bg-[rgb(0,109,111)] hover:text-white px-3 py-2"
                  >
                    {doctor}
                  </div>
                ))}
                {filteredDoctors.length === 0 && (
                  <div className="px-3 py-2 text-gray-400">No results</div>
                )}
              </div>
            )}
          </div>
        ) : (
          selectedDoctor && (
            <div className="border rounded-lg w-39 py-0.3 px-1 text-sm flex items-center">
              {selectedDoctor}
            </div>
          )
        ))}

      {/* Nurse Dropdown */}
      {selectedDoctor && nurseList.length > 1 && (
        <div className="relative">
          <button
            onClick={() => setOpenNurse(!openNurse)}
            className="border rounded-lg w-50 py-0.3 px-1 text-sm flex justify-between items-center text-left focus:ring-2 focus:ring-[rgb(0,109,111)]"
          >
            <span>{selectedNurse || "Select Nurse"}</span>
            <FaChevronDown
              size={12}
              className={`transition-transform duration-300 ${openNurse ? "rotate-180" : ""}`}
            />
          </button>

          {openNurse && (
            <div className="absolute mt-1 w-50 text-sm bg-white border rounded-lg shadow-lg z-10">
              {/* Searchbar with icon */}
              <div className="flex items-center">
                {/* <FaSearch className="text-gray-400 mr-2" size={12} /> */}
                <Searchbar
                  placeholder="Search Nurse..."
                  value={nurseSearch}
                  onChange={setNurseSearch}
                />
              </div>

              {filteredNurses.map((nurse) => (
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
              {filteredNurses.length === 0 && (
                <div className="px-3 py-2 text-gray-400">No results</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Show nurse directly if only one */}
      {selectedDoctor && nurseList.length === 1 && (
        <div className="border rounded-lg w-39 py-0.3 px-1 text-sm flex items-center">
          {selectedNurse}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
