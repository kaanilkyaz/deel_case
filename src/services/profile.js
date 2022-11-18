'use strict'

const { Profile } = require('../model');

const getProfile = async (id) => {
    return await Profile.findByPk(id);
}

module.exports = {
    getProfile
}