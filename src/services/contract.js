'use strict'
const { Contract } = require('../model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getContract = async (id, profile_id) => {
    return await Contract.findOne( { where: { 
        [Op.and]: [{ id },
            { [Op.or]: [
                { ClientId: profile_id},
                { ContractorId: profile_id }
            ] }
    ]} });
}

const getContracts = async (profile_id) => {
    return await Contract.findAll( { where: { 
        [Op.and]: [{ status: { [Op.notIn]: ['terminated'] } },
            { [Op.or]: [
                { ClientId: profile_id},
                { ContractorId: profile_id }
            ] }
    ]} });
}

module.exports = {
    getContract,
    getContracts
}