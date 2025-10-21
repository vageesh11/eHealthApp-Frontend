import React from "react";
import { Card } from "react-bootstrap";
import { cardStats } from "../utils/CardsConstants";

const Cards = () => {
  return (
    <div className="flex flex-wrap gap-4 w-full px-4">
      {cardStats.map((stat, index) => (
        <Card
          key={index}
          style={{
            height: "104px",
            backgroundColor: stat.bgColor,
            borderRadius: "12px",
          }}
          className="text-white flex items-center justify-start flex-1 
                     w-full sm:w-[48%] md:w-[32%] lg:w-[24%]"
        >
          <div className="flex items-center gap-4 p-4">
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

export default Cards;
