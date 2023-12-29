import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setActiveNote } from "../../features/SliceAddNote";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const activeNote = useAppSelector((state) => state.getNotes.activeNote);

  const homeNotes = useAppSelector((state) =>
    state.getNotes.notes?.slice(
      0,
      state.getNotes.notes?.length > 10 ? 10 : state.getNotes.notes?.length
    )
  );

  function handleActiveNote(note: any) {
    dispatch(setActiveNote({ type: "homenote", payload: note }));
    navigate("/addnew");
  }

  return (
    <>
      {activeNote !== null ? (
        <div
          className="sm:w-full lg:w-1/3 sm:mb-1 relative bg-gray-300 p-4 rounded-xl border-2 border-black"
          onClick={() => handleActiveNote(activeNote)}
        >
          <FaCheckCircle className="absolute top-2 right-2 text-3xl text-gray-900"></FaCheckCircle>
          <div className="mb-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">{activeNote?.title}</h2>
              <div>
                <span className="text-sm mr-8 text-gray-600">
                  edited: {activeNote?.lastModified}
                </span>
              </div>
            </div>
            {/* <span className='text-xs text-gray-600'>science/medical/biology</span> */}
          </div>
          <div>
            <p>{activeNote?.body}</p>
          </div>
        </div>
      ) : (
        homeNotes?.map((note) => (
          <div
            className="sm:w-full lg:w-1/3 sm:mb-1 mb-2 relative bg-gray-300 p-4 rounded-xl"
            onClick={() => handleActiveNote(note)}
          >
            <FaCheckCircle className="absolute top-2 right-2 text-3xl text-gray-900"></FaCheckCircle>
            <div className="mb-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">{note?.title}</h2>
                <div>
                  <span className="text-sm mr-8 text-gray-600">
                    edited: {note?.lastModified}
                  </span>
                </div>
              </div>
              {/* <span className='text-xs text-gray-600'>science/medical/biology</span> */}
            </div>
            <div className="overflow-x-hidden">
              <p>{note?.body}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Read;
