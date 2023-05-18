const connection = require("./dbConnection/connection");
const loader = require("./loader");
const Question = require("./Model/db_Model");

index = async () => {
    try {
        await startDB();
        await init();
    } catch (err) {
        console.log(err);
    }
};

startDB = async () => {
    try {
        await connection();
    } catch (err) {
        throw new Error("Fehler beim Verbindungsaufbau der DB : " + err);
    }
};

init = async () => {
    try{
        const sample = await Question.findOne();
        if(!sample){
            await loader()
            console.log("Daten geladen");
        } else{
            console.log("Daten bereits in DB");
        }
    } catch (err){
        throw err;
    }
}

index();