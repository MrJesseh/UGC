const Scanner = require('./Scanner');
const Tracker = require('./Tracker');
const mongoose = require('mongoose');
const isTestMode = true;
const db = require('./Database/Items');


async function Main(){
    // Login to database.
    if(isTestMode){
        let config = require('./config.json');
        mongoose.connect(config.DB_CONNECTION_STRING);
        mongoose.connection.once('open', () => {
            console.log("\x1b[32m", "[✅] Connected to Database!", '\x1b[0m');
            Scanner.initRequests();
            //Tracker.initRequests();
        });
    }
    mongoose.Promise = global.Promise;    
}

Main();