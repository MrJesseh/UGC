const Scanner = require('./Scanner');
const Tracker = require('./Tracker');
const NotableTracker = require('./NotableTracker');
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
            // //id: item.id,
            // itemType: item.itemType,
            // forSale: item.forSale
            // let item = {
            //     id: 184361009,
            //     itemType: "Asset",
            //     forSale: false,
            //     price: 2
            // };
            // db.addTrackedItem(item);
            Scanner.initRequests();
            Tracker.initRequests();
            NotableTracker.initRequests();
        });
    }
    mongoose.Promise = global.Promise;    
}

Main();