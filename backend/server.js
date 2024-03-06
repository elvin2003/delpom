const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io")

// https://delpom-front.vercel.app  FRONT
// https://delpom.vercel.app/  BACK

FRONT_URL = "https://delpom-front.vercel.app";
BACK_URL = "https://delpom.vercel.app/";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})

io.on('connection', (socket) => {
  //console.log('New client connected: ' + socket.id);
  io.emit('user connected', `${socket.id} connected`);

  // Event listener for when a client sends a message
  socket.on('chat message', (message) => {
    //console.log('Message received: ' + message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Event listener for when a client disconnects
  socket.on('disconnect', () => {
    //console.log('Client disconnected: ' + socket.id);
    io.emit('user disconnected', `${socket.id} disconnected`);
  });
});


app.get("/", (req, res) => {
  res.send("gett");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});