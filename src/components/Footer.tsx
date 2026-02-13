import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-black shadow-md py-4">
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p>
          © {new Date().getFullYear()} eHealthApp. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
