'use strict'
const { Profile } = require('../model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const updateBalance = async (id, balance) => {
    return await Profile.update({ balance }, {
        where: { id }
    });
}

module.exports = {
    updateBalance
}