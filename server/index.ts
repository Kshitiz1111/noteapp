import express, {
  Application,
  Request,
  Response,
  NextFunction,
  response,
} from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import { Server } from "socket.io";
import http from "http";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./Config/corsOptions";
//firebase
import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import path from "path";
//firebase

//all routers object in between
import userRouter from "./Router/user";
import noteRouter from "./Router/note";
//all routers object in between

const logger = require("morgan");
const app: Application = express();

//firebase
const serviceAccount = require(path.resolve(__dirname,
  "../manage-notification-745f1-firebase-adminsdk-a834y-18bcde19ad.json"
));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//firebase

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
    if (eventList.length !== 0 && eventList.id !== event.id) {
      eventList.unshift(event);
      socket.emit("sendSchedules", eventList);
    } else if (eventList.length == 0) {
      eventList.unshift(event);
      socket.emit("sendSchedules", eventList);
    }
  });

  let interval = setInterval(function () {
    if (eventList.length > 0) {
      // console.log("00")

      for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].time == JSON.stringify(moment().format("LLLL"))) {
          // console.log("hello");
          socket.emit("notification", {
            id: eventList[i].id,
            title: eventList[i].title,
            reason: eventList[i].reason,
            time: eventList[i].time,
          });
          //firebase
          const message = {
            notification: {
              title: eventList[i].title,
              body: eventList[i].reason,
            },
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbWUiLCJpYXQiOjE3MDQyNjg4MTcsImV4cCI6MTcwNDI2ODgyN30.om8iney4TNQfIsTEcLIG-XS972U9x1Rmx32OVyAk7YE",
          };

          function sendPushNotification(message: any) {
            admin
              .messaging()
              .send(message)
              .then((response) => {
                console.log("successfully send message:", response);
              })
              .catch((error) => {
                console.log("error sending message:", error);
              });
          }
          sendPushNotification(message);
          //firebase
          eventList = eventList.filter((item: any, index: any) => {
            return item.id !== eventList[i].id;
          });
        }
        console.log(eventList);
      }
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
