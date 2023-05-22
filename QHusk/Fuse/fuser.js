const fs = require("fs").promises;
const path = require("path");

const folderPath = __dirname + "/input";
const chunks = [];

async function main() {
    try {
        const files = await fs.readdir(folderPath);
        const jsonFiles = files.filter((file) =>
            file.toLowerCase().endsWith(".json")
        );

        const fileReadPromises = jsonFiles.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const data = await fs.readFile(filePath, "utf8");
            const jsonData = JSON.parse(data);
            jsonData.forEach((one) => {
                chunks.push(one);
            });
        });

        await Promise.all(fileReadPromises);

        const fileName = `question.json`;
        const jsonData = JSON.stringify(chunks, null, 2);
        const targetFilePath = path.join(__dirname, "./output", fileName);
        await fs.writeFile(targetFilePath, jsonData, "utf8");
        console.log(`Datei: ${fileName} erfolgreich erstellt.`);


        console.log("Verarbeitung abgeschlossen.");
    } catch (err) {
        console.error("Fehler aufgetreten:", err);
    }
}

main();