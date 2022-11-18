'use strict'

const express = require('express');
const router = express.Router();
const adminService = require('../services/admin');

const getBestProfession = async (req, res, next) => {
    try {
        const { start, end, limit } = req.query;
        let mostEarnedContractor = await adminService.getMostEarnedContractor({ start, end, limit });
        if(!mostEarnedContractor.length) return res.status(404).end("No one");
        
        mostEarnedContractor = mostEarnedContractor.map(c => {
            return {
                id: c['Contract.Contractor.id'],
                fullName: c['Contract.Contractor.fullName'],
                earned: c['totalEarned']
            }
        })

        res.json(mostEarnedContractor);
    } catch (error) {
        next(error);
    }
}

const getBestClients = async (req, res, next) => {
    try {
        const { start, end, limit } = req.query;
        let mostPaidClients = await adminService.getMostPaidClients({ start, end, limit });
        if(!mostPaidClients.length) return res.status(404).end();

        mostPaidClients = mostPaidClients.map(c => {
            return {
                id: c['Contract.Client.id'],
                fullName: c['Contract.Client.fullName'],
                paid: c['totalPaid']
            }
        });

        res.json(mostPaidClients)
    } catch (error) {
        next(error);
    }
}

router.get('/best-profession', getBestProfession);
router.get('/best-clients', getBestClients);

module.exports = router