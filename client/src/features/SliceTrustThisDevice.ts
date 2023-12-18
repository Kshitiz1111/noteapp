import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface TrustDeviceValue {
  trustIndicator: string;
}

// Define the initial state using that type
const initialState: TrustDeviceValue = {
  trustIndicator: "",
};

export const TrustDevice = createSlice({
  name: "trustdevice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTrust: (state, action: PayloadAction<string>) => {
      // let a = localStorage.getItem("deviceTrusted");
      // if (a === "persist") {
      //   state.trustIndicator = action.payload;
      //   console.log(`from string: ${state.trustIndicator}`);
      // } else {
      //   state.trustIndicator = "";
      //   console.log(`from empth string: ${state.trustIndicator}`);
      // }
      //initial check if there is store value in localStorage
      // console.log(`localstorage: ${trust}`);
    },
  },
});

export const { setTrust } = TrustDevice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getNavStatus = (state: RootState) => state.toggleStatus.status;

export default TrustDevice.reducer;
