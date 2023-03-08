const { EmbedBuilder, WebhookClient } = require('discord.js');
const moment = require('moment');
const getProductInfo = require('../Roblox/getProductInfo');
const getItemThumbnail = require('../Roblox/getItemThumbnail');
const config = require('../config.json');
const NewItemWebhook = new WebhookClient({id: config.newItemWebhook.id, token: config.newItemWebhook.key});
const OnSaleWebhook = new WebhookClient({id: config.onSaleWebook.id, token: config.onSaleWebook.key});

module.exports = {

    async sendNewItemAlert(itemName, itemDescription, assetId, price, forSale, created){
        try{
            let itemImageUrl = await getItemThumbnail(assetId);


            // Handle description.
            if(itemDescription.length == 0){
                itemDescription = "**Description:** \nN/A";
            }else{
                itemDescription = `**Description:** \n${itemDescription}`;
            }

            if(itemName.length == 0){
                itemName = "N/A";
            }

            let createdDate = moment(created).unix();
            
            let embed = new EmbedBuilder()
                .setTitle(`${itemName}`)
                .setColor('Green')
                .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                .addFields(
                    {name: "For sale?", value: `${forSale}`, inline: true},
                    {name: "Price", value: `${price}`, inline: true},
                    {name: "Uploaded", value: `<t:${createdDate}:f>`}
                )
                .setDescription(`${itemDescription}`)
                .setThumbnail(`${itemImageUrl}`)
                .setTimestamp();

            return await NewItemWebhook.send({embeds: [embed]});
        }catch(error){
            return;
        }
        
    },

    async sendTrackerAlert(itemName, itemDescription, assetId, price, forSale, created){
        
        try{
            let itemImageUrl = await getItemThumbnail(assetId);
            //console.log(itemImageUrl);

            // Handle description.
            if(itemDescription.length == 0){
                itemDescription = "**Description:** \nN/A";
            }else{
                itemDescription = `**Description:** \n${itemDescription}`;
            }

            if(itemName.length == 0){
                itemName = "N/A";
            }

            if(forSale == true){
                itemName = `[ON SALE] ${itemName}`
            }else if(forSale == false){
                itemName = `[OFFSALE] ${itemName}`;
            }

            let createdDate = moment(created).unix();
            
            let embed = new EmbedBuilder()
                .setTitle(`${itemName}`)
                .setColor('Green')
                .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                .addFields(
                    {name: "For sale?", value: `${forSale}`, inline: true},
                    {name: "Price", value: `${price}`, inline: true},
                    {name: "Uploaded", value: `<t:${createdDate}:f>`}
                )
                .setDescription(`${itemDescription}`)
                .setThumbnail(`${itemImageUrl}`)
                .setTimestamp();

            return await OnSaleWebhook.send({embeds: [embed]});
        }catch(error){
            return;
        }  
    }

} 