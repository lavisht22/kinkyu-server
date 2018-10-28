const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: false },
  vehicleNumber: { type: String, required: true },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
