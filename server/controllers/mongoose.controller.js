require('dotenv').config();
const mongooes = require("mongoose");


async function connectToDb(database = "SystemDatabase")
{
    const username = process.env.DATABASE_USERNAME;
    const password = process.env.DATABASE_PASSWORD;
    
    const mongo_url = "mongodb+srv://"+username+":"+password+"@cluster0.gxvopsw.mongodb.net/"+database+"?retryWrites=true&w=majority";
    //console.log(mongo_url);
    try{
        await mongooes.connect(mongo_url);
        console.log("Connection Successful...");
    }
    catch(e){
        console.log("MongoDb Connection Fail..."+e);
    }
}
async function disconnectToDb()
{
    try{
        mongooes.disconnect();
        console.log("Connection Disconnected...");
    }
    catch(e){
        console.log("MongoDb Disconnection Fail..."+e);
    }
}

module.exports = {connectToDb,disconnectToDb};