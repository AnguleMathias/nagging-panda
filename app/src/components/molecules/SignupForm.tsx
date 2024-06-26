"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { AppDispatch } from "../../store";
import { signup } from "../../store/authSlice";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const SignupForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSignup = async () => {
    const validationErrors: { [key: string]: string } = {};

    if (!username) {
      validationErrors.username = "Username is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await dispatch(signup({ username, password, email }));

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/login");
      }

      if (response.meta.requestStatus === "rejected") {
        if (response.payload === "Username already exists") {
          validationErrors.username = "Username already exists";
        }

        if (response.payload === "Email already exists") {
          validationErrors.email = "Email already exists";
        }

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }
    } catch (error) {
      setErrors({ general: "Signup failed" });
    }
  };

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
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        error={errors.email}
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

      <Input
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="Confirm Password"
        error={errors.confirmPassword}
      />
      <Button onClick={handleSignup}>Signup</Button>
      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
