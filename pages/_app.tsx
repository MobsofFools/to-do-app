import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import NavBar, { BodyContainer } from "../components/NavBar/NavBar";
import AuthProvider from "../components/AuthProvider/AuthProvider";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        ></link>
      </Head>

      <AuthProvider>
        <NavBar />
        <BodyContainer>
          <Component {...pageProps} />
        </BodyContainer>
      </AuthProvider>
    </>
  );
}

export default MyApp;
