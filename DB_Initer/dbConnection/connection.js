require("dotenv").config();
const mongoose = require('mongoose');
const ConnectionAdress = process.env.MONGODB_URL;

connection = async () => {
    try {
        await mongoose.connect(ConnectionAdress);
    } catch (err) {
        throw new Error("Fehler beim Verbindungsaufbau der DB : " + err);
    }
}

module.exports = connection;