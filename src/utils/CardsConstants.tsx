import { FaCalendarAlt, FaStethoscope, FaUserPlus, FaChartLine } from "react-icons/fa";

export const cardStats = [
  {
    title: "Appointments",
    value: 254,
    icon: <img
          src="/images/fi_calendar (1).svg"
          alt="Calendar Icon"
          className="w-6 h-6"
        />,
    bgColor: "#7A6EFE",
    iconBg: "rgba(69, 68, 68, 0.2)",
  },
  {
    title: "Consultations",
    value: 228,
    icon: <img
          src="/images/stethoscope.svg"
          alt="stethoscope Icon"
          className="w-6 h-6"
        />,
    bgColor: "#4894FF",
    iconBg: "rgba(43, 43, 43, 0.2)",
  },
  {
    title: "New Patients",
    value: 105,
    icon: <img
          src="/images/fi_user (1).svg"
          alt="user Icon"
          className="w-6 h-6"
        />,
    bgColor: "#FF8645",
    iconBg: "rgba(59, 58, 57, 0.2)",
  },
  {
    title: "Avg per Day",
    value: 12,
    icon: <img
          src="/images/ChartLine.svg"
          alt="Chart Icon"
          className="w-6 h-6"
        />,
    bgColor: "#69C350",
    iconBg: "rgba(52, 54, 52, 0.2)",
  },
];
