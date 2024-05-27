"use client";

import React from "react";
import SignupForm from "../molecules/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
