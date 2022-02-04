import "../styles/globals.css";
import Head from "next/head";
// import Script from 'next/script'
import type { AppProps } from "next/app";
import NavBar, { BodyContainer } from "../components/NavBar/NavBar";
import CookiePopup from "../components/CookiePopup/CookiePopup";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import Footer from "../components/Footer/Footer";
// import { useEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(()=>{
  //   window.gapi.load('client',() => {
  //     console.log('loaded client')
  //     window.gapi.client.init({
  //       apiKey:process.env.NEXT_PUBLIC_API_KEY,
  //       clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //       discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  //       scope:'https://www.googleapis.com/auth/calendar'
  //     })
  //   })
  // },[])
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        ></link>
        {/* <Script src="https://apis.google.com/js/api.js" strategy="beforeInteractive"/> */}
      </Head>

      <AuthProvider>
        <NavBar />
        <BodyContainer>
          <Component {...pageProps} />
        </BodyContainer>
        <CookiePopup/>
        <Footer/>
      </AuthProvider>
    </>
  );
}

export default MyApp;
