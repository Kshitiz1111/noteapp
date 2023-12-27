import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { setActiveNote } from "../../../../features/SliceAddNote";

const BackBtn = () => {
  let navigate = useNavigate();

  const activeNote = useAppSelector((state) => state.getNotes.activeNote);
  const dispatch = useAppDispatch();

  function clearActiceNote() {
    if (activeNote) {
      dispatch(setActiveNote({ type: "tab", payload: activeNote }));
    }
    navigate("/");
  }
  return (
    <div
      className="text-4xl -ml-2 cursor-pointer"
      onClick={() => clearActiceNote()}
    >
      <FaAngleLeft></FaAngleLeft>
    </div>
  );
};

export default BackBtn;
