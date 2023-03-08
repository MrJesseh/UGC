const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


module.exports = async function getGroupStore(groupName){

    let url = `https://catalog.roblox.com/v1/search/items?category=All&creatorName=${groupName}&creatorType=Group&includeNotForSale=true&limit=120&salesTypeFilter=1`;
    let response;
    try{
        response = await axios.get(`${url}`);
    }catch(error){
        return false;
    }
    
    let data = await response.data;
    return data;
}