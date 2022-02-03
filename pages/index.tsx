import type { NextPage } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import { useAuthContext } from "../common/context";
import HomeDashBoard from "../components/HomeDashBoard/HomeDashBoard";
import HomePageNoAuth from "../components/HomePageNoAuth/HomePageNoAuth";

const Home: NextPage = () => {
  const user = useAuthContext();
  return (
      user ? (
        <Container>
          <Head>
            <title>Home</title>
          </Head>
          <HomeDashBoard/>
        </Container>
      ) : (
        <HomePageNoAuth/>
      )
  );
};

export default Home;
