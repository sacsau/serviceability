const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { exec } = require("child_process");
const loadPincodeCityStateMapIntoTable = require("_helpers/bulkUploadServiceability");

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Post = require('../posts/post.model')(sequelize);
    const { serviceabilityModel, pincodeCityStateMapModel } = require('../serviceability/serviceability.model');
    db.Serviceability = serviceabilityModel(sequelize);
    db.PincodeCityStateMapping = pincodeCityStateMapModel(sequelize);
    // sync all models with database
    await sequelize.sync();

    db.PincodeCityStateMapping.count().then(function(count) {
        if(count == 0) {
            //bootstrap
            loadPincodeCityStateMapIntoTable("_helpers/pincodeCityStateMapping.csv", db.PincodeCityStateMapping)
        }
    });
}