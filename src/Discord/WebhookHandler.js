const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, WebhookClient } = require('discord.js');
const moment = require('moment');
const getItemThumbnail = require('../Roblox/getItemThumbnail');
const config = require('../config.json');
const NewItemWebhook = new WebhookClient({id: config.newItemWebhook.id, token: config.newItemWebhook.key});
const OnSaleWebhook = new WebhookClient({id: config.onSaleWebook.id, token: config.onSaleWebook.key});
const NotableItemAlert = new WebhookClient({id: config.notableWebhook.id, token: config.notableWebhook.key});
const LimitedItemAlert = new WebhookClient({id: config.limitedWebhook.id, token: config.limitedWebhook.key});

module.exports = {

    async sendNewItemAlert(itemName, itemDescription, assetId, price, forSale, created, creator){
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
                    {name: "Creator", value: `${creator}`, inline: true},
                    {name: "Uploaded", value: `<t:${createdDate}:f>`}
                )
                .setDescription(`${itemDescription}`)
                .setThumbnail(`${itemImageUrl}`)
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                        .setEmoji('↗️')
                        .setLabel("Go to Item")
                );

            return await NewItemWebhook.send({embeds: [embed], components: [row], content: "<@&1083867069692522616>"});
        }catch(error){
            return;
        }
        
    },

    async sendTrackerAlert(itemName, itemDescription, assetId, price, forSale){
        
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
            
            let embed = new EmbedBuilder()
                .setTitle(`${itemName}`)
                .setColor('Green')
                .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                .addFields(
                    {name: "For sale?", value: `${forSale}`, inline: true},
                    {name: "Price", value: `${price}`, inline: true},
                )
                .setDescription(`${itemDescription}`)
                .setThumbnail(`${itemImageUrl}`)
                .setTimestamp();

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                    .setEmoji('↗️')
                    .setLabel("Go to Item")
            );

            return await OnSaleWebhook.send({embeds: [embed], components: [row], content: "<@&1087405640642723862>"});
        }catch(error){
            return;
        }  
    },

    async sendPriceChangeAlert(itemName, change, itemDescription, assetId, fromPrice, toPrice){
        
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
            
            let embed = new EmbedBuilder()
                .setTitle(`${change} | ${itemName}`)
                .setColor('Yellow')
                .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                .addFields(
                    {name: "Original Price", value: `${fromPrice}`, inline: true},
                    {name: "New Price", value: `${toPrice}`, inline: true},
                )
                .setDescription(`${itemDescription}`)
                .setThumbnail(`${itemImageUrl}`)
                .setTimestamp();

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                    .setEmoji('↗️')
                    .setLabel("Go to Item")
            );

            return await OnSaleWebhook.send({embeds: [embed], components: [row], content: "<@&1087405640642723862>"});
        }catch(error){
            return;
        }  
    },

    async sendNotableItemAlert(itemName, itemDescription, assetId, price, forSale, created, creator){
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
                    {name: "Creator", value: `${creator}`, inline: true},
                    {name: "Uploaded", value: `<t:${createdDate}:f>`}
                )
                .setDescription(`${itemDescription}`)
                .setThumbnail(`${itemImageUrl}`)
                .setTimestamp();

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                    .setEmoji('↗️')
                    .setLabel("Go to Item")
            );

            return await NotableItemAlert.send({embeds: [embed], components: [row], content: "<@&1083867118921076746>"});
        }catch(error){
            return;
        }
        
    },

    async sendPossibleLimitedAlert(itemName, itemDescription, assetId, price, forSale, created, creator){
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
                    {name: "Creator", value: `${creator}`, inline: true},
                    {name: "Uploaded", value: `<t:${createdDate}:f>`}
                )
                .setDescription(`${itemDescription}`)
                .setThumbnail(`${itemImageUrl}`)
                .setTimestamp();

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://www.roblox.com/catalog/${assetId}/`)
                    .setEmoji('↗️')
                    .setLabel("Go to Item")
            );

            return await LimitedItemAlert.send({embeds: [embed], components: [row], content: "<@&1083867165331042354>"});
        }catch(error){
            return;
        }
        
    }
} 