import { NextPage } from "next";
import Link from "next/link";
import { auth } from "../../db/firebase-config";
import { useState, ChangeEvent } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };
  const login = async () => {
    const user = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    ).then((res) => {
      router.push("/");
    });
  };
  const loginWithThirdParty = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        console.log("success");
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential!.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // // ...
      })
      .catch((error) => {
        console.error(error);
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };
  return (
    <Container maxWidth="sm">
      <Box bgcolor={"hsla(180, 100%, 30%, 0.1)"} paddingX={"2rem"} marginY={"2rem"} borderRadius={"2rem"}>
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "calc(90vh - 6rem)" }}
        >
          <TextField
          sx={{
            input:{
              backgroundColor:"white"
            }
          }}
            label="Email"
            type="email"
            required
            value={loginData.email}
            onChange={onEmailChange}
          />
          <br />
          <TextField
          sx={{
            input:{
              backgroundColor:"white"
            }
          }}
            label="Password"
            type="password"
            required
            value={loginData.password}
            onChange={onPasswordChange}
          />
          <h6 style={{ marginTop: 0, paddingTop: 0, textAlign: "right" }}>
            Don't have an account?
            <Link href="/register">
              <a style={{color:"red"}}>
                <b> Register here</b>
              </a>
            </Link>
          </h6>
          <Button variant="contained" onClick={login}>
            login
          </Button>
        </Grid>
        <Button variant="contained" onClick={loginWithThirdParty}>
          Google
        </Button>
      </Box>
    </Container>
  );
};
export default Login;
