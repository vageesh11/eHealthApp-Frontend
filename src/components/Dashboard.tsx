import React from "react";
import { Avatar, Card, CardContent, Button } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { FaUserAlt, FaUserPlus, FaStethoscope } from "react-icons/fa";
import Title from "./Title";

const Dashboard: React.FC = () => {
  const appointmentRequests = [
    { name: "Olivia John", age: 23, gender: "Female", date: "12 Sep 7:32 AM", img: "/images/Ellipse 1.png" },
    { name: "Soren", age: 24, gender: "Male", date: "12 Sep 7:32 AM", img: "/images/Ellipse 2.png" },
    { name: "Emma", age: 21, gender: "Female", date: "12 Sep 7:32 AM", img: "/images/Ellipse 3.png" },
    { name: "James Doe", age: 23, gender: "Male", date: "12 Sep 7:32 AM", img: "" },
    { name: "Zara", age: 21, gender: "Female", date: "12 Sep 7:32 AM", img: "/images/Ellipse 4.png" },
    { name: "Isabella", age: 23, gender: "Female", date: "12 Sep 7:32 AM", img: "" },
  ];

  const yearlySummary = [
    {
      icon: <img
        src="/images/fi_user.png"
        alt="Patient Icon"
        className="w-6 h-6" />,
      iconBg: "bg-blue-300",
      title: "Total Patients",
      count: 465,
      change: "+5.2%",
      change1: "from last period",
    },
    {
      icon: <img
        src="/images/fi_user.png"
        alt="Patient Icon"
        className="w-6 h-6" />,
      iconBg: "bg-orange-300",
      title: "New Patients",
      count: 227,
      change: "+12.1%",
      change1: "from last period",
    },
    {
      icon: <img
        src="/images/fi_user.png"
        alt="Patient Icon"
        className="w-6 h-6" />,
      iconBg: "bg-purple-300",
      title: "Consultations",
      count: 772,
      change: "+8.3% ",
      change1: "from last period",
    },
  ];

  const todayAppointments = [
    { name: "Michael", time: "Ongoing", ongoing: true, img: "", clinic: "Clinic Consulting" },
    { name: "David", time: "10:30", img: "/images/Ellipse 5.png", clinic: "Clinic Consulting" },
    { name: "Orion", time: "11:00", img: "", clinic: "Clinic Consulting" },
    { name: "Juniper", time: "11:30", img: "", clinic: "Clinic Consulting" },
    { name: "Robert", time: "12:00", img: "/images/Ellipse 5.png", clinic: "Clinic Consulting" },
    { name: "Alexander", time: "12:30", img: "", clinic: "Clinic Consulting" },
  ];

  // Function to get initials (handles one or two words)
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0].charAt(0).toUpperCase()
      : (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  // Function to assign a consistent color for initials
  const getColorForName = (name: string) => {
    const colors = [
      "#C1EAC5", 
      "#C1EAE8", 
      "#C1CCEA", 
      "#FBE9AE", 
      "#e1919cff", 
      "#D9C1EA", 
      "#C1EAE8", 

    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between bg-white rounded-2xl shadow-md w-full p-4 lg:p-6 gap-6">

      {/* Appointment Requests */}
      <Card className="rounded-[16px] shadow-sm w-full lg:w-1/3">
        <div className="p-[10px] flex flex-col gap-[6px]">
          <Title text="Appointment Requests" />
          <CardContent className="flex flex-col gap-[3px] p-0">
            {appointmentRequests.map((p, i) => (
              <div
                key={i}
                className="w-[341px] h-[60px]  rounded-[16px] flex items-center justify-between gap-[16px] pt-[10px] pr-[12px] pb-[10px] pl-[12px] bg-gray-50 hover:shadow transition"
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
                {/* <div className="flex ">
                  <Button size="small" className="!text-green-500 min-w-0 p-1 rounded-lg">
                    <CheckCircle fontSize="small" />
                  </Button>
                  <Button size="small" className="!text-gray-400 min-w-0 p-1 rounded-lg">
                    <Cancel fontSize="small" />
                  </Button>
                </div> */}
              </div>
            ))}
          </CardContent>
        </div>
      </Card>

      {/* Yearly Summary */}
      <Card className="rounded-2xl shadow-sm w-full lg:w-1/3">
        <div className="p-4">
          <Title text="Yearly Summary" />
          <CardContent className="flex flex-col gap-[12px] p-0">
            {yearlySummary.map((item, i) => (
              <div
                key={i}
                className="w-[341px] h-[121px] rounded-[16px] flex items-center gap-[36px] pt-[27px] pr-[24px] pb-[27px] pl-[24px] bg-gray-50 hover:shadow transition"
              >
                <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold">{item.count}</h3>
                  <p className="text-lg text-gray-400 font-medium">{item.title}</p>
                  <div className="flex flex-row gap-3">
                  <p className="text-xs text-green-600">{item.change}</p>
                  <p className="text-xs text-gray-400">{item.change1}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

        </div>
      </Card>

      {/* Today's Appointments */}
      <Card className="rounded-[16px] shadow-sm w-full lg:w-1/3">
        <div className="p-[10px] flex flex-col gap-[6px]">
          <Title text="Today's Appointment" />
          <CardContent className="flex flex-col gap-[6px] p-0">
            {todayAppointments.map((p, i) => (
              <div
                key={i}
                className="w-[341px] h-[60px] rounded-[16px] flex items-center justify-between gap-[16px] pt-[10px] pr-[12px] pb-[10px] pl-[12px] bg-gray-50 hover:shadow transition"
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
                  className={`text-xs ${p.ongoing ? "text-blue-600 font-semibold" : "text-gray-500"
                    }`}
                >
                  {p.time}
                </p>
              </div>
            ))}
          </CardContent>
        </div>
      </Card>

    </div>
  );
};

export default Dashboard;
