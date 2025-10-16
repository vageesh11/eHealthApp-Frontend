import React from "react";
import { Card } from "react-bootstrap";
import { cardStats } from "../utils/CardsConstants";

const DashboardCards = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {cardStats.map((stat, index) => (
        <Card
          key={index}
          style={{
            width: "256px",
            height: "104px",
            backgroundColor: stat.bgColor,
            borderRadius: "12px",
          }}
          className="text-white flex items-center"
        >
          <div className="flex items-center gap-4 p-4 w-full h-full">
            <div
              className="flex items-center justify-center rounded-full w-16 h-16"
              style={{ backgroundColor: stat.iconBg }}
            >
              {stat.icon}
            </div>
            <div>
              <h5 className="text-white text-xl font-semibold">{stat.value}</h5>
              <p className="text-white text-sm">{stat.title}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
