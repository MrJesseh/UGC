const mongoose = require('mongoose');
const Items = mongoose.connection.useDb("Items");
/*

Schema & Model for Blog data.

Database: Items
Name: tracked-item
Collection: tracked-items

*/

const TrackedItem = new mongoose.Schema({
    assetId: Number,
    forSale: Boolean
});

const trackedItem = Items.model("tracked-item", TrackedItem, "tracked-items");

module.exports = {trackedItem: trackedItem};