import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Checkbox,
} from "@mui/material";
import Searchbar from "./Searchbar";
import Calendar from "./Calendar";

interface Patient {
  id: string;
  patient: string;
  status: "NEW" | "ACTIVE" | "INACTIVE";
  condition: string;
  lastVisit: string;
  phone: string;
  email: string;
}

const getAvatarColor = (index: number) => {
  const colors = [
    "bg-[#CFE8FC] text-[#1463B2]",
    "bg-[#FDE2E4] text-[#C03221]",
    "bg-[#E8EAF6] text-[#3949AB]",
    "bg-[#D0F4DE] text-[#2E7D32]",
    "bg-[#FFF3CD] text-[#A67C00]",
    "bg-[#E1F5FE] text-[#0277BD]",
    "bg-[#FAE0FF] text-[#78008FBF]",
    "bg-[#DDF4CC] text-[#317000BF]",
    "bg-[#EFEFEF] text-[#757575BF]",
  ];
  return colors[index % colors.length];
};

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

const PatientTable: React.FC = () => {
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchCondition, setSearchCondition] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  const patients: Patient[] = [
    { id: "PID158057", patient: "Sarah Johnson", status: "NEW", condition: "Heart Disease", lastVisit: "2025-08-15", phone: "+1 (155) 123-456", email: "sarah.johnson@email.com" },
  { id: "PID158058", patient: "Michael Chen", status: "NEW", condition: "Hypertension", lastVisit: "2025-07-10", phone: "+1 (155) 123-234", email: "michael.chen@email.com" },
  { id: "PID158059", patient: "Emily Davis", status: "INACTIVE", condition: "Diabetes Type 2", lastVisit: "2025-08-20", phone: "+1 (155) 123-432", email: "emily.davis@email.com" },
  { id: "PID158060", patient: "James Wilson", status: "ACTIVE", condition: "Migraine", lastVisit: "2025-06-10", phone: "+1 (155) 123-456", email: "james.wilson@email.com" },
  { id: "PID158061", patient: "Lisa Anderson", status: "ACTIVE", condition: "Heart Disease", lastVisit: "2025-08-25", phone: "+1 (155) 123-789", email: "lisa.anderson@email.com" },
  { id: "PID158062", patient: "Michael Jhonson", status: "ACTIVE", condition: "Heart Disease", lastVisit: "2025-07-15", phone: "+1 (155) 123-890", email: "michael.jhonson@email.com" },
  { id: "PID158063", patient: "Chen Michael", status: "ACTIVE", condition: "Heart Disease", lastVisit: "2025-06-15", phone: "+1 (155) 123-567", email: "chen.michael@email.com" },
  { id: "PID158064", patient: "Jhonson", status: "INACTIVE", condition: "Migraine", lastVisit: "2025-05-15", phone: "+1 (155) 123-456", email: "jhonson.anderson@email.com" },
  { id: "PID158065", patient: "Sarah Anderson", status: "ACTIVE", condition: "Heart Disease", lastVisit: "2025-05-25", phone: "+1 (155) 123-765", email: "sarah.anderson@email.com" },
  { id: "PID158066", patient: "Lisa Jhonson", status: "ACTIVE", condition: "Diabetes Type 2", lastVisit: "2025-05-10", phone: "+1 (155) 123-678", email: "lisa.jhonson@email.com" },
  ];

  const filteredPatients = patients.filter((p) => {
    const matchesId = p.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesName = p.patient.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = p.status.toLowerCase().includes(searchStatus.toLowerCase());
    const matchesCondition = p.condition.toLowerCase().includes(searchCondition.toLowerCase());
    const matchesPhone = p.phone.toLowerCase().includes(searchPhone.toLowerCase());
    const matchesEmail = p.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesDate = !selectedDate || p.lastVisit === selectedDate;

    return matchesId && matchesName && matchesStatus && matchesCondition && matchesPhone && matchesEmail && matchesDate;
  });

  const handleSelect = (id: string) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedPatients(filteredPatients.map((p) => p.id));
    else setSelectedPatients([]);
  };

  const allSelected = filteredPatients.length > 0 && filteredPatients.every((p) => selectedPatients.includes(p.id));

  const highlightNames = ["Sarah Johnson", "Michael Chen", "Emily Davis", "James Wilson", "Lisa Anderson"];

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md mx-auto overflow-hidden">
      <TableContainer component={Paper} className="rounded-lg border border-gray-200">
        <Table className="[&_th]:border [&_td]:border [&_th]:border-gray-200 [&_td]:border-gray-200">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox checked={allSelected} onChange={handleSelectAll} color="primary" />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>

            {/* Search Row */}
            <TableRow className="bg-white">
              <TableCell padding="checkbox"></TableCell>
              <TableCell><Searchbar placeholder="Search ID..." value={searchId} onChange={setSearchId} /></TableCell>
              <TableCell><Searchbar placeholder="Search name..." value={searchName} onChange={setSearchName} /></TableCell>
              <TableCell><Searchbar placeholder="Search status..." value={searchStatus} onChange={setSearchStatus} /></TableCell>
              <TableCell><Searchbar placeholder="Search condition..." value={searchCondition} onChange={setSearchCondition} /></TableCell>
              <TableCell>
                <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
              </TableCell>
              <TableCell><Searchbar placeholder="Search phone..." value={searchPhone} onChange={setSearchPhone} /></TableCell>
              <TableCell><Searchbar placeholder="Search email..." value={searchEmail} onChange={setSearchEmail} /></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredPatients.map((row, index) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedPatients.includes(row.id)} onChange={() => handleSelect(row.id)} color="primary" />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-sm ${getAvatarColor(index)}`}>
                      {getInitials(row.patient)}
                    </div>
                    <span className={`font-medium ${highlightNames.includes(row.patient) ? "text-[#168BD9]" : "text-gray-800"}`}>
                      {row.patient}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor: row.status === "NEW" ? "#FAE0FF" : row.status === "ACTIVE" ? "#DDF4CC" : "#EFEFEF",
                      color: row.status === "NEW" ? "#78008FBF" : row.status === "ACTIVE" ? "#317000BF" : "#757575BF",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      borderRadius: "9999px",
                      px: 1.5,
                    }}
                  />
                </TableCell>

                <TableCell>{row.condition}</TableCell>
                <TableCell>{new Date(row.lastVisit).toLocaleDateString("en-GB")}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <a href={`mailto:${row.email}`} className="text-[#5C8DF6] underline hover:text-[#3F6BE0]">
                    {row.email}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientTable;

