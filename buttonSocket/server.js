const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Damit werden alle HTML/CSS Daten aus Public gezogen
app.use(express.static('public'));

// Benutzer, die den Button geklickt haben
const clickedUsers = {};

// Sagt, wenn jemand localhost:3000 aufruft
io.on('connection', (socket) => {
  console.log('Ein Benutzer hat eine Verbindung hergestellt');

  const userId = socket.id;

  // wenn der userId nicht in dem clickedUsers Array ist, markiere ihn als false
  clickedUsers[userId] = false;

  // ertsellung des timestamps
  socket.on('buttonClick', () => {
    const timestamp = new Date().toLocaleString();
    console.log(`Benutzer ${userId} hat den Button geklickt um ${timestamp}`);

    // Benutzer als geklickt markieren
    clickedUsers[userId] = true;

    // Überprüfen, ob beide Benutzer geklickt haben
    const users = Object.keys(clickedUsers);
    const allClicked = users.every((user) => clickedUsers[user]);

    if (allClicked) {
      // Ermittle den Benutzer, der zuerst geklickt hat
      const firstUserId = users[0];
      const firstUserTimestamp = timestamp;

      for (let i = 1; i < users.length; i++) {
        if (clickedUsers[users[i]] > firstUserTimestamp) {
          firstUserId = users[i];
          firstUserTimestamp = clickedUsers[users[i]];
        }
      }

      // zeige das Ergebnis allen Usern
      io.emit('showResult', { firstUserId });
    }
  });

  // Wenn ein User die Seite verlassen hat
  socket.on('disconnect', () => {
    console.log(`Benutzer ${userId} hat die Verbindung getrennt`);
    // User aus der Liste entfernen
    delete clickedUsers[userId];
  });
});

server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});