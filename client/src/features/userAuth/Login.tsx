import { LockOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import axios from "../../api/axios";
import { FaCircleUser } from "react-icons/fa6";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setAuth } from "./SliceAuth";
// import { setTrust } from "../SliceTrustThisDevice";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const getAuth = useAppSelector((state) => state.userAuth);
  // const trustDevice = useAppSelector((state) => state.deviceTrusted);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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

      const accessToken: string = response?.data?.accessToken;
      // const role: string | undefined = response?.data?.role;
      dispatch(
        setAuth({
          name: name,
          // pwd: password,
          accessToken: accessToken,
          // role: role,
        })
      );
      if (response.status === 200) {
        setSuccessMsg(response.data.success);
        setName("");
        setPassword("");
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No server response");
        setSuccessMsg("");
      } else if (err.response?.status === 400) {
        setSuccessMsg("");
        setErrMsg("missing username or password");
      } else if (err.response?.status === 401) {
        // handle internal server errors
        setErrMsg("Unauthorized");
        setSuccessMsg("");
      } else {
        // handle other errors
        setErrMsg("Unknown error");
        setSuccessMsg("");
      }
    }
  };

  // console.log(`login trustInd: ${trustDevice.trustIndicator}`);

  //toggle persist
  // const toggleTrust = () => {
  //   trustDevice.trustIndicator === ""
  //     ? dispatch(setTrust("persist"))
  //     : dispatch(setTrust(""));
  // };
  // useEffect(() => {
  //   localStorage.setItem("deviceTrusted", trustDevice.trustIndicator);
  // }, [trustDevice]);

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
          <Avatar>
            <FaCircleUser />
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
            {/* <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={
                  trustDevice.trustIndicator === "persist" ? true : false
                }
                onChange={toggleTrust}
                className="rounded mr-2 text-gray-700 bg-gray-300 border-gray-300 focus:ring-2 focus:ring-blue-500 ring-opacity-50 h-4 w-4"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium text-gray-700"
              >
                Remember me
              </label>
            </div> */}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
              style={{ background: "black" }}
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
