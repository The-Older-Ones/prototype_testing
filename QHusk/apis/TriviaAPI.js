require('dotenv').config();
const readline = require("readline");
const fs = require("fs").promises;
const path = require("path");

const URL = process.env.TRIVIA_API;

