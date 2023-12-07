import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface Toggle {
  status: string;
}

// Define the initial state using that type
const initialState: Toggle = {
  status: "none",
};

export const Toggle = createSlice({
  name: "toggle",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      action.payload !== "none"
        ? (state.status = "none")
        : (state.status = "block");
    },
  },
});

export const { toggle } = Toggle.actions;

// Other code such as selectors can use the imported `RootState` type
export const getNavStatus = (state: RootState) => state.toggleStatus.status;

export default Toggle.reducer;
