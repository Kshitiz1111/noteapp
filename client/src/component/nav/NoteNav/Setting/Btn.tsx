import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Popover from "@mui/material/Popover";
import { deleteNote } from "../../../../features/SliceAddNote";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import axios from "../../../../api/axios";
import useDeleteNote from "../../../../hooks/useDeleteNote";

const Btn = () => {
  const dispatch = useAppDispatch();
  const activeNote = useAppSelector((state) => state.getNotes.activeNote);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [confirmDelDiv, setConfirmDelDiv] = React.useState<Boolean>();
  let [count, setCount] = React.useState(0);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setCount(0);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCount(0);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { deleteNoteOnServer } = useDeleteNote();

  const handleDelete = (noteId: any) => {
    setCount(count++);
    setConfirmDelDiv(true);
    dispatch(deleteNote(noteId));
    deleteNoteOnServer(count);
  };
  const handleConfirmDelete = () => {
    setCount(count++);
    setConfirmDelDiv(false);
    console.log(confirmDelDiv);
    setAnchorEl(null);
    deleteNoteOnServer(count);
  };

  return (
    <>
      {console.log(confirmDelDiv)}
      <div className="text-4xl cursor-pointer" onClick={handleClick}>
        <IoSettingsSharp />
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
        <div className="cursor-pointer hover:bg-gray-100 text-sm font-semibold rounded-md px-3 py-2">
          <div
            className="relative mb-2 items-center px-4 py-2 rounded-md font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:ring-4 focus:ring-red-300"
            onClick={() => handleDelete(activeNote?.id)}
          >
            delete
            <div
              className={`${
                confirmDelDiv ? "block" : "hidden"
              } absolute top-0 left-0 cursor-pointer hover:bg-gray-100 text-sm font-semibold rounded-md px-3 py-2`}
            >
              <div
                className={`${
                  confirmDelDiv ? "block" : "hidden"
                } mb-2 items-center px-4 py-2 rounded-md font-medium text-green-700 bg-green-100 hover:bg-green-200 focus:ring-4 focus:ring-green-300`}
                onClick={() => handleConfirmDelete()}
              >
                are you sure
              </div>
            </div>
          </div>
          <div className="items-center px-4 py-2 rounded-md font-medium text-black bg-gray-100 hover:bg-gray-400 focus:ring-4 focus:ring-gray-400">
            <span>set reminder</span>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default Btn;
