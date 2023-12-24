import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setActiveNote } from "../SliceAddNote";

const RecentTab = () => {
  const notes = useAppSelector((state) => state.getNotes.notes);
  const dispatch = useAppDispatch();

  function handleActiveNote(note: any) {
    dispatch(setActiveNote({ type: "tab", payload: note }));
  }
  const activeNote = useAppSelector((state) => state.getNotes.activeNote);

  return (
    <div className="flex gap-2 w-3/4 ">
      {notes ? (
        notes.map((note, index) => {
          return (
            <div
              className={`relative w-fit p-3 bg-gray-400 rounded-2xl ${
                note.id === activeNote?.id ? "border-2 border-black" : ""
              }`}
              onClick={() => handleActiveNote(note)}
            >
              {/* <span className='absolute top-1 right-1'>{status}</span> */}
              <h2 className="text-xl font-bold">{note.title}</h2>
              {/* <h2 className='text-xs'>{path}</h2> */}
            </div>
          );
        })
      ) : (
        <p>no recent list</p>
      )}
    </div>
  );
};

export default RecentTab;
