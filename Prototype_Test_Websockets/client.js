// create a new instance of the io object to connect to the server
const socket = io();

// listen for the 'question' event from the server
socket.on('question', (question) => {
    if (question !== null) {
        // display the question on the page
        const questionElement = document.querySelector('#question');
        questionElement.textContent = decodeURIComponent(question.question);
        // const answersElement = document.querySelector('#answers');
        // display the answers as checkboxes
        const answersElement = document.querySelector('#answers');
        answersElement.innerHTML = '';
        question.incorrect_answers.forEach(answer => {
            const answerElement = document.createElement('li');
            const checkboxElement = document.createElement('input');
            checkboxElement.type = 'checkbox';
            checkboxElement.name = 'answer';
            checkboxElement.value = decodeURIComponent(answer);
            const labelElement = document.createElement('label');
            labelElement.textContent = decodeURIComponent(answer);
            answerElement.appendChild(checkboxElement);
            answerElement.appendChild(labelElement);

            // add an event listener to the checkbox that listens for the 'click' event
            checkboxElement.addEventListener('click', (event) => {
                if (event.target.checked && event.target.value === decodeURIComponent(question.correct_answer)) {
                    const correctAnswerText = document.createElement('span');
                    correctAnswerText.textContent = ' Correct!';
                    answerElement.appendChild(correctAnswerText);
                } else {
                    const correctAnswerText = document.createElement('span');
                    correctAnswerText.textContent = ` Incorrect! The correct answer is: ${decodeURIComponent(question.correct_answer)}`;
                    answerElement.appendChild(correctAnswerText);
                }
            });

            answersElement.appendChild(answerElement);
        });
        const correctAnswerElement = document.createElement('li');
        const checkboxElement = document.createElement('input');
        checkboxElement.type = 'checkbox';
        checkboxElement.name = 'answer';
        checkboxElement.value = decodeURIComponent(question.correct_answer);
        const labelElement = document.createElement('label');
        labelElement.textContent = decodeURIComponent(question.correct_answer);
        correctAnswerElement.appendChild(checkboxElement);
        correctAnswerElement.appendChild(labelElement);

        // add an event listener to the checkbox that listens for the 'click' event
        checkboxElement.addEventListener('click', (event) => {
            if (event.target.checked) {
                const correctAnswerText = document.createElement('span');
                correctAnswerText.textContent = ' Correct!';
                correctAnswerElement.appendChild(correctAnswerText);
            } else {
                const correctAnswerText = document.createElement('span');
                correctAnswerText.textContent = ` Incorrect! The correct answer is: ${decodeURIComponent(question.correct_answer)}`;
                correctAnswerElement.appendChild(correctAnswerText);
            }
        });

        answersElement.appendChild(correctAnswerElement);

    console.log('Received question:', question);
    } else {
    console.log('Received null question');
}
});
// // emit a 'joinLobby' event to join a lobby
// socket.emit('joinLobby', 1);

// // emit a 'newQuestion' event to request a new question from the server
// socket.emit('newQuestion', 1, 9);