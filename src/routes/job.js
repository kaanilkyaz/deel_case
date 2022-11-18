'use strict'

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jobService = require('../services/job');
const balanceService = require('../services/balance');
const profileService = require('../services/profile');
const { getProfile } = require('../middleware/getProfile');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const getUnpaidJobs = async (req, res, next) => {
    try {
        const profile_id = req.profile.id;
        const unpaidJobs = await jobService.getUnpaidJobsWithActiveContracts(profile_id);
        if(!unpaidJobs.length) return res.status(404).end('You dont have any unpaid jobs');
        res.json(unpaidJobs)
    } catch (error) {
        next(error);
    }
}

const payJob = async (req, res, next) => {
    try {
        const { job_id } = req.params;
        const job = await jobService.getJob(job_id);
        if(!job) return res.status(404).end("There is no job");

        const balance = req.profile.balance;
        const contractor = await profileService.getProfile(job.Contract.ContractorId);

        lock.acquire(`${req.profile.id + '' + contractor.id}`, async function(cb) {
            console.log("------------ Concurrency safe--------------");
            if(job.paid) return res.status(404).end("You have already paid your job!");
            if(job.price > balance) return res.status(404).end("Not enough balance!");
            await Promise.all([
                balanceService.updateBalance(req.profile.id, balance - job.price),
                balanceService.updateBalance(contractor.id, contractor.balance + job.price),
                jobService.updateJobStatus(job_id)
            ]);
            cb();
            return res.send('payment is success');
        }, 
        function(err, ret) {
            console.error("Payment Error: " + err);
            console.log("--------lock released ----------")
        });
    } catch (error) {
        next(error);
    }
}

router.get('/unpaid', getProfile, getUnpaidJobs)
router.post('/:job_id/pay', getProfile, payJob)

module.exports = router