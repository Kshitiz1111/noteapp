import React, { useEffect } from "react";
import HomeNav from "../component/nav/HomeNav";
import ReadWriteContainer from "../component/ActiveReadWrite/ReadWriteContainer";
import RecentTab from "../features/recent/RecentTab";
import { FaSistrix } from "react-icons/fa";
import CreateNote from "../component/nav/CreateNoteBtn";
import { useNavigate } from "react-router-dom";
import { insertSavedNotes } from "../features/SliceAddNote";
import axios from "../api/axios";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Reminder from "../features/reminder/reminder";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.userAuth?.name);
  const ReminderDisplay = useAppSelector((state) => state.getNotif.reminderDiv);

  const notes = useAppSelector((state) => state.getNotes.notes.length);

  const getNotesFromServer = async () => {
    try {
      await axios
        .get(`/api/v1/note/get/${loggedUser}`)
        .then((response) => {
          // console.log(response.data); // Access the response data
          dispatch(insertSavedNotes({ note: response.data, user: loggedUser }));
        })
        .catch((error) => {
          console.error(error); // Handle any errors
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getNotesFromServer();
  }, [notes]);

  // const viewUsers = () => navigate("/admin");
  return (
    <div>
      <div className="rounded-full fixed bottom-5 right-5 w-fit z-10 shadow-md">
        <CreateNote></CreateNote>
      </div>
      {/* <button
        className="rounded-lg px-4 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600"
        onClick={viewUsers}
      >
        view users
      </button> */}
      <HomeNav />
      <div className="px-1 py-6 flex ">
        <div className="w-full overflow-x-scroll">
          <RecentTab />
        </div>
        <div className="flex justify-center items-center bg-black w-14 ml-1 rounded-md">
          <div className="relative p-2 rounded-lg">
            <span className="text-lg text-white">
              <FaSistrix />
            </span>
          </div>
        </div>
      </div>
      <ReadWriteContainer></ReadWriteContainer>
    </div>
  );
};

export default HomePage;
