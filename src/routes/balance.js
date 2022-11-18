'use strict'

const express = require('express');
const router = express.Router();
const jobService = require('../services/job');
const balanceService = require('../services/balance');
const { getProfile } = require('../middleware/getProfile');

const depositMoney = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if(userId != req.profile.id) return res.status(404).end("You can only deposit money to your account!");

        const jobs = await jobService.getUnpaidJobsWithActiveContracts(userId);
        if(!jobs.length) return res.status(404).end("You dont have unpaid jobs");

        const totalUnpaidJobAmount = jobs.reduce((acc, { price }) => acc + price, 0);
        if(+req.body.amount > totalUnpaidJobAmount * 1.25) res.status(404).end("You can't deposit more than 25% your total of jobs to pay!");
        
        await balanceService.updateBalance(userId, +req.body.amount + req.profile.balance);
        res.send('deposit is successful');
    } catch (error) {
        next(error);
    }
}

router.post('/deposit/:userId', getProfile, depositMoney)

module.exports = router