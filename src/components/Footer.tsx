import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgb(13,152,186)] text-white shadow-md py-4">
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p>
          © {new Date().getFullYear()} eHealthApp. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
