import React from "react";
import FileAddressDiv from "./FileAddress/FileAddressDiv";
import Btn from "./Setting/Btn";

const NoteNavDiv = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center">
      <FileAddressDiv />
      <Btn />
    </div>
  );
};

export default NoteNavDiv;
