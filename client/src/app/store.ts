import { configureStore } from "@reduxjs/toolkit";
import toggleNav from "../features/Toggle";

export const store = configureStore({
  reducer: {
    toggleStatus: toggleNav,
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
