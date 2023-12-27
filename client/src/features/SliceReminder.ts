import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { stat } from "fs";

// Define a type for the slice state
interface Notification {
  id: string | null;
  title: string | null;
  initTime: string | null;
}
interface Notifications {
  notifContent: Notification[] | null;
  totalNotif: number | undefined;
}

// Define the initial state using that type
const initialState: Notifications = {
  notifContent: [],
  totalNotif: 0,
};

export const Reminder = createSlice({
  name: "reminder",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotif: (state, action) => {
      const { id, title, initTime } = action.payload;
      console.log("from notif slice");
      console.log(id, title, initTime);

      let notifIndex = state.notifContent?.findIndex(
        (notif) => notif.id === id
      );

      if (notifIndex !== -1) {
        console.log("already exist");
      } else {
        // If the note doesn't exist, add it
        console.log("adding new notif");
        state.notifContent?.unshift({
          id: id,
          title: title,
          initTime: initTime,
        });
        state.totalNotif = state.notifContent?.length;
        console.log(state.notifContent);
      }
    },
    removeNotif: (state, action) => {},
  },
});

export const { setNotif, removeNotif } = Reminder.actions;

export default Reminder.reducer;
