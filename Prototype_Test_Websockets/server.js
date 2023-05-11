const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const port = 3000;
const test = require('./test.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["content-type"]
  }
}); //creating a socket.io instance on top of the HTTP Server

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.get('/client.js', (req, res) => {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/client.js');
  });

io.on('connection', socket =>{
    console.log('New user connected');
    test.createGame(io, socket)
})

server.listen(port, () =>
    console.log(`Listening on ${port}`));