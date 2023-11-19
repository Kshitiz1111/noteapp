import React from "react";
import BackBtn from "./BackBtn";
import FileAddress from "./FileAddress";
import CreateSubFileBtn from "./CreateSubFileBtn";

const FileAddressDiv = () => {
  return (
    <div className="flex items-center">
      <BackBtn />
      <FileAddress />
      <CreateSubFileBtn />
    </div>
  );
};

export default FileAddressDiv;
