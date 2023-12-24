import express, { Application, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./Config/corsOptions";
//all routers object in between
import userRouter from "./Router/user";
import noteRouter from "./Router/note";
//all routers object in between

const logger = require("morgan");
const app: Application = express();

//Middleware
app.use(cors(corsOptions));

app.use(logger("dev"));

app.use(express.json()); //parse json bodies in the request object

app.use(cookieParser()); //middleware for cookies

//routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("✅ Server started sucessfully!");
});
