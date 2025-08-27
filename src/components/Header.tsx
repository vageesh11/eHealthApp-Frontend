import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-purple-400 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">eHealthApp</h1>
      </div>
    </header>
  );
};

export default Header;
