import express from "express";
import http from "http";
import * as socketio from "socket.io";
const port = 4001;
const app = express();
const httpServer = http.createServer(app);

//Here is where we created new instance of socket.io
const server = new socketio.Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// This new instance listening for a 'connection' Event and will run the provided function anytime this happens.
server.on("connection", (socket) => {
  console.log("connected");

  //Creating Random Array List of numbers between 1000 to 5000 for each second
  setInterval(
    () =>
      socket.emit(
        "data1",
        Array.from({ length: 9 }, () => Math.floor(Math.random() * 4000) + 1000)
      ),
    1000
  );
});

httpServer.listen(port);
