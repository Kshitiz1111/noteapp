import React from "react";
import HomePage from "./page/HomePage";
import { Routes, Route } from "react-router-dom";
import NoteContainer from "./component/AddNewNote/NoteContainer";
import Login from "./features/userAuth/Login";
import Register from "./features/userAuth/Register";
import Layout from "./component/Layout";
import Missing from "./component/Missing";
import AuthRequire from "./component/AuthRequired";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          {/* all the protected routes */}
          <Route element={<AuthRequire />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/addnew" element={<NoteContainer />}></Route>
          </Route>

          {/* catch all path */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
