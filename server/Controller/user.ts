import { RequestHandler } from "express";
import User from "../Model/user";
import { userInfoType } from "../types/userType";
import bcrypt from "bcrypt";
export const registerUserController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    let reqObj: userInfoType = req.body;
    if (!reqObj.name || !reqObj.email || !reqObj.pwd) {
      return res.status(400).json({
        message: "user, email and password is required",
      });
    }

    let user = new User(reqObj);

    const existingUsers = await user.getAllUser();

    let result;
    if (existingUsers.length <= 1) {
      result = await user.register();
      res.status(200).send(`registerUserController${result}`);
    } else {
      // check for duplicate user in database
      if (existingUsers.some((user) => user.u_name === reqObj.name)) {
        return res
          .status(409)
          .json({ message: `Username ${reqObj.name} already exists` });
      }
      result = await user.register();
      res.status(200).send(`registerUserController${result}`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
