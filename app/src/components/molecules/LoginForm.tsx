"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { login } from "../../store/authSlice";
import { RootState, AppDispatch } from "../../store";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleLogin = async () => {
    const validationErrors: { [key: string]: string } = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(login({ username, password }));
    } catch (error) {
      setErrors({ general: "Login failed" });
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.token) {
      router.push("/home");
    }
  }, [auth.isAuthenticated, auth.token, router]);

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
      <Input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        error={errors.username}
      />
      <Input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        error={errors.password}
      />
      <Button onClick={handleLogin}>Login</Button>
      <div className="mt-4">
        <p>
          Do not have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
