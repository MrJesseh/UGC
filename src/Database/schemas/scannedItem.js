const mongoose = require('mongoose');
const Items = mongoose.connection.useDb("Items");
/*

Schema & Model for Blog data.

Database: Items
Name: scanned-item
Collection: scanned-items

*/

const ScannedItem = new mongoose.Schema({
    itemName: String,
    itemDescription: String,
    assetId: Number,
    dateScanned: Date,
    creator: {
        type: String,
        name: String,
        id: Number
    },
    forSale: Boolean,
    price: Number
});

const scannedItem = Items.model("scanned-item", ScannedItem, "scanned-items");

module.exports = {scannedItem: scannedItem};