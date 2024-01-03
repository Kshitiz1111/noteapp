import React from "react";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import SideNav from "./SideNav";
import { toggle } from "../../features/SliceToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { FaClipboardList } from "react-icons/fa6";
import { removeNotif } from "../../features/SliceReminder";

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
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {notifCount !== 0 ? (
              <div className="rounded-lg overflow-hidden bg-white max-w-xs mx-auto my-2">
                <div className="px-6 py-1">
                  <h2 className="text-lg font-bold text-gray-700">reminder</h2>
                  <ul className="mt-2">
                    {notifications.notifContent?.map((item) => (
                      <li
                        key={item.id}
                        className="px-2 py-1 rounded-lg border bg-gray-200 border-gray-600 mb-1 hover:cursor-pointer hover:bg-gray-100"
                        onClick={() => dispatch(removeNotif({ id: item.id }))}
                      >
                        <span className="text-xs text-gray-400 block">
                          AT: {item.time}
                        </span>
                        <span className="font-semibold text-gray-800 block">
                          Note Title: {item.title}
                        </span>
                        <span className="text-sm text-gray-600 block">
                          Reason: {item.reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
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
