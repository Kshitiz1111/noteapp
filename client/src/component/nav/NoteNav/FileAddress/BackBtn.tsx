import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  let navigate = useNavigate();
  return (
    <div
      className="text-4xl -ml-2 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <FaAngleLeft></FaAngleLeft>
    </div>
  );
};

export default BackBtn;
