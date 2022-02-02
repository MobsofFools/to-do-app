import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { auth } from "../../db/firebase-config";
import { useState, ChangeEvent } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
import { AlertProps } from "../../common/types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<AlertProps>({
    severity: undefined,
    open: false,
    message: "",
  });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };
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
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      ).then((res) => {
        router.push("/");
      });
    } catch (e: any) {
      switch (e.code) {
        case "auth/invalid-password":
          setAlert({
            open: true,
            severity: "error",
            message: "The email is already in use",
          });
          break;
        case "auth/user-not-found":
          setAlert({
            open: true,
            severity: "error",
            message: "There is no account associated with the provided email",
          });
          break;
        default:
          setAlert({
            open: true,
            severity: "error",
            message: "Failed to log in",
          });
          break;
      }
    }
  };
  const loginWithThirdParty = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        console.log("success");
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
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
      <Box
        bgcolor={"hsla(180, 100%, 30%, 0.1)"}
        paddingX={"2rem"}
        marginY={"2rem"}
        borderRadius={"2rem"}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "calc(90vh - 6rem)" }}
        >
          <TextField
            sx={{
              input: {
                backgroundColor: "white",
              },
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
              input: {
                backgroundColor: "white",
              },
            }}
            label="Password"
            type="password"
            required
            value={loginData.password}
            onChange={onPasswordChange}
          />
          <h6 style={{ marginTop: 0, paddingTop: 0, textAlign: "right" }}>
            {`Don\'t have an account?`}
            <Link href="/register">
              <a style={{ color: "red" }}>
                <b> Register here</b>
              </a>
            </Link>
          </h6>
          <Button variant="contained" onClick={login}>
            login
          </Button>
          <br/>
          <Button
          sx={{ bgcolor: "white", color:"#757575", fontFamily:"Roboto", fontWeight:"700", ":hover": {backgroundColor:"white", height:"40dp"}}}
          onClick={loginWithThirdParty}
        >
          <Image src="/googlelogo.svg" height={18} width={18}></Image>
          <div style={{padding:"0 8dp"}}>Sign in with Google</div>
        </Button>
        </Grid>
        
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default Login;
