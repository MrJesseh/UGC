const getProductInfo = require('./Roblox/getProductInfo');
const webhook = require('./Discord/WebhookHandler');
const db = require('./Database/Items');

class Tracker {
    constructor(){}

    async initRequests(){
        console.log("\x1b[32m", "[✅] Initialized Tracker!", '\x1b[0m');
        const self = this;
        setInterval(this.tracker, 3000, self);
    }

    async tracker(self){
        let items = await db.getTrackedItems();
        self.processItems(items);
    }

    async processItems(items){
        for(var i = 0; i < items.length; i++){
            // Get the product info for the item.
            let productInfo = await getProductInfo(items[i].assetId);

            // Check to make sure the sale status isn't the same.
            if(productInfo.IsForSale != items[i].forSale){
                //console.log(productInfo);
                // Get the item data.
                let name = productInfo.Name;
                let desc = productInfo.Description;
                let id = items[i].assetId;
                let price = productInfo.PriceInRobux;
                let forSale = productInfo.IsForSale;
                let created = productInfo.Created;

                // Update the item's for sale status in the database.
                await db.updateTrackedItemForSale(items[i].assetId, forSale);

                // Send the webhook.
                await webhook.sendTrackerAlert(name, desc, id, price, forSale, created); 
            }else{
                continue;
            }
        }
    }

}

const TrackerInstance = new Tracker();
Object.freeze(TrackerInstance);

module.exports = TrackerInstance;