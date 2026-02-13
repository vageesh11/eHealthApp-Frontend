import React from "react";

interface TitleProps {
  text: string;
  subtitle?: string;
}

const Title: React.FC<TitleProps> = ({ text, subtitle }) => {
  return (
    <div>
    <h2 className="text-xl font-bold">
      {text}
    </h2>
    {subtitle && (
      <p className="text-sm text-gray-400 ">{subtitle}</p>
    )}
    </div>
  );
};

export default Title;
