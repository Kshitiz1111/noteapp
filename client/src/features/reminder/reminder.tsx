import React from "react";
// import Clock from "Clock";
import CreateSchedule from "./CreateSchedule";
import Schedules from "./Schedules";
import { io } from "socket.io-client";

//React Toastify imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
//👉🏻 Import the functions from the Firebase.js file
// import { getTokenFromFirebase, onMessageListener } from "./firebase";
import { removeNotif, setNotif } from "../SliceReminder";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const socket = io("http://localhost:4001");

interface ReminderProps {
  showReminderDiv: boolean;
}

const Reminder: React.FC<ReminderProps> = ({ showReminderDiv }) => {
  const [schedules, setSchedules] = React.useState([]);
  const loggedUser = useAppSelector((state) => state.userAuth?.name);
  const activeNote = useAppSelector((state) => state.getNotes?.activeNote);

  const dispatch = useAppDispatch();
  //   React.useEffect(() => {
  //     //👉🏻Logs the device token to the console
  //     getTokenFromFirebase();

  //     //👉🏻Listen and logs the push messages from the server.
  //     onMessageListener()
  //       .then((payload: any) => {
  //         toast.success(` It's time for ${payload.notification.title}`);
  //         console.log("From Message", payload);
  //       })
  //       .catch((err: any) => console.log("failed: ", err));

  //     //....socket.io listeners
  //   }, []);

  React.useEffect(() => {
    //listens for the event list from the backend
    socket.on("sendSchedules", (schedules) => {
      setSchedules(schedules);
    });
    //Listens for the notification from the server
    socket.on("notification", (data: any) => {
      toast.success(` It's time for ${data.title}`);
      dispatch(
        setNotif({
          id: data.id,
          title: data.title,
          reminderReason: data.reason,
          initTime: data.time,
        })
      );
      console.log(`server notif data: ${JSON.stringify(data)}`);
    });
  }, [schedules]);

  return (
    <div className="absolute bg-gray-300 p-5 top-0 right-0 left-0 shadow-lg rounded-lg">
      {/* <Clock /> */}
      <CreateSchedule socket={socket} />
      <Schedules schedules={schedules} />
      <ToastContainer />
    </div>
  );
};

export default Reminder;
