const scanned = require('../Database/schemas/scannedItem').scannedItem;
const tracked = require('./schemas/trackedItem').trackedItem;
const notable = require('./schemas/notableItem').notableItem;
const limited = require('./schemas/scannedLimitedItem').scannedItem;


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

        // Get scanned items.
        async getScannedLimitedItems(){
            // Get data.
            let data;
            try{
                data = await limited.find();
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
    // Add scanned limited item.
    async addScannedLimitedItem(item){
        // Create the new data.
        try{
            await new limited({
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
                id: item.id,
                itemType: item.itemType,
                forSale: item.forSale,
                price: item.price
            }).save();
        }catch(error){
            return false;
        }
        return true;
    }

    // Update tracked item.
    async updateTrackedItemForSale(id, forSale){
        try{
            await tracked.updateOne({id: id}, {
                forSale: forSale
            });
        }catch(error){
            return false;
        }
        return true;
    }

    async updateTrackedItemPrice(id, price){
        try{
            await tracked.updateOne({id: id}, {
                price: price
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

    // Get scanned item.
    async getScannedLimitedItem(assetId){
        // Get data.
        let data;
        try{
            data = await limited.findOne({assetId: assetId});
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

    // Returns the tracked items with only their id and itemType.
    async getTrackedItemsForBulkInfo(){
         // Get data.
         let data;
         try{
             data = await tracked.find({}, {_id: 0, forSale: 0, __v: 0, price: 0});
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

    // Returns notable tracked items with only their id and itemType.
    async getNotableTrackedItemsForBulkInfo(){
        // Get data.
        let data;
        try{
            data = await notable.find({}, {_id: 0, itemName: 0, itemDesc: 0, dateScanned: 0, creatorName: 0, createdDate: 0, __v: 0});
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

    // Returns all notable items from the DB.
    async getNotableTrackedItems(){
        // Get data.
        let data;
        try{
            data = await notable.find();
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

    // Creates a document for a new notable item.
    async addNotableItem(id, itemName, itemDesc, creatorName, createdDate){
        // Create the new data.
        let date = new Date();
        try{
            await new notable({
                id: id,
                itemType: "Asset",
                itemName: itemName,
                itemDesc: itemDesc,
                dateScanned: date,
                creatorName: creatorName,
                createdDate: createdDate
            }).save();
        }catch(error){
            return false;
        }
        return true;
    }

    // Removes a document for specified notable item from the db.
    async deleteNotableItem(id){
        try{    
            await notable.deleteOne({id: id});
        }catch(error){
            return false;
        }
        return true;
    }

}

const ItemsInstance = new Items();
Object.freeze(ItemsInstance);

module.exports = ItemsInstance;