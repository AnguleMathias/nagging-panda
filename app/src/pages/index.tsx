import { RootState, persistor } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  pageProps: any;
  Component: any;
}

const Page: React.FC<Props> = ({ Component, pageProps }) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (
      !auth.isAuthenticated &&
      router.pathname !== "/login" &&
      router.pathname !== "/signup"
    ) {
      router.push("/login");
    }
  }, []);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default Page;
