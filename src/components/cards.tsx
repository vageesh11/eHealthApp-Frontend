import React from "react";

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
      <Card
        title="Enrolled Members"
        value={1500}
        percentage="+0.54%"
        isPositive
        icon="/images/enrolled.png"
        bgColor="bg-purple-400"
      />
      <Card
        title="Customers"
        value={32300}
        percentage="-13.66%"
        isPositive={false}
        icon="/images/customers.png"
        bgColor="bg-blue-400"
      />
      <Card
        title="Consumers"
        value={15000}
        percentage="+18.67%"
        isPositive
        icon="/images/consumers.png"
        bgColor="bg-teal-400"
      />
      <Card
        title="Total Claim Submissions"
        value={234987}
        percentage="+0.37%"
        isPositive
        icon="/images/claims.png"
        bgColor="bg-pink-400"
      />
    </div>
  );
};

export default Cards;
