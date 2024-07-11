import React from "react";
import DashboardCard from "./dashboard-card";

const DashboardGrid = () => {
  return (
    // <div>
    //     <DashboardCard />
    // </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </div>
  );
};

export default DashboardGrid;
