const getBulkProductInfo = require('./Roblox/getBulkProductInfo');
const webhook = require('./Discord/WebhookHandler');
const db = require('./Database/Items');
const keywords = require('./config.json').limitedKeyWords;

class NotableTracker {
    constructor(){}

    async initRequests(){
        console.log("\x1b[32m", "[✅] Initialized Notable Tracker!", '\x1b[0m');
        const self = this;
        setInterval(this.tracker, 60000, self);
    }

    async tracker(self){
        let itemsForData = await db.getNotableTrackedItemsForBulkInfo();
        let items = await db.getNotableTrackedItems();
        let itemData = await getBulkProductInfo(itemsForData);
        self.processItems(items, itemData.data);
    }

    async processItems(items, itemData){
        if(itemData == undefined){return console.log("Notable Tracker hit Rate Limit.");};
        for(var i = 0; i < items.length; i++){
            // Handle for sale stuff.
            let ForSale;
            let Price;
            if(itemData[i].price == undefined){
                Price = null;
                ForSale = false;
            }else if (itemData[i].priceStatus == undefined){
                Price = itemData[i].price;
                ForSale = true;
            }
            // Get the item data.
            let name = itemData[i].name;
            let desc = itemData[i].description;
            let id = items[i].id;
            let forSale = ForSale;
            let price = Price;
            let created = items[i].createdDate;
            let creator = items[i].creatorName;

            // Check to see if the name or description has been updated.
            if(items[i].itemName != name || items[i].itemDesc != desc){
                // Check to see if it is possibly a limited
                let regex = /\d+\s*\/\s*\d+/;
                // First check the regex.
                if(regex.test(desc) || regex.test(name)){
                    await webhook.sendPossibleLimitedAlert(name, desc, id, price, forSale, created, creator);
                    await db.deleteNotableItem(id);
                    continue;
                }

                // Next check for keywords.
                for(let j = 0; j < keywords.length; j++){
                    if(desc.includes(keywords[j]) || name.includes(keywords[j])){
                        await webhook.sendPossibleLimitedAlert(name, desc, id, price, forSale, created, creator);
                        await db.deleteNotableItem(id);
                        break;
                    }
                } 
            }  
        }
    }
}

const TrackerInstance = new NotableTracker();
Object.freeze(TrackerInstance);

module.exports = TrackerInstance;