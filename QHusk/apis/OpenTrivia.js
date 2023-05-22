require('dotenv').config();
const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");

const URL = process.env.OPEN_TRIVIA;
const TokenRequest = process.env.OPEN_TRIVIA_GET_TOKEN;
const DefaultAmount = process.env.OPEN_TRIVIA_DEFAULT_AMOUNT;
const DefaultEncoding = process.env.OPEN_TRIVIA_ENCODE;

const { categoryTable, conversation, responseCode, minCategorieNumber, maxCategorieNumber } = require("./OpenTrivia_TextTable");

main = async () => {
    try {
        const { amount, category, difficult, type, repeat } = await dialog();
        const response = await grabber()
        const token = response.token
        const url = urlConstructor(amount, category, difficult, type, token)
        for (let i = 0; i < repeat; i++) {
            const encoded = await grabber(url);
            const decoded = base64Decoder(encoded);
            const mapped = modelMapper(decoded);
            await fileWriter(mapped);
        }
        console.log(conversation[8]);
    } catch (error) {
        console.log(error.message)
    }
}

urlConstructor = (amount, category, difficult, type, token) => {
    let url = URL;
    amount ? url = url + "?amount=" + amount : url = url + "?amount=" + DefaultAmount;
    category ? url = url + "&category=" + category : false;
    if (difficult) {
        difficult = difficult.toLowerCase();
        url = url + "&difficulty=" + difficult;
    }
    if (type) {
        type = type.toLowerCase();
        url = url + "&type=" + type;
    }
    url = url + DefaultEncoding + "&token=" + token;
    return url;
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
    let amount = await consoleQuestion(conversation[2]);
    seperator();
    categoryTable.forEach((data) => console.log(data));
    let category = await consoleQuestion(conversation[3]);
    seperator();
    let difficult = await consoleQuestion(conversation[4]);
    seperator();
    let type = await consoleQuestion(conversation[5]);
    seperator();
    let repeat = await consoleQuestion(conversation[6]);
    seperator();
    console.log(conversation[7]);
    return dialogNumberConverter(amount, category, difficult, type, repeat);
}

dialogNumberConverter = (amount, category, difficult, type, repeat) => {
    categoryNumber = parseInt(category);
    categoryNumber >= minCategorieNumber && categoryNumber <= maxCategorieNumber ? true : category = null

    amountNumber = parseInt(amount);
    isNaN(amountNumber) ? amount = null : false;
    amountNumber < 1 ? amount = "1" : false;
    amountNumber > 50 ? amount = "50" : false;

    repeat ? true : repeat = 1
    repeat = parseInt(repeat);
    isNaN(repeat) ? repeat = 1 : false;

    switch (difficult) {
        case "1": difficult = "Easy"; break;
        case "2": difficult = "Medium"; break;
        case "3": difficult = "Hard"; break;
        default: difficult = null;
    }

    switch (type) {
        case "1": type = "multiple"; break;
        case "2": type = "boolean"; break;
        default: type = null;
    }

    return { amount: amount, category: category, difficult: difficult, type: type, repeat: repeat }
}

grabber = async (url = null) => {
    let response;
    url ? response = await fetch(url) : response = await fetch(TokenRequest);
    response = await response.json();
    if (response.response_code === 0) {
        return response;
    } else {
        throw apiErrorHandler(response.response_code);
    }
}

base64Decoder = (encoded) => {
    let decoded = {
        results: encoded.results.map(result => ({
            ...result,
            category: Buffer.from(result.category, 'base64').toString('utf-8'),
            type: Buffer.from(result.type, 'base64').toString('utf-8'),
            difficulty: Buffer.from(result.difficulty, 'base64').toString('utf-8'),
            question: Buffer.from(result.question, 'base64').toString('utf-8'),
            correct_answer: Buffer.from(result.correct_answer, 'base64').toString('utf-8'),
            incorrect_answers: result.incorrect_answers.map(answer => Buffer.from(answer, 'base64').toString('utf-8'))
        }))
    };
    return decoded
}

fileWriter = async (decodedData) => {
    const jsonData = JSON.stringify(decodedData, null, 2);
    const now = new Date();
    const milliseconds = now.getMilliseconds();
    const timestamp = now.toISOString().replace(/:/g, '-').replace(/\..+/, '') + `-${milliseconds}`;
    const fileName = `questions_${timestamp}.json`;
    const targetFilePath = path.join(__dirname, "../Q/OpenTrivia", fileName);
    await fs.writeFile(targetFilePath, jsonData, 'utf8');
    console.log(`Datei: ${fileName} erfolgreich erstellt.`)
}

apiErrorHandler = (errorCode) => {
    let message;
    switch (errorCode) {
        case 1: message = responseCode[1]; break;
        case 2: message = responseCode[2]; break;
        case 3: message = responseCode[3]; break;
        case 4: message = responseCode[4]; break;
    }
    throw new Error(message);
}

// Momentan nur für multiple choice Fragen. Andere werden gefiltert.
modelMapper = (unmapped) => {
    let easy = true;
    let medium = true;
    let mapped = unmapped.results
        .filter((question) => question.type === "multiple")
        .map((question) => {
            let points;

            switch (question.difficulty) {
                case "easy":
                    if (easy) {
                        points = "100";
                    } else {
                        points = "200";
                    }
                    easy = !easy;
                    break;

                case "medium":
                    if (medium) {
                        points = "400"
                    } else {
                        points = "600"
                    }
                    medium = !medium;
                    break;
                
                case "hard" : points = "1000"; break;
            }

            return {
                category: question.category,
                type: question.type,
                difficulty: points,
                question: question.question,
                correct_answer: question.correct_answer,
                incorrect_answers: question.incorrect_answers
            }
        })
    return mapped;
}

// main();

module.exports = main 