const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        post_id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        media_url: { type: DataTypes.STRING, allowNull: false },
        profile_id: { type: DataTypes.STRING, allowNull: false },
        profile_pic_url: { type: DataTypes.STRING, allowNull: false },
        hash_tags: { type: DataTypes.STRING, allowNull: true },
        post_date: { type: DataTypes.DATE, allowNull: false }
    };

    const options = {
        indexes: [
            {
                fields: ['post_date']
            }
        ]
    };

    return sequelize.define('Post', attributes, options);
}