import React, { useState } from "react";
import Bargraph from "../components/Bargraph";
import Cards from "../components/cards";
import Table from "../components/Table";
import Piegraph from "../components/Piegraph";
import Linegraph from "../components/Linegraph";
import MultilevelDropdown from "../components/MultilevelDropdown";
import Searchbar from "../components/Searchbar";
import Login from "../components/Login";

const Dashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  // Login states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [isSecondLoginOpen, setIsSecondLoginOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    secretKey: "",
  });

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
    <>
      <Bargraph />

      {/* Dropdown + Search */}
      <div className="mt-6 gap-6 flex justify-center">
        <MultilevelDropdown />
        <Searchbar placeholder="Search anything..." value={searchValue} onChange={setSearchValue} />

        {/* User Login Modal */}
        <Login
          credentials={credentials}
          setCredentials={handleCredentialChange}
          isOpen={isLoginOpen}
          setIsOpen={setIsLoginOpen}
          onLogin={handleLogin}
          type="user"
        />

        {/* Admin Login Modal */}
        <Login
          credentials={adminCredentials}
          setCredentials={handleAdminCredentialChange}
          isOpen={isSecondLoginOpen}
          setIsOpen={setIsSecondLoginOpen}
          onLogin={handleAdminLogin}
          type="admin"
        />
      </div>

      {/* Cards */}
      <div className="mt-8">
        <Cards />
      </div>

      {/* Table */}
      <div className="mt-8">
        <Table columns={columns} data={data} />
      </div>

      {/* Graphs */}
      <div className="mt-8">
        <Piegraph />
      </div>

      <div className="mt-8">
        <Linegraph />
      </div>
    </>
  );
};

export default Dashboard;
