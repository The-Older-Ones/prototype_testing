const fs = require("fs").promises;
const path = require("path");

// Propertie nachdem die Doppelten Fragen aussortiert werden
const evaluator = "id"

const folderPath = __dirname + "/input";
const hashMap = {};
const chunks = [];
const chunkSize = 50;

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
                const id = one[evaluator];
                if (!hashMap.hasOwnProperty(id)) {
                    hashMap[id] = one;
                }
            });
        });

        await Promise.all(fileReadPromises);

        let currentChunk = [];
        let index = 0;

        for (const [key, value] of Object.entries(hashMap)) {
            currentChunk[index] = value;
            index++;

            if (index % chunkSize === 0) {
                chunks.push(currentChunk);
                currentChunk = [];
                index = 0;
            }
        }

        if (currentChunk.length > 0) {
            chunks.push(currentChunk);
        }

        for (let i = 0; i < chunks.length; i++) {
            const now = new Date();
            const milliseconds = now.getMilliseconds();
            const timestamp =
                now.toISOString().replace(/:/g, "-").replace(/\..+/, "") +
                `-${milliseconds}`;
            const fileName = `questions_${timestamp}_${i + 1}.json`;
            const jsonData = JSON.stringify(chunks[i], null, 2);
            const targetFilePath = path.join(__dirname, "./output", fileName);
            await fs.writeFile(targetFilePath, jsonData, "utf8");
            console.log(`Datei: ${fileName} erfolgreich erstellt.`);
        }

        console.log("Verarbeitung abgeschlossen.");
    } catch (err) {
        console.error("Fehler aufgetreten:", err);
    }
}

main();
