"use client";

import React from "react";
import LoginForm from "../molecules/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome</h1>
        <p className="text-center mb-6">Please log in to continue</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
