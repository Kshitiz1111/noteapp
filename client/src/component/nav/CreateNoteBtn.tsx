import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NoteContainer from "../AddNewNote/NoteContainer";

const CreateNoteBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addnew");
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className="p-1 rounded-full shadow-xs bg-gray-200 hover:cursor-pointer "
      >
        <FaPlusCircle className="text-4xl text-black " />
      </div>
    </div>
  );
};

export default CreateNoteBtn;
