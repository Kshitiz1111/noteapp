import { configureStore } from "@reduxjs/toolkit";
import toggleNav from "../features/SliceToggle";
import Auth from "../features/userAuth/SliceAuth";
import AddNote from "../features/SliceAddNote";
import Reminder from "../features/SliceReminder";

// import TrustDevice from "../features/SliceTrustThisDevice";

export const store = configureStore({
  reducer: {
    toggleStatus: toggleNav,
    userAuth: Auth,
    // deviceTrusted: TrustDevice,
    getNotes: AddNote,
    getNotif: Reminder,
  },
});

/**
 * This is a type that represents the entire state of your
 *  Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;
/**
 * This is a type that represents the dispatch function
 *  from your Redux store.
 */
export type AppDispatch = typeof store.dispatch;
