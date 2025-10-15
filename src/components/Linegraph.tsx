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
import { lineGraphData, lineGraphClaims } from "../utils/LinegraphConstants";

const renderLegend = () => {
  return (
    <div className="flex justify-center gap-6 mb-2">
      {lineGraphClaims.map((c) => (
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
        <LineChart data={lineGraphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Legend content={renderLegend} verticalAlign="top" align="center" />

          {lineGraphClaims.map((c) => (
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
    </div>
  );
};

export default Linegraph;
