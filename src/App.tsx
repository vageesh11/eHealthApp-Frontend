import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home"; 

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <div className="flex flex-col bg-gray-100 min-h-screen transition-all duration-300">
        {/* Header */}
        <Header sidebarExpanded={sidebarExpanded} />

        <div className="flex flex-grow transition-all duration-300">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onExpandChange={(expanded: boolean) => setSidebarExpanded(expanded)}
          />

        
          <div
            className={`flex-1 p-4 transition-all duration-300 ${
              sidebarExpanded ? "ml-[256px]" : "ml-[80px]"
            }`}
          >
            <Routes>
              
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />

              
              <Route path="/appointment" element={<Appointment />} />

              
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </div>

       
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

