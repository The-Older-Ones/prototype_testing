const readline = require("readline");
const { list, hub } = require("./hub")

init = async () => {
    list.forEach((item) => console.log(item));
    const num = await consoleQuestion("");
    const decision = hub(num);
    await decision();
}

consoleQuestion = (prompt) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            answer === "" ? answer = null : false;
            resolve(answer);
        });
    });
}

init();