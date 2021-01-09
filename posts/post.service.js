const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
    getAll,
    create
};

async function getAll({post_date, offset, count}) {

    let limits = {
        offset: offset,
        limit: count
    }

    return await db.Post.findAll({
        where : {
            post_date : {
                [Op.lte]: post_date,
            } 
        },
        ...limits
    })
}

async function create(params) {
    // validate
    if (await db.Post.findOne({ where: { post_id: params.post_id } })) {
        throw 'Post "' + params.post_id + '" is already taken';
    }

    // save post
    await db.Post.create(params);
}
