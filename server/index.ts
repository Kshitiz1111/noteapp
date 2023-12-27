import express, { Application, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import { Server } from "socket.io";
import http from "http";
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
const httpServer = http.createServer(app);
app.use(cors(corsOptions));

app.use(logger("dev"));

app.use(express.json()); //parse json bodies in the request object

app.use(cookieParser()); //middleware for cookies

//routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

//socket io
const socketIO = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let eventList: any = [];
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //event listener for new events
  socket.on("newEvent", (event) => {
    eventList.unshift(event);
    socket.emit("sendSchedules", eventList);
  });

  /*
    The code snippet loops through the event list 
    and checks if it's time for any event 
    before sending a message containing 
    the event details to the React app
    */

  let interval = setInterval(function () {
    if (eventList.length > 0) {
      // console.log("00")

      for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].time == JSON.stringify(moment().format("LLLL"))) {
          // console.log("hello");
          socket.emit("notification", {
            id: eventList[i].id,
            title: eventList[i].title,
            time: eventList[i].time,
          });
          eventList = eventList.filter((item: any, index: any) => {
            return item.id !== eventList[i].id;
          });
        }
      }
      // console.log(eventList);
    }
  }, 1000);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

httpServer.listen(4001, () => {
  console.log(`socket.io server listening on ${4001}`);
});

//socket io

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("✅ Server started sucessfully!");
});
