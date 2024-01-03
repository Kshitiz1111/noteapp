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
// import admin from "firebase-admin";
// import { applicationDefault } from "firebase-admin/app";
// import path from "path";
//firebase

//all routers object in between
import userRouter from "./Router/user";
import noteRouter from "./Router/note";
//all routers object in between

const logger = require("morgan");
const app: Application = express();

//firebase

// admin.initializeApp({
//   credential: applicationDefault(),
// });

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
          // const message = {
          //   notification: {
          //     title: eventList[i].title,
          //     body: eventList[i].reason,
          //   },
          //   token:
          //     "dfAHmWl2p--CqX7_u5Jsuv:APA91bGrccE2sK77B_c220ECdBmhMK5w0p2-bXRFuf3ftdCu_ecciyANtiYCA1LLwBb_2N8MEnfpRFfcmPyDgXWSCn9R2BZTSP5Gm7--unr55L3zZnSg7ooDAPDVQV62feyAgFrsqRoD",
          // };

          // function sendPushNotification(message: any) {
          //   admin
          //     .messaging()
          //     .send(message)
          //     .then((response) => {
          //       console.log("successfully send message:", response);
          //     })
          //     .catch((error) => {
          //       console.log("error sending message:", error);
          //     });
          // }
          // sendPushNotification(message);
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
