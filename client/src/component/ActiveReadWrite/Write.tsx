import React from "react";
import { FaEdit } from "react-icons/fa";

const Write = () => {
  return (
    <div className="sm:w-full lg:w-3/5 relative bg-gray-300 p-4 rounded-xl">
      <FaEdit className="absolute top-2 right-2 text-3xl text-gray-900"></FaEdit>
      <div className="mb-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Human Biology</h2>
          <span className="text-sm mr-8 text-gray-600">2hr ago</span>
        </div>
        <span className="text-xs text-gray-600">science/medical/biology</span>
      </div>
      <div>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. In publishing
          and graphic design, Lorem ipsum is a placeholder text commonly used to
          demonstrate the visual form of a document or a typeface without
          relying on meaningful content. Lorem ipsum may be used as a
          placeholder before final copy is available In publishing and graphic
          design, Lorem ipsum is a placeholder text commonly used to demonstrate
          the visual form of a document or a typeface without relying on
          meaningful content. Lorem ipsum may be used as a placeholder before
          final copy is available. In publishing and graphic design, Lorem ipsum
          is a placeholder text commonly used to demonstrate the visual form of
          a document or a typeface without relying on meaningful content. Lorem
          ipsum may be used as a placeholder before final copy is available
        </p>
      </div>
    </div>
    // <></>
  );
};

export default Write;
