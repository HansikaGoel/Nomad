const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  destinationId: { type: String, required: true },
  userName: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true, trim: true },
  itemCategory: { type: String, default: 'Destination' },
  verifiedTraveler: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
