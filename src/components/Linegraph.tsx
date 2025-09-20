import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";


const data = [
  { name: "Jan", claim1: 90, claim2: 50, claim3: 60 },
  { name: "Feb", claim1: 50, claim2: 70, claim3: 30 },
  { name: "Mar", claim1: 70, claim2: 90, claim3: 10 },
  { name: "Apr", claim1: 60, claim2: 40, claim3: 60 },
  { name: "May", claim1: 90, claim2: 90, claim3: 70 },
];


const claims = [
  { key: "claim1", label: "Claim Type 1", color: "#22c55e" }, 
  { key: "claim2", label: "Claim Type 2", color: "#f97316" }, 
  { key: "claim3", label: "Claim Type 3", color: "#3b82f6" }, 
];


const renderLegend = () => {
  return (
    <div className="flex justify-center gap-6 mb-2">
      {claims.map((c) => (
        <div key={c.key} className="flex items-center gap-1">
          <span
            className="w-4 h-2"
            style={{ backgroundColor: c.color, border: `2px solid ${c.color}` }}
          ></span>
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  );
};


const Linegraph: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow p-4">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          
          <Legend
            content={renderLegend}
            verticalAlign="top"
            align="center"
          />

          {claims.map((c) => (
            <Line
              key={c.key}
              type="linear"   
              dataKey={c.key}
              stroke={c.color}
              strokeWidth={2}
              dot={{ r: 4 }}  
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* <p className="text-sm text-gray-500 mt-2 text-center">
        +10% from last month
      </p> */}
    </div>
  );
};

export default Linegraph;
