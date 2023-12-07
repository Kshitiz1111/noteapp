import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface userObj {
  name?: string;
  email: string;
  pwd: string;
  role: "ADMIN" | "USER" | undefined;
}

// Define the initial state using that type
const initialState: userObj = {
  name: "",
  email: "",
  pwd: "",
  role: undefined,
};

export const Auth = createSlice({
  name: "userAuthentication",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    inputValidation: (state, action: PayloadAction<string>) => {
      const USER_REGEX = /^[a-z][^\W_]{3,24}$/i;
      const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    },
  },
});

export const { inputValidation } = Auth.actions;

// Other code such as selectors can use the imported `RootState` type
export const getUserObj = (state: RootState) => state.userAuth;

export default Auth.reducer;
