import { RequestHandler } from "express";
import Notes from "../Model/notes";

export const saveNote: RequestHandler = async (req, res, next) => {
  try {
    let reqObj = req.body;
    // console.log(`note created: ${JSON.stringify(reqObj)}`);
    let note = new Notes(reqObj);
    let result = await note.save();
    // console.log(`note created: ${JSON.stringify(result)}`);
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    //here
    return res.status(500).end();
    next();
  }
};
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // console.log(`user: ${JSON.stringify(req.params.user)}`);
    let note = new Notes({
      user: "",
      note: "",
    });
    let result = await note.getUserNotes(req.params.user);
    // console.log(`got note: ${JSON.stringify(result)}`);
    return res.status(200).json(result?.u_notes);
  } catch (error) {
    console.error(error);
    //here
    return res.status(500).end();
    next();
  }
};
export const delNote: RequestHandler = async (req, res, next) => {
  let reqObj = req.body;
  try {
    // console.log(`user: ${JSON.stringify(req.params.user)}`);
    let note = new Notes(reqObj);
    let result = await note.del();
    // console.log(`deleted note: ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    //here
    return res.status(500).end();
    next();
  }
};
