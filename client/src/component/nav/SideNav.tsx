import React from "react";
import SidePanel from "./SidePanel/SidePanel";
import CreateNote from "./CreateNoteBtn";

const SideNav = () => {
  return (
    <div className="flex ">
      <div className="w-full h-screen sm:w-80 fixed top-0 left-0 bg-gray-600 py-4 z-10">
        <h2 className="text-2xl font-bold text-gray-300 text-center py-1 ">
          note
        </h2>
        <div className="">
          <ul className=" text-lg font-semibold w-full">
            <li className="w-full text-white hover:border-r-8 hover:border-gray-300 hover:bg-gray-500 pl-4 py-1 m-0 ">
              <a href="./">MATH</a>
            </li>
            <li className="w-full text-white hover:border-r-8 hover:border-gray-300 hover:bg-gray-500  pl-4 py-1 m-0 ">
              <a href="./">SCIENCE</a>
            </li>
            <li className="w-full text-white hover:border-r-8 hover:border-gray-300 hover:bg-gray-500  pl-4 py-1 m-0 ">
              <a href="./">COMPUTER SCIENCE</a>
            </li>
            <li className="w-full text-white hover:border-r-8 hover:border-gray-300 hover:bg-gray-500  pl-4 py-1 m-0 ">
              <a href="./">ART</a>
            </li>
            <li className="w-full text-white hover:border-r-8 hover:border-gray-300 hover:bg-gray-500  pl-4 py-1 m-0 ">
              <a href="./">LANGUAGE</a>
            </li>
          </ul>
          <hr className="my-4 w-3/4 m-auto" />

          <div className="flex items-center space-x-2 p-2 ">
            <p className="ml-4  text-gray-200 text-lx font-bold">
              create new note
            </p>
            <CreateNote />
          </div>
        </div>
      </div>
      <div className="z-20">
        <SidePanel></SidePanel>
      </div>
    </div>
  );
};

export default SideNav;
