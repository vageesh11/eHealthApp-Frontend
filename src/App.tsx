
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

  const columns = ["Customer ID", "Name", "Effective Date", "Renewal Date", "Payment Status"];
  const data = [
    { "Customer ID": "CUST001", Name: "John Doe", "Effective Date": "2025-01-01", "Renewal Date": "2026-01-01", "Payment Status": "Paid" },
    { "Customer ID": "CUST002", Name: "Jane Smith", "Effective Date": "2025-02-01", "Renewal Date": "2026-02-01", "Payment Status": "Pending" },
    { "Customer ID": "CUST003", Name: "Alice Johnson", "Effective Date": "2025-03-01", "Renewal Date": "2026-03-01", "Payment Status": "Paid" },
    { "Customer ID": "CUST004", Name: "Mark Lee", "Effective Date": "2025-04-01", "Renewal Date": "2026-04-01", "Payment Status": "Paid" },
    { "Customer ID": "CUST005", Name: "Sophia Brown", "Effective Date": "2025-05-01", "Renewal Date": "2026-05-01", "Payment Status": "Paid" },
  ];

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

                    <div className="mt-6 gap-6 flex justify-center">
                      <MultilevelDropdown />
                      <Searchbar placeholder="Search anything..." value={searchValue} onChange={setSearchValue} />

                      <Login
                        credentials={credentials}
                        setCredentials={handleCredentialChange}
                        isOpen={isLoginOpen}
                        setIsOpen={setIsLoginOpen}
                        onLogin={handleLogin}
                        type="user"
                      />

                      <Login
                        credentials={adminCredentials}
                        setCredentials={handleAdminCredentialChange}
                        isOpen={isSecondLoginOpen}
                        setIsOpen={setIsSecondLoginOpen}
                        onLogin={handleAdminLogin}
                        type="admin"
                      />
                    </div>

                    <div className="mt-8">
                      <Cards />
                    </div>

                    <div className="mt-8">
                      <Table columns={columns} data={data} />
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

              {/* Appointment Route */}
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

