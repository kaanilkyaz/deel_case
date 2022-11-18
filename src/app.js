const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

const adminRoute = require('./routes/admin');
const balanceRoute = require('./routes/balance');
const contractRoute = require('./routes/contract');
const jobtRoute = require('./routes/job');

app.use('/admin', adminRoute)
app.use('/balances', balanceRoute)
app.use('/contracts', contractRoute)
app.use('/jobs', jobtRoute)

module.exports = app;
