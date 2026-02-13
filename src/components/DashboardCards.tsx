import React, { useState } from "react";
import { Avatar, CardContent, Button } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import Title from "./Title";
import {
  appointmentRequests,
  yearlySummary,
  todayAppointments,
} from "../utils/DashboardCardsConstants";

const DashboardCards: React.FC = () => {
  const [accepted, setAccepted] = useState<{ [key: number]: boolean }>({});
  const [rejected, setRejected] = useState<{ [key: number]: boolean }>({});

  const handleAcceptToggle = (index: number) => {
    setAccepted((prev) => ({ ...prev, [index]: !prev[index] }));
    setRejected((prev) => ({ ...prev, [index]: false }));
  };

  const handleRejectToggle = (index: number) => {
    setRejected((prev) => ({ ...prev, [index]: !prev[index] }));
    setAccepted((prev) => ({ ...prev, [index]: false }));
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0].charAt(0).toUpperCase()
      : (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const getColorForName = (name: string) => {
    const colors = ["#C1EAC5", "#C1EAE8", "#C1CCEA", "#FBE9AE", "#e1919cff", "#D9C1EA", "#C1EAE8"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 w-full">
      {/* Appointment Requests */}
      <div className="flex flex-col flex-1 gap-[4px]">
        <div className=" flex items-center justify-between px-[6px] opacity-100 mb-0.5">
          <Title text="Appointment Requests" />
          <Button
            disableRipple
            className="!w-[40px] !h-[40px] !min-w-0 !p-0 !mb-2 !bg-white !rounded-full flex items-center justify-center shadow hover:!bg-gray-200"
          >
            <img
              src="/images/fi_arrow-up-right.svg"
              alt="arrow icon"
              className="w-[22px] h-[22px]"
            />
          </Button>
        </div>

         

        <CardContent className="flex flex-col mb-4 gap-[9px] p-0 rounded-[10px] bg-white shadow-sm flex-1">
          {appointmentRequests.map((p: any, i: number) => (
            <div
              key={i}
              className=" rounded-[16px] flex items-center justify-between gap-[16px] p-[10px_12px] bg-gray-50 hover:shadow transition"
            >
              <div className="flex items-center gap-3">
                {p.img ? (
                  <Avatar src={p.img} alt={p.name} />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: getColorForName(p.name),
                      color: "gray",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {getInitials(p.name)}
                  </Avatar>
                )}
                <div>
                  <h4 className="font-medium">{p.name}</h4>
                  <p className="text-xs text-gray-500">
                    {p.age}y • {p.gender} • {p.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="small"
                  onClick={() => handleAcceptToggle(i)}
                  className={`!min-w-0 !p-2 !rounded-md !w-8 !h-8 flex items-center justify-center border transition ${
                    accepted[i]
                      ? "!bg-green-400 !text-white !border-green-600"
                      : "!bg-gray-100 !text-gray-500 !border-gray-300"
                  }`}
                >
                  <Check fontSize="small" />
                </Button>
                <Button
                  size="small"
                  onClick={() => handleRejectToggle(i)}
                  className={`!min-w-0 !p-2 !rounded-md !w-8 !h-8 flex items-center justify-center border transition ${
                    rejected[i]
                      ? "!bg-red-400 !text-white !border-red-600"
                      : "!bg-gray-100 !text-gray-500 !border-gray-300"
                  }`}
                >
                  <Close fontSize="small" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </div>

      {/* Yearly Summary */}
      <div className="flex flex-col flex-1 ">
        <div className=" flex items-center px-[4px] py-[4px] pt-4 mb-4 h-[40px]">
          <Title text="Yearly Summary" />
        </div>

        <CardContent className="flex flex-col gap-[8px] mb-4 bg-white rounded-[10px] shadow-sm flex-1">
          {yearlySummary.map((item: any, i: number) => (
            <div
              key={i}
              className="rounded-[16px] flex items-center gap-[36px] p-[27px_24px] bg-gray-50 hover:shadow transition"
            >
              <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center`}>
                {item.icon}
              </div>

              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">{item.count}</h3>
                <p className="text-lg text-gray-400 font-medium">{item.title}</p>
                <div className="flex flex-row gap-3">
                  <p className="text-xs text-green-400 font-bold">{item.change}</p>
                  <p className="text-xs text-gray-400">{item.change1}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </div>

      {/* Today's Appointments */}
      <div className="flex flex-col flex-1">
        <div className=" flex items-center justify-between px-[6px] py-[4px] mb-0.5">
          <Title text="Today's Appointment" />
          <Button
            size="small"
            className="!w-[40px] !h-[40px] !min-w-0 !p-0 !mb-2 !bg-white !rounded-full flex items-center justify-center shadow hover:!bg-gray-200"
          >
            <img
              src="/images/fi_arrow-up-right.svg"
              alt="arrow Icon"
              className="w-[22px] h-[22px]"
            />
          </Button>
        </div>

        <CardContent className="flex flex-col gap-[9px] mb-4 p-0 bg-white rounded-[10px] shadow-sm flex-1">
          {todayAppointments.map((p: any, i: number) => (
            <div
              key={i}
              className="rounded-[16px] flex items-center justify-between gap-[16px] p-[10px_12px] bg-gray-50 hover:shadow transition"
            >
              <div className="flex items-center gap-3">
                {p.img ? (
                  <Avatar src={p.img} alt={p.name} />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: getColorForName(p.name),
                      color: "gray",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {getInitials(p.name)}
                  </Avatar>
                )}
                <div>
                  <h4 className="font-medium">{p.name}</h4>
                  <p className="text-xs text-gray-500">{p.clinic}</p>
                </div>
              </div>

              <p
                className={`text-xs ${
                  p.ongoing ? "text-blue-600 font-semibold" : "text-gray-500"
                }`}
              >
                {p.time}
              </p>
            </div>
          ))}
        </CardContent>
      </div>
    </div>
  );
};

export default DashboardCards;
