import React from "react";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import SideNav from "./SideNav";
import { toggle } from "../../features/SliceToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { FaClipboardList } from "react-icons/fa6";

const HomeNav = () => {
  const navToggleStatus = useAppSelector((state) => state.toggleStatus.status);
  const notifCount = useAppSelector((state) => state.getNotif.totalNotif);
  const notifications = useAppSelector((state) => state.getNotif);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useLogout();
  const handleLogout = async () => {
    await logout();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorElNotif, setAnchorElNotif] =
    React.useState<HTMLDivElement | null>(null);

  const openNotif = Boolean(anchorElNotif);
  const notifId = open ? "simple-notif-popover" : undefined;

  const handleNotifClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElNotif(event.currentTarget);
    console.log("ldld");
  };

  const handleNotifClose = () => {
    setAnchorElNotif(null);
    console.log("kdk");
  };

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
          <div
            className="relative flex items-center justify-center cursor-pointer"
            aria-describedby={notifId}
            onClick={handleNotifClick}
          >
            {notifCount !== 0 ? (
              <span className="absolute top-0 left-0 -mt-3 -ml-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                {notifCount}
              </span>
            ) : (
              <></>
            )}

            <FaBell></FaBell>
          </div>
          <Popover
            id={notifId}
            open={openNotif}
            anchorEl={anchorElNotif}
            onClose={handleNotifClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {notifCount !== 0 ? (
              <div className="rounded-lg overflow-hidden shadow-md bg-white">
                <span className="flex text-sm px-4">
                  <FaClipboardList className="mt-1 ml-1 mr-1 text-black text-md" />{" "}
                  to review
                </span>

                <ul className="divide-y divide-gray-200">
                  {notifications.notifContent?.map((item) => (
                    <li key={item.id} className="py-2 px-2 hover:bg-gray-100">
                      <span className="block text-xl m-0 font-semibold text-gray-900">
                        {item.title}
                      </span>
                      <span className="block text-sm ml-2 -mt-1 text-gray-400">
                        {item.reason}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-4">no notification</div>
            )}
          </Popover>

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
