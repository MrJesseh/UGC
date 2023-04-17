const getAllRecentLimitedUGC = require('./Roblox/getAllRecentLimitedUGC');
const config = require('./config.json');
const getProductInfo = require('./Roblox/getProductInfo');
const webhook = require('./Discord/WebhookHandler');
const db = require('./Database/Items');
const notableIds = require('./config.json').notableIds;
const keywords = require('./config.json').limitedKeyWords;



class Scanner {
    constructor(){}

    async initRequests(){
        console.log("\x1b[32m", "[✅] Initialized Limited Scanner!", '\x1b[0m');
        const self = this;
        setInterval(this.scanner, config.limitedInterval, self);
    }

    async scanner(self){
        let items = await getAllRecentLimitedUGC();
        self.processItems(items.data);
    }

    async processItems(items){
        if(items == false || items == undefined){return console.log("Limited Scanner hit rate limit.");}
        for(var i = 0; i < items.length; i++){
            if(await db.getScannedLimitedItem(items[i].id) != false){
            }else{
                // Add the item to the database.
                await db.addScannedLimitedItem(
                    {
                    assetId: items[i].id,
                    dateScanned: new Date()
                    }
                );

                // Get the product info for the item.
                let productInfo = await getProductInfo(items[i].id);
                if(productInfo == null || productInfo == undefined){return console.log("Limited Scanner hit rate limit.")}
                //console.log(productInfo);
                let name = productInfo.Name;
                let type = productInfo.ProductType;
                let desc = productInfo.Description;
                let id = items[i].id;
                let price = productInfo.PriceInRobux;
                let forSale = productInfo.IsForSale;
                let created = productInfo.Created;
                let creator;
                console.log(productInfo.Creator);
                try{
                    creator = productInfo.Creator.Name;
                }catch(error){
                    continue;
                }
                
                // Emit event for webhook.
                await webhook.sendPossibleLimitedAlert(name, desc, id, price, forSale, created, creator);
                
                // Check to see if it is a notable item.
                if(notableIds.includes(productInfo.Creator.CreatorTargetId.toString())){
                    await webhook.sendNotableItemAlert(name, desc, id, price, forSale, created, creator);
                    await db.addNotableItem(id, name, desc, creator, created);
                }

                // Check to see if it is free.
                if(price == 0){
                    await webhook.sendFreeLimitedItemAlert(name, desc, id, price, forSale, created, creator);
                }
                
            }
        }
    }
}

const ScannerInstance = new Scanner();
Object.freeze(ScannerInstance);

module.exports = ScannerInstance;