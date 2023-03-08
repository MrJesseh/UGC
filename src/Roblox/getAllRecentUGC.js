const axios = require('axios');
const getToken = require('./getToken');
const cookie = require('../config.json').cookie;

module.exports = async function getAllRecentUGC(){

    // Grab token
    let token = await getToken();
    let headers = {
        Cookie: `.ROBLOSECURITY=${cookie};`,
        'x-csrf-token': `${token}`
    };

    let url = `https://catalog.roblox.com/v1/search/items?category=Accessories&includeNotForSale=true&keyword=white+black+red+blue+yellow+green+purple+test+hat&limit=50&salesTypeFilter=1&sortType=3&subcategory=Accessories`;
    let response;
    try{
        response = await axios.get(`${url}`, {headers: headers, withCredentials: true});
    }catch(error){
        //console.log(error);
        return false;
    }
    
    let data = await response.data;
    return data;
}