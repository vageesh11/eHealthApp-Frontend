import React from "react";
import { CARDS_DATA } from "../utils/CardsConstants";

interface CardProps {
  title: string;
  value: string | number;
  percentage: string;
  isPositive?: boolean;
  bgColor: string;
  icon: string;
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  percentage,
  isPositive = true,
  bgColor,
  icon,
}) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl shadow-md p-4 w-full min-w-[250px] min-h-[140px] text-white ${bgColor} snap-start`}
    >
      <img src={icon} alt={title} className="w-10 h-10 object-contain mb-2" />

      <p className="text-lg font-medium mt-10">{title}</p>

      <div className="flex justify-between items-end mt-auto">
        <p className="text-xl font-bold">{value}</p>
        <p
          className={`text-sm font-semibold ${
            isPositive ? "text-green-100" : "text-red-200"
          }`}
        >
          {percentage}
        </p>
      </div>
    </div>
  );
};

const Cards: React.FC = () => {
  return (
    <div className="flex gap-4">
      {CARDS_DATA.map((card) => (
        <Card
          key={card.title}
          title={card.title}
          value={card.value}
          percentage={card.percentage}
          isPositive={card.isPositive}
          bgColor={card.bgColor}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default Cards;
