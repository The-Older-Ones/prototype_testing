const list = [
    "----------------------------------------------",
    "Von welcher API möchten Sie fragen beziehen?\n",
    "Open Trivia = 1",
    "Trivia API = 2",
    "\n"
]

hub = (num) => {
    num = parseInt(num);
    switch (num) {
        case 1: return require("./apis/OpenTrivia")
        case 2: return require("./apis/TriviaAPI")
        default: return require("./apis/TriviaAPI");
    }
}

module.exports = {
    list,
    hub
}