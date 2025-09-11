import React, { useState } from "react";
import Header from "./components/Header";
import Bargraph from "./components/Bargraph";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import MultilevelDropdown from "./components/MultilevelDropdown";
// import Calender from "./components/Calender";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with hamburger */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow">
        {/* Sidebar controlled by state */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main content */}
        <main className="flex-grow p-4">
          {/* Bargraph at the top */}
          <Bargraph />

          {/* MultilevelDropdown below Bargraph */}
          <div className="mt-6 flex justify-center">
            <MultilevelDropdown />
          </div>
        </main>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

export default App;
