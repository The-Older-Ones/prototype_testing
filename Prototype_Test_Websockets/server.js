const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const port = 3000;
const { fetchQuestion, fetchToken } = require('./questions.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server); //creating a socket.io instance on top of the HTTP Server

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.get('/client.js', (req, res) => {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/client.js');
  });

let token;

io.on('connection', async (socket) =>{
    console.log('New user connected');
    //user joins a lobby
    socket.on('joinLobby', async (lobbyId) => {
        //fetch token from API
        token = await fetchToken();
        
        //method to add the client to the appropriate lobby room, based on the lobbyId passed in by the client
        socket.join(`lobby-${lobbyId}`);

        //send token to client
        socket.emit('token', token);
    });

    //handle when user requests a new question
    socket.on('newQuestion', async (lobbyId, categoryId) => {
        try{
            //fetch question from API
            const questions = await fetchQuestion(categoryId, token);
            //method to send it to all clients in the appropriate lobby room, based on the lobbyId passed in by the client
            io.to(`lobby-${lobbyId}`).emit('question', questions[0]);
        } catch (err){
            console.error(err)
            socket.emit('error', err.message);
        }
    })
})

server.listen(port, () =>
    console.log(`Listening on ${port}`));