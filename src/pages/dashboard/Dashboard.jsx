import React from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <section className="flex min-h-screen bg-gray-50">
            <DashboardSidebar />
            <div className="flex-1 p-8 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
