import type { NextPage } from "next";
import Head from "next/head";
import Container from "@mui/material/Container";
import { useAuthContext } from "../common/context";
import HomeDashBoard from "../components/HomeDashBoard/HomeDashBoard";

const Home: NextPage = () => {
  const user = useAuthContext();
  return (
    <Container>
      {user ? (
        <>
          <Head>
            <title>Home</title>
          </Head>
          <HomeDashBoard/>
        </>
      ) : (
        <h1>Please log in</h1>
      )}
    </Container>
  );
};

export default Home;
