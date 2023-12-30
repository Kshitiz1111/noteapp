import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { io } from "socket.io-client";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// Define a type for the slice state
// interface SocketType {
//   socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
// }

// // Define the initial state using that type
// const initialState: SocketType = {
//   socket: (() => io("http://localhost:4001"))(),
// };

// export const Toggle = createSlice({
//   name: "toggle",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     toggle: (state, action: PayloadAction<string>) => {},
//   },
// });

// export const { toggle } = Toggle.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const getNavStatus = (state: RootState) => state.toggleStatus.status;

// export default Toggle.reducer;
