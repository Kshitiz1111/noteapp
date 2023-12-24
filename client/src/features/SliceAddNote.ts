import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import shortUUID from "short-uuid";
import axios from "../api/axios";
import { act } from "react-dom/test-utils";

// Define a type for the slice state
interface Note {
  id: string;
  title: string;
  body: string;
  initialTime: number;
  lastModified: string;
}
interface NotesInterface {
  user: string;
  notes: Note[];
  activeNote?: Note | null;
}

// Define the initial state using that type
const initialState: NotesInterface = {
  user: "",
  notes: [],
  activeNote: null,
};

export const AddNote = createSlice({
  name: "addNote",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveNoteLocally: (state, action) => {
      console.log(action.payload);
    },
    setActiveNote: (state, action) => {
      //comeback and reduce code redundency
      console.log(action.payload);
      if (action.payload.type === "tab") {
        state.activeNote?.id !== action.payload.payload.id
          ? (state.activeNote = action.payload.payload)
          : (state.activeNote = null);
      }
      if (action.payload.type === "homenote") {
        state.activeNote = action.payload.payload;
      }
    },
    addNotes: (state, action) => {
      const user = action.payload.user;
      state.user = user;
      const { n_id, n_title, n_body, n_initialTime, n_lastModified } =
        action.payload.note[0];

      let noteIndex = state.notes.findIndex((note) => note.id === n_id);

      // If the note exists, update it
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          title: n_title,
          body: n_body,
          lastModified: n_lastModified,
        };
      } else {
        // If the note doesn't exist, add it
        state.notes.unshift({
          id: n_id,
          title: n_title,
          body: n_body,
          initialTime: n_initialTime,
          lastModified: n_lastModified,
        });
      }
      console.log(JSON.stringify(state.notes));
    },
    deleteNote: (state, action) => {
      console.log(`before: ${JSON.stringify(state.notes)}`);
      let prevLen = state.notes.length;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      console.log(`after: ${JSON.stringify(state.notes)}`);
    },
    emptyNoteAfterLogout: (state, action) => {
      console.log(`before: ${JSON.stringify(state.notes)}`);
      state.notes = [];
      console.log(`after: ${JSON.stringify(state.notes)}`);
    },
    insertSavedNotes: (state, action) => {
      const { note, user } = action.payload;
      state.user = user;
      const serverResponseNotes = JSON.parse(note);
      console.log(serverResponseNotes);
      if (serverResponseNotes) {
        serverResponseNotes?.map((singleNote: any) => {
          // If the note doesn't exist, add it
          const noteExists = state.notes.some(
            (note) => note.id === singleNote.id
          );
          if (!noteExists) {
            state.notes.unshift({
              id: singleNote.id,
              title: singleNote.title,
              body: singleNote.body,
              initialTime: singleNote.initialTime,
              lastModified: singleNote.lastModified,
            });
          }
        });
      }
    },
  },
});

export const {
  saveNoteLocally,
  setActiveNote,
  addNotes,
  deleteNote,
  insertSavedNotes,
  emptyNoteAfterLogout,
} = AddNote.actions;

export default AddNote.reducer;
