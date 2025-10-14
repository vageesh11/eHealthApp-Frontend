import React from "react";
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
import Dropdown from  "./Dropdown";
import Calendar from "./Calendar";

const data = [
  { name: "Jan", revenue: 500, expenses: 350, profits: 50 },
  { name: "Feb", revenue: 700, expenses: 550, profits: 100 },
  { name: "Mar", revenue: 800, expenses: 720, profits: 120 },
  { name: "Apr", revenue: 900, expenses: 800, profits: 220 },
  { name: "May", revenue: 1050, expenses: 950, profits: 260 },
  { name: "Jun", revenue: 1300, expenses: 1150, profits: 400 },
];

const Bargraph = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto">
      
      <div className='flex justify-between items-center'>
      <Title text="Financial Overview" />
      <div className='flex items-center gap-4'>
        <Dropdown />
       <Calendar />
      </div>
      </div>
      {/* Subtitle */}
      <p className="text-black-500 text-sm mb-4 text-center">
        Monthly Revenue, Expenses, and Profits
      </p>

      {/* Custom Legend */}
      <div className="flex justify-center gap-6 mb-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="w-12 h-3 rounded bg-[#34d399]"></span>
          <span className="text-gray-500">Revenue Growth</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 h-3 rounded bg-[#fbbf24]"></span>
          <span className="text-gray-500">Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 h-3 rounded bg-[#60a5fa]"></span>
          <span className="text-gray-500">Profits</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[0, 1400]}
            ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar
            dataKey="revenue"
            fill="#34d399"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={1200}
          />
          <Bar
            dataKey="expenses"
            fill="#fbbf24"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={1400}
          />
          <Bar
            dataKey="profits"
            fill="#60a5fa"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
            animationDuration={1600}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bargraph;

