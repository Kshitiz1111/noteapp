import React from "react";
import HomePage from "./page/HomePage";
import { Routes, Route } from "react-router-dom";
import NoteContainer from "./component/AddNewNote/NoteContainer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/addnew" element={<NoteContainer />}></Route>
        {/* <div className="App">
          <HomePage></HomePage>
        </div> */}
      </Routes>
    </div>
  );
}

export default App;
