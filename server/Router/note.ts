import express, { Request, Response, Router } from "express";
import { saveNote, getNotes, delNote } from "../Controller/note";

const noteRouter: Router = express.Router();
//note router
noteRouter.route("/save").post(saveNote);
noteRouter.route("/get/:user").get(getNotes);
noteRouter.route("/del").post(delNote);

export default noteRouter;
