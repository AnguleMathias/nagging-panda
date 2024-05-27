import { RootState, persistor } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={cssTransition({
            enter: "toastify__slideEnter",
            exit: "toastify__slideExit",
            appendPosition: false,
            collapse: true,
            collapseDuration: 2,
          })}
          toastClassName={() =>
            "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-blue-500 text-white"
          }
          bodyClassName={() => "flex text-sm font-white block p-3"}
        />
      </div>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default Page;
