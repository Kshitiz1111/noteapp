import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import axios from "../../api/axios";

import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { setAuth } from "./SliceAuth";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const getAuth = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [name, password]);

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/user/login",
        JSON.stringify({ name: name, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response.data));
      const accessToken: string = response?.data?.accessToken;
      const role: string | undefined = response?.data?.role;

      dispatch(
        setAuth({
          name: name,
          pwd: password,
          accessToken: accessToken,
          role: role,
        })
      );

      setName("");
      setPassword("");
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("missing username or password");
      } else if (err.response?.status === 401) {
        // handle internal server errors
        setErrMsg("Unauthorized");
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
            <span className="block sm:inline">{errMsg}</span>
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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              autoComplete="off"
              aria-describedby="uidnote"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
