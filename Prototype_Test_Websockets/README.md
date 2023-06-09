# prototype_testing

## Description

Testing a simple fetch with questions and answers from the API https://opentdb.com/

## Installation

Firstly write the command "npm install" in the terminal to install all dependencies.

Then run "node server.js" to start the application.

## Usage

1. Open a browser window and enter the URL http://localhost:3000/.

2. You will see the title of the website "Welcome to my Trivia Game!".

3. Open the console of the browser to see the message "Receive Question null". This message indicates that the user is not in a lobby and has not requested a question.

4. Join a lobby by entering the command socket.emit('joinLobby', 1);, where 1 is the ID of the lobby. You can change the lobby ID to any other number.

5. Request a new question by entering the command socket.emit('newQuestion', 1, 11);, where 1 is the ID of the lobby and 11 is the category of the question. You can change the lobby ID and category to any other number.

6. The question and answer choices will be displayed on the website. Select the correct answer and the text "Correct!" will appear. Otherwise, you will see the text "Incorrect. The correct answer is...".

7. You can also open two windows and insert http://localhost:3000/ you will then be able to see that as long as the two windows are in the same lobby ("socket.emit('joinLobby', 1);")
they will also receive the same questions. 

8. Alternatively you can try to open two windows and insert different lobby numbers to the command. The command "socket.emit('newQuestion', 2, 11);" in which you change the lobby number 
accordingly will also give you different questions.

## Info

This project was built using Node.js and Socket.io