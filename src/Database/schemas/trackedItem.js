const mongoose = require('mongoose');
const Items = mongoose.connection.useDb("Items");
/*

Schema & Model for Blog data.

Database: Items
Name: tracked-item
Collection: tracked-items

*/

const TrackedItem = new mongoose.Schema({
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

const trackedItem = Items.model("tracked-item", TrackedItem, "tracked-items");

module.exports = {trackedItem: trackedItem};