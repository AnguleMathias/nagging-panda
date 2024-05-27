import withAuth from "@/hoc/withAuth";
import React from "react";

const Page: React.FC = () => {
  return <h1>Hello, Next.js!</h1>;
};

export default withAuth(Page);
