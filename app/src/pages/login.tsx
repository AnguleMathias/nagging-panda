"use client";

import React, { useEffect } from "react";
import LoginPage from "../components/organisms/LoginPage";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/store";

const Login: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/home");
    }
  }, []);

  return <LoginPage />;
};

export default Login;
