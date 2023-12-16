import { RequestHandler } from "express";
import User from "../Model/user";
import { userInfoType } from "../types/userType";
import bcrypt, { genSalt } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
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
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({ accessToken });
    } else {
      return res.sendStatus(401); //unauthorized
    }
  } catch (error) {}
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    let reqObj: userInfoType = req.body;
    let user = new User(reqObj);

    const existingUsers = await user.getAllUser();
    return res.json({ existingUsers });
  } catch (error) {}
};

export const refreshTokenController: RequestHandler = async (req, res) => {
  let reqObj: userInfoType = req.body;
  let user = new User(reqObj);
  const cookie = req.cookies;
  console.log(`this is cookie(logout): ${JSON.stringify(req.cookies)}`);

  if (!cookie?.jwt) return res.sendStatus(401);

  const refreshToken = cookie.jwt;
  const existingUsers = await user.getAllUser();
  const foundUser = existingUsers.find(
    (person) => person.u_rftk === refreshToken
  );
  if (!foundUser) {
    return res.sendStatus(403); //forbidden
  }

  //evaluate jwt
  verify(
    refreshToken,
    String(process.env.REFRESH_TOKEN_SECRET),
    (err: any, decoded: any) => {
      if (err || foundUser.u_name !== decoded.username)
        return res.sendStatus(403);
      const accessToken = sign(
        { username: decoded.username },
        process.env.ACCESS_TOKEN_SECRET ?? "",
        { expiresIn: "30s" }
      );

      return res.json({ accessToken });
    }
  );

  try {
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).end();
  }
};

export const logoutUserController: RequestHandler = async (req, res) => {
  try {
    let reqObj: userInfoType = req.body;
    let user = new User(reqObj);

    const cookie = req.cookies;
    console.log(`this is cookie(logout): ${JSON.stringify(req.cookies)}`);
    if (!cookie?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookie.jwt;

    //check if there is refresh token in db
    const existingUsers = await user.getAllUser();
    console.log(`existing users: ${JSON.stringify(existingUsers)}`);
    const foundUser = existingUsers.find(
      (person) => person.u_rftk === refreshToken
    );
    console.log(`logout user: ${JSON.stringify(foundUser)}`);
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        // secure: true,
        // maxAge: 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(204); //no content
    }

    //delete the refresh token on the database of a given user
    const logoutUser = await user.delRftk(foundUser.u_id);
    if (!logoutUser) return res.sendStatus(404); // user

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      // secure: true,
      // maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204); // resource updataed sucessfully
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).end();
  }
};
