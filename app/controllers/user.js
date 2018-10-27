const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var db = mongoose.connection;

var { userModel } = require('./../models/index.js');

function fetchProfile(req, res) {
  res.json(req.user);
}

router.get('/profile', fetchProfile);

module.exports = router;
