import React from "react";
import HomePage from "./page/HomePage";
import { Routes, Route } from "react-router-dom";
import NoteContainer from "./component/AddNewNote/NoteContainer";
import Login from "./features/userAuth/Login";
import Register from "./features/userAuth/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/addnew" element={<NoteContainer />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <div className="App">
          <HomePage></HomePage>
        </div> */}
      </Routes>
    </div>
  );
}

export default App;
