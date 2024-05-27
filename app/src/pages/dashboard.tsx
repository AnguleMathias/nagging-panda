import React from "react";
import withAuth from "../hoc/withAuth";
import Dashboard from "../components/templates/Dashboard";

const DashboardPage: React.FC = () => {
  return <Dashboard />;
};

export default withAuth(DashboardPage);
