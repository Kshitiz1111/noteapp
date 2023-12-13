import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface userObj {
  name?: string;
  pwd: string;
  accessToken: string;
  role: "ADMIN" | "USER" | undefined;
}

// Define the initial state using that type
const initialState: userObj = {
  name: "",
  pwd: "",
  accessToken: "",
  role: undefined,
};

export const Auth: any = createSlice({
  name: "userAuthentication",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { name, pwd, accessToken, role } = action.payload;
      state.name = name;
      state.pwd = pwd;
      state.accessToken = accessToken;
      state.role = role;

      console.log(JSON.stringify(state));
    },
  },
});

export const { setAuth } = Auth.actions;

export default Auth.reducer;
