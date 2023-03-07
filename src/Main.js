const getAllRecentUGC = require('./Roblox/getAllRecentUGC');
const getBulkProductInfo = require('./Roblox/getBulkProductInfo');
const getGroupStore = require('./Roblox/getGroupStore');
const getGroupStoreTest = require('./Roblox/getGroupStoreTest');
const getProductInfo = require('./Roblox/getProductInfo');


async function test(){

    // let data = await getProductInfo(12547447358);
    // console.log(data);

    // let groupStore = await getGroupStore(16141691);
    // console.log(groupStore);

    let data = await getAllRecentUGC();
    //console.log(data);
    console.log(await getBulkProductInfo([data.data[0]]));

    // await logout();
    
}

test();