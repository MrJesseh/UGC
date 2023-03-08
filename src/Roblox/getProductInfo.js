const axios = require('axios');


module.exports = async function getProductInfo(assetId){

    let url = `https://economy.roblox.com/v2/assets/${assetId}/details`;
    let response;
    try{
        response = await axios.get(`${url}`);
    }catch(error){
        return false;
    }
    return response.data;
}