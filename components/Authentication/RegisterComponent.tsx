import Link from "next/link";
import { db, auth } from "../../db/firebase-config";
import { useState, ChangeEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AlertProps } from "../../common/types";
import { setDoc, doc } from "@firebase/firestore";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const RegisterComponent = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });
  const [alert, setAlert] = useState<AlertProps>({
    severity: undefined,
    open: false,
    message: "",
  });
  const [acceptToSCheck, setAcceptToSCheck] = useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      const uid = user.user.uid;

      const set = await setDoc(doc(db, "users", uid), {
        fname: registerData.fname,
        lname: registerData.lname,
        email: registerData.email,
      }).then((res) => {
        console.log("successful user creation");
        router.push("/");
      });
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-exists":
          setAlert({
            open: true,
            severity: "error",
            message: "The email is already in use",
          });
          break;
        case "auth/invalid-email":
          setAlert({
            open: true,
            severity: "error",
            message: "Invalid email",
          });
          break;
        case "auth/internal-error":
          setAlert({
            open: true,
            severity: "error",
            message: "An internal error has occured, ",
          });
          break;
        default:
          setAlert({
            open: true,
            severity: "error",
            message: "An error has occured",
          });
          break;
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
  const handleAcceptCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptToSCheck(event.target.checked);
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
            value={registerData.email}
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
            value={registerData.password}
            onChange={onPasswordChange}
          />
          <br />
          <TextField
            sx={{
              input: {
                backgroundColor: "white",
              },
            }}
            label="First Name"
            value={registerData.fname}
            onChange={onFNameChange}
          />
          <br />
          <TextField
            sx={{
              input: {
                backgroundColor: "white",
              },
            }}
            label="Last Name"
            value={registerData.lname}
            onChange={onLNameChange}
          />
          <h6 style={{ marginTop: 0, paddingTop: 0, textAlign: "right" }}>
            Already registered?{" "}
            <Link href="/login">
              <a style={{ color: "red" }}>Login here</a>
            </Link>
          </h6>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div>
              <Checkbox
                checked={acceptToSCheck}
                onChange={handleAcceptCheck}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <div>
              I accept the{" "}
              <a href="/tos" target="_blank">
                <u>Terms and Conditions</u>
              </a>
            </div>
          </div>
          <Button
            variant="contained"
            onClick={register}
            disabled={!acceptToSCheck}
          >
            Register
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
export default RegisterComponent;
