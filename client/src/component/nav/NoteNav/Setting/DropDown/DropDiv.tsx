import React from "react";
import AutoSave from "./AutoSave";
import ScheduleBtn from "./ScheduleBtn";
import ChangeStatusBtn from "./ChangeStatusBtn";
import MoveFileBtn from "./MoveFileBtn";

const Container = () => {
  return (
    <div className="p-2 bg-white shadow-sm">
      <AutoSave />
      <ScheduleBtn />
      <ChangeStatusBtn />
      <MoveFileBtn />
    </div>
  );
};

export default Container;
