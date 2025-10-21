import React from "react";
import Linegraph from  "../components/Linegraph";
import Cards from "../components/cards";
import DashboardCards from "../components/DashboardCards";

const Dashboard: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="mt-4">
                <Cards />
            </div>

            <div className="mt-4">
                <DashboardCards />
            </div>

            <div className="mt-4">
                <Linegraph />
            </div>
        </div>
    );
};

export default Dashboard;