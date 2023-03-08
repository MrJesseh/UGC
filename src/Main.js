const Scanner = require('./Scanner');
const Tracker = require('./Tracker');
const mongoose = require('mongoose');
const isTestMode = true;
const db = require('./Database/Items');


async function Main(){

    // let data = await getProductInfo(12547447358);
    // console.log(data);

    // let groupStore = await getGroupStore(16141691);
    // console.log(groupStore);

    // let data = await getAllRecentUGC();
    // console.log(data);
    // console.log(await getBulkProductInfo([{id: 12715663562, itemType: 'Asset'}]));

    // await logout();

    // Login to database.
    if(isTestMode){
        let config = require('./config.json');
        mongoose.connect(config.DB_CONNECTION_STRING);
        mongoose.connection.once('open', () => {
            console.log("\x1b[32m", "[✅] Connected to Database!", '\x1b[0m');
            Scanner.initRequests();
            //Tracker.initRequests();
        });
    }else{
        mongoose.connect(process.env.DB_Connection_String);
        mongoose.connection.once('open', () => {
            console.log("\x1b[32m", "[✅] Connected to Database!", '\x1b[0m');
            Scanner.initRequests();
            Tracker.initRequests();
        });
    }
    mongoose.Promise = global.Promise;    
}

Main();