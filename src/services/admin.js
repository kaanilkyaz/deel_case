'use strict'
const { Job, Contract, Profile } = require('../model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getMostEarnedContractor = async (data) => {
    return await Job.findAll({
        where: { paid: true, paymentDate: { [Op.between]: [data.start, data.end] }},
        attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'totalEarned']],
        include: [{
            model: Contract,
            include: [{
                model: Profile,
                as: 'Contractor',
                attributes: ['id', [Sequelize.literal("firstName || ' ' || lastName"), 'fullName']],
            }]
        }],
        order: [["totalEarned", "DESC"]],
        group: ['Contract.Contractor.id'],
        limit: data.limit || 1,
        raw: true
    });
}

const getMostPaidClients = async (data) => {
    return await Job.findAll({
        where: { paid: true, paymentDate: { [Op.between]: [data.start, data.end] }},
        attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'totalPaid']],
        include: [{
            model: Contract,
            include: [{
                model: Profile,
                as: 'Client',
                attributes: ['id', [Sequelize.literal("firstName || ' ' || lastName"), 'fullName']],
            }]
        }],
        order: [["totalPaid", "DESC"]],
        group: ['Contract.Client.id'],
        limit: data.limit || 2,
        raw: true
    });
}

module.exports = {
    getMostEarnedContractor,
    getMostPaidClients
}