const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    isSupported,
    create
};

async function isSupported({pincode, sku}) {

    const serviceability = await db.Serviceability.findOne({ where: { sku } });
    if(!serviceability) {
        return true
    }

    locations = JSON.parse(serviceability.locations)
    console.log(locations)
    const pincodes = locations["pincodes"];
    const states = locations["states"];
    const cities = serviceability["cities"];

    if(pincodes.includes(pincode)) {
        return true;
    }

    if(states) {
        console.log(states);
        if(states.includes(await getState(pincode))) {
            return true;
        }
    }

    // if(cities && cities.includes(getCity(pincode))) {
    //     return true;
    // }

    return false;
}


async function getState(pincode) {
    const pincodeCityStateMap = await db.PincodeCityStateMapping.findOne({ where: { pincode } });
    if(pincodeCityStateMap) {
        console.log(pincodeCityStateMap.state);
        return pincodeCityStateMap.state;
    }

    return null;
}

async function create(params) {
    // validate
    if (await db.Serviceability.findOne({ where: { sku: params.sku } })) {
        throw 'SKU "' + params.sku + '" is already assigned serviceable pincodes';
    }

    params.locations = JSON.stringify(params.locations)
    // save post
    await db.Serviceability.create(params);
}
