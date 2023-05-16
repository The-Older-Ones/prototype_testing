const open =  require("./apis/OpenTrivia");
const trivia = require("./apis/TriviaAPI");

const list = [
    "----------------------------------------------",
    "Von welcher API möchten Sie fragen beziehen?\n",
    "Open Trivia = 1",
    "Trivia API = 2",
    "\n"
]

hub = (num) =>{
    num = parseInt(num);
    switch(num){
        case 1 : return open
        case 2 : return trivia
        default : return trivia;
    }
}

module.exports = {
    list,
    hub
}