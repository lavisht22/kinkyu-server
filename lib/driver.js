const mongoose = require('mongoose');
const { Driver } = require('../app/models');

async function registerDriver(driverObject) {
  const newDriver = new Driver(driverObject);
  const savedDriver = await newDriver.save();
  return savedDriver;
}

async function updateLocation(locationObject) {
  const driver = await Driver.findOne({ pushToken: locationObject.pushToken });
  driver.location = { type: 'Point', coordinates: [locationObject.long, locationObject.lat] };
  const savedDriver = await driver.save();
  return savedDriver;
}

async function queryDrivers(locationObject) {
  const drivers = await Driver.find({
    location: {
      $near: {
        $maxDistance: 10000,
        $geometry: {
          type: 'Point',
          coordinates: [locationObject.long, locationObject.lat],
        },
      },
    },
  });

  return drivers;
}

module.exports = {
  registerDriver,
  updateLocation,
  queryDrivers,
};