import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth);
    console.log("right here")

    useEffect(() => {
      console.log("this 1")
      if (!auth.isAuthenticated) {
        router.push("/login");
      }
    }, [auth.isAuthenticated, router]);

    return auth.isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
