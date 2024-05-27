"use client";

import React from "react";
import TaskList from "../organisms/TaskList";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <TaskList />
    </div>
  );
};

export default Dashboard;
