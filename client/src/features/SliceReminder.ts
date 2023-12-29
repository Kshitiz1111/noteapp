import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { stat } from "fs";

// Define a type for the slice state
interface Notification {
  id: string | null;
  title: string | null;
  reason: string | null;
  initTime: string | null;
}
interface Notifications {
  notifContent: Notification[] | null;
  totalNotif: number | undefined;
  reminderDiv: boolean;
}

// Define the initial state using that type
const initialState: Notifications = {
  notifContent: [],
  totalNotif: 0,
  reminderDiv: false,
};

export const Reminder = createSlice({
  name: "reminder",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotif: (state, action) => {
      const { id, title, reminderReason, initTime } = action.payload;
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
          reason: reminderReason,
          initTime: initTime,
        });
        state.totalNotif = state.notifContent?.length;
        console.log(state.notifContent);
      }
    },
    setReminderDisplay: (state, action) => {
      state.reminderDiv = action.payload;
    },
    removeNotif: (state, action) => {},
  },
});

export const { setNotif, removeNotif, setReminderDisplay } = Reminder.actions;

export default Reminder.reducer;
