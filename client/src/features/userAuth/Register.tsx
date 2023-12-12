import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import shortUUID from "short-uuid";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,24}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
interface RegisterResponse {
  success: boolean; // Indicate successful registration
  message: string; // Optional message returned by the API
  data: {
    // Any additional data returned by the API
    // user data, access token, etc.
  };
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const result = USER_REGEX.test(name);
    console.log(result);
    console.log(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [name, password]);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(name);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry: ");
      return;
    }

    try {
      const response = await axios.post<RegisterResponse>(
        "/api/v1/user/register",
        JSON.stringify({
          id: shortUUID.uuid(),
          name: name,
          email: email,
          pwd: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("user name is already taken");
      } else if (err.response?.status === 500) {
        // handle internal server errors
        setErrMsg("Server error");
      } else {
        // handle other errors
        setErrMsg("Unknown error");
      }
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <div
          aria-live="assertive"
          className={errMsg == "" ? "hidden" : "block"}
        >
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              {errMsg}
              {!validName ? "check name" : ""}
              {!validPwd ? "check password" : ""}
            </span>
          </div>
        </div>

        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  autoComplete="off"
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
              </Grid>
              <p
                id="uidnote"
                className={
                  nameFocus && name && !validName ? "instruction" : "hidden"
                }
              >
                4 to 24 character.
                <br />
                must begin with a letter. <br />
                letters, number, underscores, hyphens allowed.
              </p>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  value={password}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
              </Grid>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instruction" : "hidden"}
              >
                8 to 32 character.
                <br />
                must include uppercase and lowercase letters, a numbers and
                special characters . <br />
              </p>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleRegister(e)}
              disabled={!validName || !validPwd ? true : false}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
