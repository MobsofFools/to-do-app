import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar, { BodyContainer } from "../components/NavBar/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <BodyContainer>
      <Component {...pageProps} />
      </BodyContainer>
    </>
  );
}

export default MyApp;
