import HomePage from "@/components/templates/Home";
import withAuth from "@/hoc/withAuth";
import React from "react";

const Home: React.FC = () => {
  return <HomePage />;
};

export default withAuth(Home);
