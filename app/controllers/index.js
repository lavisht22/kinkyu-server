const express = require('express');
const { checkJwt } = require('../../helpers/auth0');

const router = express.Router();

const userRoutes = require('./user');
const appRoutes = require('./app');
const driverRoutes = require('./driver');

router.get('/', function(req, res) {
  res.json({ title: 'Lavish Thakkar' });
});

router.use('/app', appRoutes);
router.use('/driver', driverRoutes);
router.use(checkJwt);
router.use(function(err, req, res, next) {
  if (err) {
    console.log(err);
    res.status(500).json(err);
  } else {
    console.log('Next');
    next();
  }
});

router.use('/user', userRoutes);

module.exports = router;
