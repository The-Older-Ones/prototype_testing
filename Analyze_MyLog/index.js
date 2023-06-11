const fileLoader = require("./src/fileLoader");
const evaluator = require("./src/evaluator");


const main = async () =>{
    try{
        const data = await fileLoader();
        evaluator(data)
    }catch(e){
        console.log(e)
    }
}

main();