import express, { Application, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";
//all routers object in between
import userRouter from "./Router/user";
//all routers object in between

const logger = require("morgan");

const app: Application = express();

//Middleware
const router = express.Router();
app.use(express.json()); //parse json bodies in the request object
app.use(cors());
app.use(logger("dev"));

//Redirect request to router
app.use("/api/v1/user", userRouter);

app.get("/api", (req: Request, res: Response) => {
  res.send("api route working");
});
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log("✅ Server started sucessfully!");
});
