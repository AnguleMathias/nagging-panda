import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, {  } from "../store";
import Page from ".";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <Page Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
