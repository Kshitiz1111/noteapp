import React from "react";
import SidePanel from "./SidePanel/SidePanel";
import CreateNote from "./CreateNoteBtn";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveNote } from "../../features/SliceAddNote";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { toggle } from "../../features/SliceToggle";

const SideNav = () => {
  const notes = useAppSelector((state) => state.getNotes.notes);
  const navToggleStatus = useAppSelector((state) => state.toggleStatus.status);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleActiveNote(note: any) {
    dispatch(setActiveNote({ type: "homenote", payload: note }));
    navigate("/addnew");
    dispatch(toggle(navToggleStatus));
  }

  return (
    <div className="flex ">
      <div className="overflow-y-scroll w-full h-screen sm:w-80 fixed top-0 left-0 bg-gray-600 pb-4 pt-0 z-10">
        <div className="fixed top-0 left-0 right-0 bg-gray-600 text-4xl flex justify-between px-4 py-2">
          <span className="text-gray-400">notes</span>
          <FaXmark onClick={() => dispatch(toggle(navToggleStatus))}></FaXmark>
        </div>
        <div className="flex mt-20 bg-gray-600">
          <div className="w-full p-2 flex flex-col">
            {notes.length > 0 ? (
              notes?.map((note: any) => (
                <div
                  className="w-full p-2 mb-2 bg-white rounded shadow"
                  onClick={() => handleActiveNote(note)}
                >
                  <h2 className="text-xl font-bold">{note.title}</h2>

                  <p className="text-sm text-gray-600">
                    Last modified: {note.lastModified}
                  </p>

                  <p className="text-base text-gray-700 overflow-ellipsis overflow-hidden">
                    {note?.body?.substring(0, 50)}
                  </p>
                </div>
              ))
            ) : (
              <p>no notes found</p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="z-20">
        <SidePanel></SidePanel>
      </div> */}
    </div>
  );
};

export default SideNav;
