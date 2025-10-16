import { FaCalendarAlt, FaStethoscope, FaUserPlus, FaChartLine } from "react-icons/fa";

export const cardStats = [
  {
    title: "Appointments",
    value: 254,
    icon: <FaCalendarAlt size={24} />,
    bgColor: "#7A6EFE",
    iconBg: "rgba(69, 68, 68, 0.2)",
  },
  {
    title: "Consultations",
    value: 228,
    icon: <FaStethoscope size={24} />,
    bgColor: "#4894FF",
    iconBg: "rgba(43, 43, 43, 0.2)",
  },
  {
    title: "New Patients",
    value: 105,
    icon: <FaUserPlus size={24} />,
    bgColor: "#FF8645",
    iconBg: "rgba(59, 58, 57, 0.2)",
  },
  {
    title: "Avg per Day",
    value: 12,
    icon: <FaChartLine size={24} />,
    bgColor: "#69C350",
    iconBg: "rgba(52, 54, 52, 0.2)",
  },
];
