"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { logout, checkTokenExpiration } from "../store/authSlice";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent: React.FC = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      dispatch(checkTokenExpiration());

      if (!auth.isAuthenticated || !auth.token) {
        dispatch(logout());
        router.push("/login");
      }
    }, [auth.isAuthenticated, auth.token, dispatch, router]);

    if (!auth.isAuthenticated || !auth.token) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
