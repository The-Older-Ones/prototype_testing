require('dotenv').config();
const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");

const URL = process.env.TRIVIA_API;
const { conversation, categoryMapper } = require("./TriviaAPI_TextTable");
const { TIMEOUT } = require('dns');

const main = async () => {
    const unmapped = [];
    try {
        const repeat = await dialog();
        for (let i = 0; i < repeat; i++) {
            const response = await grabber();
            response.forEach(q => {
                unmapped.push(q)
            });

            const progressCheck = (i + 1) % (repeat / 10);
              
            if (progressCheck === 0) {
              const progress = ((i + 1) / repeat) * 100;
              console.log("Progress: " + progress + "%");
            }

            await delay(100)
        }
        console.log(conversation[4]);
    } catch (e) {
        console.log(e)
    } finally {
        const mapped = modelMapper(unmapped);
        await fileWriter(mapped);
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const consoleQuestion = (prompt) => {
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

const dialog = async () => {
    const seperator = () => console.log(conversation[0]);
    seperator();
    console.log(conversation[1]);
    let repeat = await consoleQuestion(conversation[2]);
    seperator();
    console.log(conversation[3]);

    return dialogNumberConverter(repeat);
}

const dialogNumberConverter = (repeat) => {
    repeat ? true : repeat = 1
    repeat = parseInt(repeat);
    isNaN(repeat) ? repeat = 1 : false;

    return repeat
}

const grabber = async () => {
    let response;
    response = await fetch(URL);
    response = await response.json();
    return response;
}

const fileWriter = async (decodedData) => {
    const jsonData = JSON.stringify(decodedData, null, 2);
    const now = new Date();
    const milliseconds = now.getMilliseconds();
    const timestamp = now.toISOString().replace(/:/g, '-').replace(/\..+/, '') + `-${milliseconds}`;
    const fileName = `questions_${timestamp}.json`;
    const targetFilePath = path.join(__dirname, "../Q/TriviaApi", fileName);
    await fs.writeFile(targetFilePath, jsonData, 'utf8');
    console.log(`Datei: ${fileName} erfolgreich erstellt.`)
}

// Momentan nur für multiple choice Fragen. Andere werden gefiltert.
const modelMapper = (unmapped) => {
    let easy = true;
    let medium = true;
    let mapped = unmapped
        .filter((question) => question.type === "text_choice")
        .sort((a, b) => {
            const catA = categoryMapper[a.category](a.tags)
            const catB = categoryMapper[b.category](b.tags)
            return catA.localeCompare(catB)
        })
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
                        points = "300"
                    } else {
                        points = "600"
                    }
                    medium = !medium;
                    break;

                case "hard": points = "1000"; break;
            }
            const category = categoryMapper[question.category](question.tags)
            return {
                category: category,
                type: "multiple",
                difficulty: points,
                question: question.question.text,
                correct_answer: question.correctAnswer,
                incorrect_answers: question.incorrectAnswers
            }
        })
    return mapped;
}

// main()

module.exports = main