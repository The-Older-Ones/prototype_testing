const evaluator = {};

const main = (data) => {
    standard(data);
}

const standard = (logs) => {
    logs.forEach(logFile => {
        logFile.forEach(log => {
            const date = log.substring(0, 19);
            const typeStartIndex = log.indexOf('[') + 1;
            const typeEndIndex = log.indexOf(']');
            const type = log.substring(typeStartIndex, typeEndIndex);
            const message = log.substring(typeEndIndex + 2);

            if (evaluator[type] == undefined) {
                evaluator[type] = {
                    count: 0,
                    all: []
                }
            }

            evaluator[type].count++;
            
            if(!evaluator[type].all.includes(message)){
                evaluator[type].all.push(message);
            }

            if(type =="error" && message.includes("Error creating token")){
                if(evaluator[type].special == undefined){
                    evaluator[type].special = 0;
                }
                evaluator[type].special++
            }
        })
    });

    console.log(evaluator)
}

module.exports = main;