const axios = require('axios');


module.exports = async function getGroupStore(groupId, limit){

    let url = `https://catalog.roblox.com/v2/search/items/details?Category=3&CreatorType=Group&CreatorTargetId=${groupId}&Limit=${limit}&SortAggregation=4&IncludeNotForSale`;
    let response;
    try{
        response = await axios.get(`${url}`);
    }catch(error){
        console.log(error);
        return false;
    }
    return response.data;
}