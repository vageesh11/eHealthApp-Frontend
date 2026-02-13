import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { pieData, pieColors } from "../utils/PiegraphConstants";

const Piegraph: React.FC = () => {
  return (
    <div className="bg-gray-100 shadow-lg rounded-2xl p-4 max-w-xl mx-auto w-full md:w-[400px]">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={1}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </ResponsiveContainer>

      {/* Optional Total */}
      {/* <p className="text-center mt-2 font-medium text-gray-600">
        Total: {pieData.reduce((acc, item) => acc + item.value, 0)}
      </p> */}
    </div>
  );
};

export default Piegraph;
