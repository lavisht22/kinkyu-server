/** This file contains all app level routes that do not require authentication and are open. */

const express = require('express');

const router = express.Router();

const appLib = require('../../lib/app');

async function registerUser(req, res) {
  const userObject = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };

  try {
    const newUser = await appLib.registerUser(userObject);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

router.post('/register', registerUser);

module.exports = router;
