import React, { useState } from "react";
import Bargraph from "../components/Bargraph";
import Cards from "../components/cards";
import DashboardCards from "../components/DashboardCards";
import Table from "../components/Table";
import Piegraph from "../components/Piegraph";
import MultilevelDropdown from "../components/MultilevelDropdown";
import Searchbar from "../components/Searchbar";
import Tooltip from "../components/Tooltip";
import Login from "../components/Login";

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  
  const [isSecondLoginOpen, setIsSecondLoginOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    secretKey: "",
  });

  return (
    <div className="p-4">
      
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

     
      <Bargraph />

      
      <div className="mt-8">
        <MultilevelDropdown />
      </div>

    
      <div className="mt-8 w-1/5 max-w-xs">
        <Searchbar
          placeholder="Search anything..."
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

      
      <div className="mt-8">
        <Login
          credentials={credentials}
          setCredentials={(k, v) =>
            setCredentials((prev) => ({ ...prev, [k]: v }))
          }
          isOpen={isLoginOpen}
          setIsOpen={setIsLoginOpen}
          onLogin={() => setIsLoginOpen(false)}
          type="user"
        />
      </div>

      {/* Admin Login */}
      <div className="mt-8">
        <Login
          credentials={adminCredentials}
          setCredentials={(k, v) =>
            setAdminCredentials((prev) => ({ ...prev, [k]: v }))
          }
          isOpen={isSecondLoginOpen}
          setIsOpen={setIsSecondLoginOpen}
          onLogin={() => setIsSecondLoginOpen(false)}
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
        <DashboardCards />
      </div>

      
      <div className="mt-8">
        <Table />
      </div>

      
      <div className="mt-8">
        <Piegraph />
      </div>
    </div>
  );
};

export default Home;
