const scanned = require('../Database/schemas/scannedItem').scannedItem;
const tracked = require('./schemas/trackedItem').trackedItem;
const notable = require('./schemas/notableItem').notableItem;


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
                id: item.id,
                itemType: item.itemType,
                forSale: item.forSale
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

    async getTrackedItemsForBulkInfo(){
         // Get data.
         let data;
         try{
             data = await tracked.find({}, {_id: 0, forSale: 0, __v: 0});
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