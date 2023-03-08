const getAllRecentUGC = require('./Roblox/getAllRecentUGC');
const getProductInfo = require('./Roblox/getProductInfo');
const webhook = require('./Discord/WebhookHandler');
const db = require('./Database/Items');
const notableIds = require('./config.json').notableIds;
const keywords = require('./config.json').limitedKeyWords;



class Scanner {
    constructor(){}

    async initRequests(){
        console.log("\x1b[32m", "[✅] Initialized Scanner!", '\x1b[0m');
        const self = this;
        setInterval(this.scanner, 120000, self);
    }

    async scanner(self){
        let items = await getAllRecentUGC();
        self.processItems(items.data);
    }

    async processItems(items){
        if(items == false || items == undefined){return;}
        for(var i = 0; i < items.length; i++){
            if(await db.getScannedItem(items[i].id) != false){
            }else{
                // Add the item to the database.
                await db.addScannedItem(
                    {
                    assetId: items[i].id,
                    dateScanned: new Date()
                    }
                );

                // Get the product info for the item.
                let productInfo = await getProductInfo(items[i].id);
                let name = productInfo.Name;
                let desc = productInfo.Description;
                let id = items[i].id;
                let price = productInfo.PriceInRobux;
                let forSale = productInfo.IsForSale;
                let created = productInfo.Created;
                let creator = productInfo.Creator.Name;


                // Emit event for webhook.
                await webhook.sendNewItemAlert(name, desc, id, price, forSale, created, creator);
                
                // Check to see if it is a notable item.
                if(notableIds.includes(productInfo.Creator.CreatorTargetId.toString())){
                    await webhook.sendNotableItemAlert(name, desc, id, price, forSale, created, creator);
                }

                // Check to see if it is possibly a limited
                for(let j = 0; j < keywords.length; j++){
                    if(desc.includes(keywords[j]) || name.includes(keywords[j]) || desc.includes(/\d+\/\d+/) || name.includes(/\d+\/\d+/)){
                        await webhook.sendPossibleLimitedAlert(name, desc, id, price, forSale, created, creator);
                        break;
                    }
                }
            }
        }
    }
}

const ScannerInstance = new Scanner();
Object.freeze(ScannerInstance);

module.exports = ScannerInstance;