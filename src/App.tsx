// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Bargraph from "./components/Bargraph";
// import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";
// import MultilevelDropdown from "./components/MultilevelDropdown";
// import Searchbar from "./components/Searchbar";
// import Login from "./components/Login";
// import Cards from "./components/cards";
// import Table from "./components/Table";
// import Piegraph from "./components/Piegraph";
// import Linegraph from "./components/Linegraph";



// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");

  
//   const columns = ["Customer ID", "Name", "Effective Date", "Renewal Date", "Payment Status"];
//   const data = [
//     { "Customer ID": "CUST001", Name: "John Doe", "Effective Date": "2025-01-01", "Renewal Date": "2026-01-01", "Payment Status": "Paid" },
//     { "Customer ID": "CUST002", Name: "Jane Smith", "Effective Date": "2025-02-01", "Renewal Date": "2026-02-01", "Payment Status": "Pending" },
//     { "Customer ID": "CUST003", Name: "Alice Johnson", "Effective Date": "2025-03-01", "Renewal Date": "2026-03-01", "Payment Status": "Paid" },
//     { "Customer ID": "CUST004", Name: "Mark Lee", "Effective Date": "2025-04-01", "Renewal Date": "2026-04-01", "Payment Status": "Paid" },
//     { "Customer ID": "CUST005", Name: "Sophia Brown", "Effective Date": "2025-05-01", "Renewal Date": "2026-05-01", "Payment Status": "Paid" },
//   ];

  
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [isSecondLoginOpen, setIsSecondLoginOpen] = useState(false);
//   const [adminCredentials, setAdminCredentials] = useState({
//     username: "",
//     secretKey: "",
//   });

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const handleCredentialChange = (key: string, value: string) => {
//     setCredentials((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleAdminCredentialChange = (key: string, value: string) => {
//     setAdminCredentials((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleLogin = () => {
//     console.log("User Login:", credentials);
//     setIsLoginOpen(false);
//   };

//   const handleAdminLogin = () => {
//     console.log("Admin Login:", adminCredentials);
//     setIsSecondLoginOpen(false);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header toggleSidebar={toggleSidebar} />
//       {/* <Header /> */}

//       <div className="flex flex-grow">
//         <Sidebar isOpen={isSidebarOpen} />

//         <main className="flex-grow p-4">
//           <Bargraph />

//           {/* DROPDOWN + SEARCH */}
//           <div className="mt-6 gap-6 flex justify-center">
//             <MultilevelDropdown />
//             <Searchbar
//               placeholder="Search anything..."
//               value={searchValue}
//               onChange={setSearchValue}
//             />

//             {/* Login Modals */}
//             <Login
//               credentials={credentials}
//               setCredentials={handleCredentialChange}
//               isOpen={isLoginOpen}
//               setIsOpen={setIsLoginOpen}
//               onLogin={handleLogin}
//               type="user"
//             />

//             <Login
//               credentials={adminCredentials}
//               setCredentials={handleAdminCredentialChange}
//               isOpen={isSecondLoginOpen}
//               setIsOpen={setIsSecondLoginOpen}
//               onLogin={handleAdminLogin}
//               type="admin"
//             />
//           </div>

//           {/* CARDS SECTION */}
//           <div className="mt-8">
//             <Cards />
//           </div>

//           {/* TABLE */}
//           <div className="mt-8">
//             <Table columns={columns} data={data} />
//           </div>

//           <div className="mt-8">
//             <Piegraph />
//           </div>

//           <div className="mt-8">
//             <Linegraph />
//           </div>

//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
