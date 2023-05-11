let io;
const { fetchQuestion, fetchToken } = require('./questions.js');
let token;
let gameSocket;

exports.createGame = (sio, socket) => {
  io = sio;
  gameSocket = socket;
  gameSocket.on('joinLobby', joinLobby);
  gameSocket.on('newQuestion', newQuestion);
};

function joinLobby(lobbyId) {
  console.log('Lobby entering');
  // fetch token from API
  fetchToken().then((fetchedToken) => {
    token = fetchedToken; 
    // method to add the client to the appropriate lobby room, based on the lobbyId passed in by the client
    gameSocket.join(`lobby-${lobbyId}`);
    // send token to client
    gameSocket.emit('token', token);
  });
}

// handle when user requests a new question
function newQuestion(lobbyId, categoryId) {
  // fetch question from API
  fetchQuestion(categoryId, token).then((questions) => {
    // method to send it to all clients in the appropriate lobby room, based on the lobbyId passed in by the client
    io.to(`lobby-${lobbyId}`).emit('question', questions[0]);
  }).catch((err) => {
    console.error(err);
    gameSocket.emit('error', err.message);
  });
}