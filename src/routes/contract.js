'use strict'

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const contractService = require('../services/contract');
const { getProfile } = require('../middleware/getProfile');

const getContract = async (req, res, next) => {
    try {
        const { id } = req.params;
        const profile_id = req.profile.id;
        const contract = await contractService.getContract(id, profile_id);
        if(!contract) return res.status(404).end("You can only get your contracts")
        res.json(contract)
    } catch (error) {
        next(error);
    }
}

const getContracts = async (req, res, next) => {
    try {
        const profile_id = req.profile.id;
        const contracts = await contractService.getContracts(profile_id);
        if(!contracts.length) return res.status(404).end()
        res.json(contracts)
    } catch (error) {
        next(error);
    }
}

router.get('/', getProfile, getContracts)
router.get('/:id', getProfile, getContract)

module.exports = router