const mongoose = require('mongoose');
const Items = mongoose.connection.useDb("Items");
/*

Schema & Model for Blog data.

Database: Items
Name: notable-item
Collection: notable-items

*/

const NotableItem = new mongoose.Schema({
    id: Number,
    itemType: String,
    itemName: String,
    itemDesc: String,
    dateScanned: Date,
    creatorName: String,
    createdDate: Date
});

const notableItem = Items.model("notable-item", NotableItem, "notable-items");

module.exports = {notableItem: notableItem};