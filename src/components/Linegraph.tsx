
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Title from "./Title";
import TimeFilter from "./Monthlydropdown";
import {
  monthlyData,
  quarterlyData,
  halfYearlyData,
  yearlyData,
  customData,
} from "../utils/LinegraphConstants";

const LineGraph: React.FC = () => {
  const [filter, setFilter] = useState("Monthly");

  const getData = () => {
    switch (filter) {
      case "Quarterly":
        return quarterlyData;
      case "Half-Yearly":
        return halfYearlyData;
      case "Yearly":
        return yearlyData;
      case "custom":
        return customData;
      default:
        return monthlyData;
    }
  };

  const renderLegend = () => (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pb-4 sm:pb-8 bg-transparent">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-md bg-blue-400"></span>
        <span className="text-sm text-gray-700">Consultations</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-md bg-yellow-400"></span>
        <span className="text-sm text-gray-700">Patients</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-md bg-purple-400"></span>
        <span className="text-sm text-gray-700">New Patients</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col sm:px-6  min-h-screen">
      {/* Header: Title + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-0 mb-4 ">
        <div className="flex-1">
          <Title
            text="Patient Statistics"
            subtitle="View your patient data over different time periods"
          />
        </div>
        <div className="w-full sm:w-[179px] mt-2 sm:mt-0">
          <TimeFilter value={filter} onChange={setFilter} />
        </div>
      </div>

      {/* Chart */}
      <div className="  min-h-screen h-[250px] sm:h-[350px] md:h-[450px]  bg-white rounded-lg p-2 sm:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getData()}
            margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
          >
             <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" />
            <YAxis ticks={[0, 10, 20, 30, 40, 50,  60, 70,  80, 90, 100]} domain={[0, 100]}
            tickFormatter={(value) => (value % 20 === 0 ? value : "")}
            tick = {{ fontSize:12}}
            
            />
            <Tooltip />
            <Legend
              content={renderLegend}
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
              }}
            />
            <Line
              type="monotone"
              dataKey="Consultations"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
            <Line
              type="monotone"
              dataKey="Patients"
              stroke="#FBBF24"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
            <Line
              type="monotone"
              dataKey="NewPatients"
              stroke="#C084FC"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineGraph;
