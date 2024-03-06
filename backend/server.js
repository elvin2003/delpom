const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io")

// https://delpom-front.vercel.app  FRONT
// https://delpom.vercel.app/  BACK https://delpom-back.onrender.com/



FRONT_URL = "https://delpom-front.vercel.app";
BACK_URL = "https://delpom.vercel.app/";


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

const server = http.createServer(app);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})

//vercel cors problem 
// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// const handler = (req, res) => {
//   const d = new Date()
//   res.end(d.toString())
// }

// module.exports = allowCors(handler)
//vercel cors problem 

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