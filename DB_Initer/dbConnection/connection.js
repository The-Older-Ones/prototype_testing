require("dotenv").config();
const mongoose = require('mongoose');
const ConnectionAdress = process.env.MONGODB_URL;

connection = async () =>{
    await mongoose.connect(ConnectionAdress);
}

module.exports = connection;