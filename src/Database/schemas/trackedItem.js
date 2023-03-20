const mongoose = require('mongoose');
const Items = mongoose.connection.useDb("Items");
/*

Schema & Model for Blog data.

Database: Items
Name: tracked-item
Collection: tracked-items

*/

const TrackedItem = new mongoose.Schema({
    id: Number,
    itemType: String,
    forSale: Boolean,
    price: Number
});

const trackedItem = Items.model("tracked-item", TrackedItem, "tracked-items");

module.exports = {trackedItem: trackedItem};