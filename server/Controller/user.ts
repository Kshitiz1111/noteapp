import { RequestHandler } from "express";
import User from "../Model/user";
import { userInfoType } from "../types/userType";
import bcrypt, { genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
    // encrypt the password
    const hashedPwd = await bcrypt.hash(reqObj.pwd, 10);

    if (existingUsers.length <= 1) {
      result = await user.register(hashedPwd);
      res.status(200).send(`registerUserController${result}`);
    } else {
      // check for duplicate user in database
      if (existingUsers.some((user) => user.u_name === reqObj.name)) {
        return res
          .status(409)
          .json({ message: `Username ${reqObj.name} already exists` });
      }

      result = await user.register(hashedPwd);
      res.status(201).json({ success: `new user ${reqObj.name} created` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginUserController: RequestHandler = async (req, res) => {
  try {
    let reqObj: userInfoType = req.body;
    if (!reqObj.name || !reqObj.pwd) {
      return res.status(400).json({
        message: "user and password is required",
      });
    }
    let user = new User(reqObj);

    const existingUsers = await user.getAllUser();
    const foundUser = existingUsers.find(
      (person) => person.u_name === reqObj.name
    );
    if (!foundUser) {
      return res.sendStatus(401); //unauthorized
    }
    //evaluate password
    const match = await bcrypt.compare(reqObj.pwd, foundUser.u_pwd);
    if (match) {
      //create JWTs
      const accessToken = sign(
        { username: foundUser.u_name },
        String(process.env.ACCESS_TOKEN_SECRET),
        { expiresIn: "30s" }
      );
      const refreshToken = sign(
        { username: foundUser.u_name },
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: "1d" }
      );
      const updatedUser = await user.addRftk(foundUser.u_id, refreshToken);
      console.log(updatedUser);
      return res.json({ success: `user ${reqObj.name} is logged in!` });
    } else {
      return res.sendStatus(401); //unauthorized
    }
  } catch (error) {}
};
