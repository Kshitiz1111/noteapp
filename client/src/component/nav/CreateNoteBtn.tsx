import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import NoteContainer from "../AddNewNote/NoteContainer";

const CreateNoteBtn = () => {
  return (
    <div>
      <div className="p-1 rounded-full shadow-xs bg-gray-200 hover:cursor-pointer ">
        <a href="/addnew">
          <FaPlusCircle className="text-4xl text-black " />
        </a>
      </div>
    </div>
  );
};

export default CreateNoteBtn;
