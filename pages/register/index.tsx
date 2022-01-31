import { NextPage } from "next";
import Link from "next/link";
import { db, auth } from "../../db/firebase-config";
import { useState, ChangeEvent } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { useRouter } from "next/router";
const Register: NextPage = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });
  const register = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    );
    const uid = user.user.uid;
    var count = 0;
    const maxTries = 3;
    var success = false;
    while (count <= maxTries && !success) {
      try {
        const set = await setDoc(doc(db, "users", uid), {
          fname: registerData.fname,
          lname: registerData.lname,
          email: registerData.email,
        }).then((res) => {
          success = true;
          console.log("successful user creation");
          router.push("/");
        });
        break;
      } catch (e) {
        if (count > maxTries) {
          count++;
          throw e;
        }
      }
    }
    
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };
  const onFNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      fname: e.target.value,
    }));
  };
  const onLNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      lname: e.target.value,
    }));
  };
  onAuthStateChanged(auth, (currentUser) => {});
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
            value={registerData.email}
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
            value={registerData.password}
            onChange={onPasswordChange}
          />
          <br />
          <TextField
          sx={{
            input:{
              backgroundColor:"white"
            }
          }}
            label="First Name"
            value={registerData.fname}
            onChange={onFNameChange}
          />
          <br />
          <TextField
          sx={{
            input:{
              backgroundColor:"white"
            }
          }}
            label="Last Name"
            value={registerData.lname}
            onChange={onLNameChange}
          />
          <h6 style={{ marginTop: 0, paddingTop: 0, textAlign: "right" }}>
            Already registered?{" "}
            <Link href="/login">
              <a style={{color:"red"}}>Login here</a>
            </Link>
          </h6>
          <Button variant="contained" onClick={register}>
            Register
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};
export default Register;
