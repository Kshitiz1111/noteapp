import React, { useState } from "react";
import { toast } from "react-toastify";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setNotif, removeNotif } from "../SliceReminder";
import shortUUID from "short-uuid";

const CreateSchedule = ({ socket }: any) => {
  const [tvalue, setValue] = useState(new Date());
  const [reminderReason, setReminderReason] = useState();
  const activeNote = useAppSelector((state) => state.getNotes?.activeNote);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let timeString = JSON.stringify(moment(tvalue).format("LLLL"));
    socket.emit("newEvent", {
      id: shortUUID.uuid(),
      title: activeNote?.title,
      reason: reminderReason,
      time: timeString,
    });
    //👇🏻 shows toast notifications
    toast.success(`${activeNote?.title} is successfully added!`);
  };

  var yesterday = moment().subtract(1, "day");
  var valid = function (current: any) {
    return current.isAfter(yesterday);
  };

  let inputProps = {
    placeholder: "click to pick date and time",
    disabled: false,
    // onMouseLeave: () => alert('schedule save')
  };
  function handleReminderDescription(e: any) {
    console.log(e.currentTarget.value);
    setReminderReason(e.currentTarget.value);
  }

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Create a Schedule</h2>
      </div>
      <span className="text-lg font-semibold">pick date and time</span>
      <Datetime
        inputProps={{
          style: {
            width: "200px",
            height: "30px",
            margin: "3px",
            padding: "20px",
            borderRadius: "50px",
            border: "1px solid black",
          },
        }}
        input={true}
        initialValue={new Date()}
        value={tvalue}
        onChange={(value) => {
          // Convert value to Date if necessary
          const dateValue: any =
            typeof value === "string" ? new Date(value) : value;
          setValue(dateValue);
        }}
        isValidDate={valid}
      />

      <span className="text-lg font-semibold">Reminder Description</span>
      <input
        type="text"
        className="m-1 p-2 rounded-full border border-black"
        onChange={(e) => handleReminderDescription(e)}
      />
      <form onSubmit={handleSubmit}>
        <button className="bg-black text-white mb-4 mt-6 py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
          save reminder
        </button>
      </form>
    </div>
  );
};

export default CreateSchedule;
