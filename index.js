const { createSocket } = require("dgram");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT;

//Route
app.get("/", (req, res) => {
  //   return res.json("Request received successfully");
  res.sendFile(__dirname + "/index.html");
});

//create connection
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("A User disconnected");
  });
  socket.on("message", (msg) => {
    console.log("Client message: " + msg);
  });

  //emit event
  socket.emit("server", "Message from server received");
  socket.emit("server1", "Message from server1 received");
});

//     socket.on('chat message', msg => {
//       io.emit('chat message', msg);
// });

//listening Port
http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
