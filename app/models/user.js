const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true, unique: true },
  auth0_id: { type: String, required: true, unique: true },
  phone: { type: Number, required: false },
});
