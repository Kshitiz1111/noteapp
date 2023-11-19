import React from "react";
import { FaAngleLeft, FaBell } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toggle } from "../../../features/Toggle";
import Search from "../../../features/search/Search";

const SidePanelNav = () => {
  const navToggleStatus = useAppSelector((state) => state.toggleStatus.status);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="w-full flex p-2 items-center justify-between text-2xl">
        <div className="text-4xl">
          <FaAngleLeft></FaAngleLeft>
        </div>
        <div>
          <Search />
        </div>
        <div className="text-4xl">
          <FaXmark onClick={() => dispatch(toggle(navToggleStatus))}></FaXmark>
        </div>
      </div>
    </>
  );
};

export default SidePanelNav;
