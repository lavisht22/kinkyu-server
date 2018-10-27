const mongoose = require('mongoose');

const userSchema = require('./user');
const driverSchema = require('./driver');

const user = mongoose.model('User', userSchema);
const driver = mongoose.model('Driver', driverSchema);

module.exports = { User: user, Driver: driver };
