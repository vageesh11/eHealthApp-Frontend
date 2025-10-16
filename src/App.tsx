import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Bargraph from "./components/Bargraph";
import Cards from "./components/cards";
import Table from "./components/Table";
import Piegraph from "./components/Piegraph";
import Linegraph from "./components/Linegraph";
import MultilevelDropdown from "./components/MultilevelDropdown";
import Searchbar from "./components/Searchbar";
import Login from "./components/Login";
import Appointment from "./pages/Appointment";
import Tooltip from "./components/Tooltip";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSecondLoginOpen, setIsSecondLoginOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: "", secretKey: "" });

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleCredentialChange = (key: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdminCredentialChange = (key: string, value: string) => {
    setAdminCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    console.log("User Login:", credentials);
    setIsLoginOpen(false);
  };

  const handleAdminLogin = () => {
    console.log("Admin Login:", adminCredentials);
    setIsSecondLoginOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />

        <div className="flex flex-grow">
          <Sidebar isOpen={isSidebarOpen} />

          <div className="flex-1 p-4">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Bargraph />

                    <div className="mt-8 justify-center">
                      <MultilevelDropdown />
                    </div>

                    <div className="mt-8 w-1/5 max-w-xs">
                      <Searchbar placeholder="Search anything..." value={searchValue} onChange={setSearchValue} />
                    </div>

                    <div className="mt-8">
                      <Login
                        credentials={credentials}
                        setCredentials={handleCredentialChange}
                        isOpen={isLoginOpen}
                        setIsOpen={setIsLoginOpen}
                        onLogin={handleLogin}
                        type="user"
                      />
                    </div>

                    <div className="mt-8">
                      <Login
                        credentials={adminCredentials}
                        setCredentials={handleAdminCredentialChange}
                        isOpen={isSecondLoginOpen}
                        setIsOpen={setIsSecondLoginOpen}
                        onLogin={handleAdminLogin}
                        type="admin"
                      />
                    </div>

                    <div className="justify-center mt-12 mb-25">
                      <Tooltip />
                    </div>

                    <div className="mt-8">
                      <Cards />
                    </div>

                     <div className="mt-8">
                      <Dashboard />
                    </div>

                    <div className="mt-8">
                      <Table /> 
                    </div>

                    <div className="mt-8">
                      <Piegraph />
                    </div>

                    <div className="mt-8">
                      <Linegraph />
                    </div>

                    
                  </>
                }
              />

              <Route path="/appointment" element={<Appointment />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
