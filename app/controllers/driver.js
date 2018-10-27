/** This file contains all app level routes that do not require authentication and are open. */

const express = require('express');

const router = express.Router();

const driverLib = require('../../lib/driver');

async function registerDriver(req, res) {
  const driverObject = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    vehicleNumber: req.body.vehicle,
    pushToken: req.body.pushToken,
  };

  try {
    const newUser = await driverLib.registerDriver(driverObject);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateLocation(req, res) {
  const locationObject = {
    pushToken: req.body.pushToken,
    long: Number(req.body.long),
    lat: Number(req.body.lat),
  };

  try {
    const updatedLocation = await driverLib.updateLocation(locationObject);
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function queryDrivers(req, res) {
  const locationObject = {
    long: Number(req.query.long),
    lat: Number(req.query.lat),
  };

  try {
    const drivers = await driverLib.queryDrivers(locationObject);
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.post('/register', registerDriver);
router.post('/updateLocation', updateLocation);
router.get('/queryDrivers', queryDrivers);

module.exports = router;
