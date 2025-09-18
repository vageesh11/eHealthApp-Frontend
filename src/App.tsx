import React, { useState } from "react";
import Header from "./components/Header";
import Bargraph from "./components/Bargraph";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import MultilevelDropdown from "./components/MultilevelDropdown";
import Searchbar from "./components/Searchbar";
import Login from "./components/Login";
import Cards from "./components/cards";
import Table from "./components/Table";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //Login
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  
  const [isSecondLoginOpen, setIsSecondLoginOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    secretKey: "",
  });

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleCredentialChange = (key: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdminCredentialChange = (
    key: string,
    value: string
  ) => {
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
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-grow p-4">
          <Bargraph />

          {/* DROPDOWN  */}
          <div className="mt-6 gap-6 flex justify-center">
            <MultilevelDropdown />
            <Searchbar
              placeholder="Search anything..."
              value={searchValue}
              onChange={setSearchValue}
            />

            
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
          <Table />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
