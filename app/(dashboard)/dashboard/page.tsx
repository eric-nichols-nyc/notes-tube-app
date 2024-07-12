import React from "react";
import DashboardGrid from "./_components/dashboard-grid";
import { DashboardHeader } from "./_components/dashboard-header";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <div className="h-full w-full container rounded-lg bg-gray-200">
        <DashboardHeader />
       <DashboardGrid />
      </div>
    </div>
  );
};

export default DashboardPage;
