const connection = require("./dbConnection/connection");
const loader = require("./loader");

index = async () => {
    try {
        await connection();
        await loader();
    } catch (err) {
        console.log(err);
    }
};

index();