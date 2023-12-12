import express, { Application, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";
import { corsOptions } from "./Config/corsOptions";
//all routers object in between
import userRouter from "./Router/user";
//all routers object in between

const logger = require("morgan");
const app: Application = express();

//Middleware
app.use(cors(corsOptions));

app.use(logger("dev"));

app.use(express.json()); //parse json bodies in the request object

//routers
app.use("/api/v1/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("✅ Server started sucessfully!");
});
