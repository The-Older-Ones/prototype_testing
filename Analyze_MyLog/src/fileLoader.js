const fs = require("fs").promises;
const path = require("path");
const folderPath = path.join(path.dirname(__dirname), "logs");

const fileLoader = async () => {
    try {
        const files = await fs.readdir(folderPath);
        const textFile = files.filter((file) =>
            file.toLowerCase().endsWith(".log")
        );

        return data = await Promise.all(textFile.map(async (filename) => {
            const filePath = path.join(folderPath, filename);
            const log =  await fs.readFile(filePath, "utf8");
            return log.split('\r\n')
        }));
        
    } catch (err) {
        throw new Error("Fehler beim Laden der Files. " + err);
    }
}

module.exports = fileLoader;