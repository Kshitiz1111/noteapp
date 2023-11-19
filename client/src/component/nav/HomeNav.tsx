import React from "react";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import SideNav from "./SideNav";
import { toggle } from "../../features/Toggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const HomeNav = () => {
  const navToggleStatus = useAppSelector((state) => state.toggleStatus.status);
  const dispatch = useAppDispatch();

  return (
    <>
      <div style={{ display: navToggleStatus }}>
        <SideNav />
      </div>
      <div className="w-full flex p-6 items-center justify-between text-2xl">
        <div>
          <FaBars onClick={() => dispatch(toggle(navToggleStatus))}></FaBars>
        </div>
        <div>note</div>
        <div className="flex w-20 justify-between items-center">
          <div className="">
            <FaBell></FaBell>
          </div>
          <div className="text-3xl">
            <FaUserCircle></FaUserCircle>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNav;
