import React from "react";
import SidePanelNav from "./SidePanelNav";

const SidePanel = () => {
  return (
    <div className="fixed right-0 top-0 sm:left-80 left-0 bottom-0 bg-gray-300">
      <SidePanelNav />
    </div>
  );
};

export default SidePanel;
