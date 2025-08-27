import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />

      <div className="flex flex-grow">
        
        <Sidebar />

        
        <main className="flex-grow p-4">
          <Hero />
        </main>
      </div>

      
      <Footer />
    </div>
  );
}

export default App;
