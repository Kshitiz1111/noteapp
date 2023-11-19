import React from "react";
import NoteNavDiv from "../nav/NoteNav/NoteNavDiv";
import { FaCheckCircle } from "react-icons/fa";

const NoteContainer = () => {
  const [header, setHeader] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  function handleSelect(e: React.SyntheticEvent<HTMLTextAreaElement>) {
    e.currentTarget.style.backgroundColor = "white";
  }
  function handleUnSelect(e: React.SyntheticEvent<HTMLTextAreaElement>) {
    const ele = e.currentTarget;
    const eleValue = ele.value;
    ele.getAttribute("id") === "heading"
      ? setHeader(eleValue)
      : setContent(eleValue);

    if (eleValue.length > 0) {
      ele.getAttribute("id") === "heading"
        ? (ele.style.backgroundColor = "#9CA3AF")
        : (ele.style.backgroundColor = "#D1D5DB");
    }
    ele.style.height = `${ele.scrollHeight}px`;

    console.log(ele.scrollHeight);

    ele.style.overflow = "auto";
  }

  return (
    <>
      <div className="w-full bg-white">
        <div className="w-full">
          <NoteNavDiv />
        </div>
        <div className="relative bg-gray-400 rounded-lg">
          <div className="absolute top-2 right-2 text-3xl text-gray-300">
            <FaCheckCircle />
          </div>
          <div className="p-2 h-screen">
            <div>
              <div className="flex flex-col">
                <textarea
                  id="heading"
                  onSelect={(e) => handleSelect(e)}
                  onBlur={(e) => handleUnSelect(e)}
                  maxLength={40}
                  cols={10}
                  rows={1}
                  className="p-1 text-2xl font-semibold bg-white rounded-lg w-3/4"
                ></textarea>
                <span className="text-xs p-2">jan 23</span>
              </div>
            </div>
            <div className="p-1 w-full h-96">
              <textarea
                id="content"
                onSelect={(e) => handleSelect(e)}
                onBlur={(e) => handleUnSelect(e)}
                className="p-1 bg-white rounded-lg w-full h-full"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteContainer;
