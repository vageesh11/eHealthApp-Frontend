import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import Dropdown from "./Dropdown";
import Calendar from "./Calendar";

import {BAR_GRAPH_DATA,BAR_LEGEND,Y_AXIS_TICKS,Y_AXIS_DOMAIN,} from "../utils/BargraphConstants";

const Bargraph = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <Title text="Financial Overview" />
        <div className="flex items-center gap-4">
          <Dropdown />
          <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate}/>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-black-500 text-sm mb-4 text-center">
        Monthly Revenue, Expenses, and Profits
      </p>

      {/* Custom Legend */}
      <div className="flex justify-center gap-6 mb-4 text-sm font-medium">
        {BAR_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-12 h-3 rounded"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={BAR_GRAPH_DATA} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={Y_AXIS_DOMAIN}
            ticks={Y_AXIS_TICKS}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip formatter={(value) => `$${value}`} />
          {BAR_LEGEND.map((item) => (
            <Bar
              key={item.label}
              dataKey={item.label === "Revenue Growth" ? "revenue" : item.label.toLowerCase()}
              fill={item.color}
              radius={[6, 6, 0, 0]}
              isAnimationActive={true}
              animationDuration={item.label === "Revenue Growth" ? 1200 : item.label === "Expenses" ? 1400 : 1600}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bargraph;

