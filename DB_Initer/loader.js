const Question = require("./Model/db_Model");
const fs = require("fs").promises;
const path = require("path");

const folderPath = __dirname + "/questions";
const catalog = [];

main = async () => {
    try {
        const sample = await Question.findOne();
        if(!sample){
            await fileLoader();
            await fillDB()
        } else{
            console.log("Daten bereits in DB");
        }
    } catch (err) {
        throw err;
    }
}

fileLoader = async () => {
    try {
        const files = await fs.readdir(folderPath);
        const jsonFiles = files.filter((file) =>
            file.toLowerCase().endsWith(".json")
        );
        const fileReadPromises = jsonFiles.map(async (filename) => {
            const filePath = path.join(folderPath, filename);
            const data = await fs.readFile(filePath, "utf8");
            const jsonData = JSON.parse(data);
            jsonData.forEach((questionObject) => {
                catalog.push(questionObject);
            })
        });

        await Promise.all(fileReadPromises);
        console.log("Files erfolgreich geladen");
    } catch (err) {
        throw new Error("Fehler beim Laden der Files. " + err);
    }
}

fillDB = async () => {
    const savePromises = catalog.map((questionObject) => {
        try {
            Question.create(questionObject)
        } catch {
            console.log(" Fehler beim speichern von Frage : " + questionObject.correct_answer)
        }
    });
    await Promise.all(savePromises);
    console.log("Übertragung in DB abgeschlossen");
}

module.exports = main;