const mongoose = require('mongoose');
const Items = mongoose.connection.useDb("Items");
/*

Schema & Model for Blog data.

Database: Items
Name: scanned-item
Collection: scanned-items

*/

const ScannedItem = new mongoose.Schema({
    assetId: Number,
    dateScanned: Date
});

const scannedItem = Items.model("scanned-limited-item", ScannedItem, "scanned-limited-items");

module.exports = {scannedItem: scannedItem};