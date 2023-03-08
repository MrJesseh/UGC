const scanned = require('../Database/schemas/scannedItem').scannedItem;
const tracked = require('./schemas/trackedItem').trackedItem;


class Items {
    constructor(){}

    // Get scanned items.
    async getScannedItems(){
        // Get data.
        let data;
        try{
            data = await scanned.find();
        }catch(error){
            return false;
        }

        // Verify existence of data.
        if(data == null || data == undefined){
            return false;
        }else{
            return data;
        }
    }

    // Get tracked items.
    async getTrackedItems(){
        // Get data.
        let data;
        try{
            data = await tracked.find();
        }catch(error){
            return false;
        }

        // Verify existence of data.
        if(data == null || data == undefined){
            return false;
        }else{
            return data;
        }
    }

    // Add scanned item.
    async addScannedItem(item){
        // Create the new data.
        try{
            await new scanned({
                assetId: item.assetId,
                dateScanned: item.dateScanned
            }).save();
        }catch(error){
            return false;
        }
        return true;
    }
    // Add tracked item.
    async addTrackedItem(item){
        // Create the new data.
        try{
            await new tracked({
                assetId: item.assetId,
                forSale: item.forSale
            }).save();
        }catch(error){
            return false;
        }
        return true;
    }

    // Update tracked item.
    async updateTrackedItemForSale(assetId, forSale){
        try{
            await tracked.updateOne({assetId: assetId}, {
                forSale: forSale
            });
        }catch(error){
            return false;
        }
        return true;
    }

    // Get tracked item.
    async getTrackedItem(assetId){
        // Get data.
        let data;
        try{
            data = await tracked.findOne({assetId: assetId});
        }catch(error){
            return false;
        }

        // Verify existence of data.
        if(data == null || data == undefined){
            return false;
        }else{
            return data;
        }
    }

    // Get scanned item.
    async getScannedItem(assetId){
        // Get data.
        let data;
        try{
            data = await scanned.findOne({assetId: assetId});
        }catch(error){
            return false;
        }

        // Verify existence of data.
        if(data == null || data == undefined){
            return false;
        }else{
            return data;
        }
    }

}

const ItemsInstance = new Items();
Object.freeze(ItemsInstance);

module.exports = ItemsInstance;