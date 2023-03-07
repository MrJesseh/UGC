const axios = require('axios');
const cookie = require('../config.json').cookie;


module.exports = async function getToken(){

    let url = `https://catalog.roblox.com/v1/catalog/items/details`;
    let headers = {
        Cookie: `.ROBLOSECURITY=${cookie};`,
        'x-csrf-token': 'o8UXxlAl3Afx'
    };

    
    let response;
    try{
        response = await axios.post(`${url}`, {items: [{id: 12711749271, itemType: 'Asset'}]}, {headers: headers, withCredentials: true});
    }catch(error){
       return error.response.headers['x-csrf-token'];
    }
}