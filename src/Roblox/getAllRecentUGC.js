const axios = require('axios');

module.exports = async function getAllRecentUGC(){

    let url = `https://catalog.roblox.com/v1/search/items?category=Accessories&includeNotForSale=true&keyword=white+black+red+blue+yellow+green+purple+test+hat&limit=50&salesTypeFilter=1&sortType=3&subcategory=Accessories`;
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