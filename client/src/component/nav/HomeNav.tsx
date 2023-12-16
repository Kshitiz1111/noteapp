import React from "react";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import SideNav from "./SideNav";
import { toggle } from "../../features/SliceToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../features/userAuth/SliceAuth";

const HomeNav = () => {
  const navToggleStatus = useAppSelector((state) => state.toggleStatus.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/v1/user/logout");
      if (response.status === 204) {
        dispatch(
          setAuth({
            name: null,
            accessToken: null,
          })
        );
        navigate("/login");
      } else {
        console.log("network error");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          <div className="text-3xl" aria-describedby={id} onClick={handleClick}>
            <FaUserCircle></FaUserCircle>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div
              onClick={handleLogout}
              className="flex items-center cursor-pointer hover:bg-gray-100 text-sm font-semibold rounded-md px-3 py-2"
            >
              logout
            </div>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default HomeNav;
