const axios = require('axios');


module.exports = async function getItemThumbnail(assetId){

    let url = `https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&returnPolicy=PlaceHolder&size=150x150&format=Png&isCircular=false`;
    let response;
    try{
        response = await axios.get(`${url}`);
    }catch(error){
        return false;
    }
    return response.data.data[0].imageUrl;
}