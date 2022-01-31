import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar, { BodyContainer } from "../components/NavBar/NavBar";
import AuthProvider from "../components/AuthProvider/AuthProvider";

// import dynamic from "next/dynamic";
// const DynamicNavBar = dynamic(() => import('../components/NavBar/NavBar'));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar />
      <BodyContainer>
        <Component {...pageProps} />
      </BodyContainer>
    </AuthProvider>
  );
}

export default MyApp;
