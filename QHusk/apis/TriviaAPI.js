require('dotenv').config();
const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");

const URL = process.env.TRIVIA_API;
const { conversation } = require("./TriviaAPI_TextTable");

main = async () => {
    const repeat = await dialog();
    for (let i = 0; i < repeat; i++) {
        const response = await grabber();
        await fileWriter(response);
    }
    console.log(conversation[4]);
}

consoleQuestion = (prompt) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            answer === "" ? answer = null : false;
            resolve(answer);
        });
    });
}

dialog = async () => {
    const seperator = () => console.log(conversation[0]);
    seperator();
    console.log(conversation[1]);
    let repeat = await consoleQuestion(conversation[2]);
    seperator();
    console.log(conversation[3]);

    return dialogNumberConverter(repeat);
}

dialogNumberConverter = (repeat) => {
    repeat ? true : repeat = 1
    repeat = parseInt(repeat);
    isNaN(repeat) ? repeat = 1 : false;

    return repeat
}

grabber = async () => {
    let response;
    response = await fetch(URL);
    response = await response.json();
    return response;
}

fileWriter = async (decodedData) => {
    const jsonData = JSON.stringify(decodedData, null, 2);
    const now = new Date();
    const milliseconds = now.getMilliseconds();
    const timestamp = now.toISOString().replace(/:/g, '-').replace(/\..+/, '') + `-${milliseconds}`;
    const fileName = `questions_${timestamp}.json`;
    const targetFilePath = path.join(__dirname, "../Q/TriviaApi", fileName);
    await fs.writeFile(targetFilePath, jsonData, 'utf8');
    console.log(`Datei: ${fileName} erfolgreich erstellt.`)
}

module.exports = main 