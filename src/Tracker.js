const getBulkProductInfo = require('./Roblox/getBulkProductInfo');
const config = require('./config.json');
const webhook = require('./Discord/WebhookHandler');
const db = require('./Database/Items');

class Tracker {
    constructor(){}

    async initRequests(){
        console.log("\x1b[32m", "[✅] Initialized Tracker!", '\x1b[0m');
        const self = this;
        setInterval(this.tracker, config.trackerInterval, self);
    }

    async tracker(self){
        let itemsForData = await db.getTrackedItemsForBulkInfo();
        let items = await db.getTrackedItems();
        let itemData = await getBulkProductInfo(itemsForData);
        self.processItems(items, itemData.data);
    }

    async processItems(items, itemData){
        if(itemData == null || itemData == undefined){return console.log("Tracker hit rate limit");}
        for(var i = 0; i < items.length; i++){
            if(itemData == undefined){return;};
            // Get the product info for the item.
            let ForSale;
            let Price;
            if(itemData[i].price == undefined){
                Price = null;
                ForSale = false;
            }else if (itemData[i].priceStatus == undefined){
                Price = itemData[i].price;
                ForSale = true;
            }

            // Check to make sure the sale status isn't the same.
            if(ForSale != items[i].forSale){
                //console.log(productInfo);
                // Get the item data.
                let name = itemData[i].name;
                let desc = itemData[i].description;
                let id = items[i].id;
                let price = Price;
                let forSale = ForSale;

                // Update the item's for sale status in the database.
                await db.updateTrackedItemForSale(items[i].id, forSale);

                // Send the webhook.
                await webhook.sendTrackerAlert(name, desc, id, price, forSale); 
            }else{
                continue;
            }
        }
    }

}

const TrackerInstance = new Tracker();
Object.freeze(TrackerInstance);

module.exports = TrackerInstance;