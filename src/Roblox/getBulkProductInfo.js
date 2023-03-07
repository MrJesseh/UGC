const axios = require('axios');
const cookie = require('../config.json').cookie;
const getToken = require('./getToken');


module.exports = async function getProductInfo(assets){

    // Grab token
    let token = await getToken();

    let url = `https://catalog.roblox.com/v1/catalog/items/details`;
    let headers = {
        Cookie: `.ROBLOSECURITY=${cookie};`,
        'x-csrf-token': `${token}`
    };

    
    let response;
    try{
        response = await axios.post(`${url}`, {items: assets}, {headers: headers, withCredentials: true});
    }catch(error){
        console.log(error);
        return false;
    }
    return response.data;
}