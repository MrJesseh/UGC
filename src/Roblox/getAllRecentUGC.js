const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');


module.exports = async function getAllRecentUGC(){

    let url = `https://catalog.roblox.com/v1/search/items?category=Accessories&includeNotForSale=true&keyword=white+black+red+blue+yellow+green+purple+test+hat&limit=120&salesTypeFilter=1&sortType=3&subcategory=Accessories`;
    let response;
    try{
        response = await axios.get(`${url}`);
    }catch(error){
        console.log(error);
        return false;
    }
    
    let data = await response.data;
    return data;
}