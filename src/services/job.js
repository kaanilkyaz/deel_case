'use strict'
const { Job, Contract } = require('../model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getUnpaidJobsWithActiveContracts = async (profile_id) => {
    return await Job.findAll({ 
        where: { paid: { [Op.eq]: null } },
        include: [{
            model: Contract,
            where: { [Op.and]: [
                { status: { [Op.notIn]: ['terminated'] } },
                { [Op.or]: [
                    { ClientId: profile_id},
                    { ContractorId: profile_id }
                ] }
            ]},
        }]
    });
}

const getJob = async (id) => {
    return await Job.findByPk(id, {
        include: [{
            model: Contract,
        }] 
    });
}

const updateJobStatus = async (id) => {
    return await Job.update({ 
        paid: true,
        paymentDate: new Date().toISOString()
    }, {
        where: { id }
    });
}

module.exports = {
    getUnpaidJobsWithActiveContracts,
    getJob,
    updateJobStatus
}