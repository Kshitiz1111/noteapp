import React from "react";
import HomeNav from "../component/nav/HomeNav";
import ReadWriteContainer from "../component/ActiveReadWrite/ReadWriteContainer";
import RecentTab from "../features/recent/RecentTab";
import { FaSistrix } from "react-icons/fa";
import CreateNote from "../component/nav/CreateNoteBtn";

const HomePage = () => {
  return (
    <div>
      <div className="rounded-full fixed bottom-5 right-5 w-fit z-10 shadow-md">
        <CreateNote></CreateNote>
      </div>

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
