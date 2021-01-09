const { DataTypes } = require('sequelize');

module.exports = {
	serviceabilityModel,
	pincodeCityStateMapModel
};

function serviceabilityModel(sequelize) {
    const attributes = {
        sku: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        locations: { type: DataTypes.STRING, allowNull: true },
    };

    return sequelize.define('Serviceability', attributes);
}

function pincodeCityStateMapModel(sequelize) {
    const attributes = {
        pincode: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        city: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false },
    };

    return sequelize.define('PincodeCityStateMapping', attributes);
}