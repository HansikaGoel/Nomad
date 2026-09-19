const mongoose = require('mongoose');

const imageItem = {
  imageUrl: { type: String, required: true },
};

const destinationSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, index: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: 'India' },
  tagline: String,
  heroImage: { type: String, required: true },
  badges: [String],
  rating: Number,
  templesAndBeliefs: [{ name: String, story: String, belief: String, ...imageItem }],
  foodAndCuisine: [{ dishName: String, description: String, vendorTrail: String, ...imageItem }],
  folkDanceAndMusic: [{ formName: String, category: String, instruments: String, description: String, ...imageItem }],
  folkArtAndAttire: [{ artName: String, attireType: String, craftsmanship: String, ...imageItem }],
  historyAndHeritage: [{ siteName: String, historicalContext: String, ...imageItem }],
  languages: {
    primary: String,
    phrases: [{ original: String, phonetic: String, translation: String, note: String }],
    etiquette: [String]
  },
  gallery: [String]
}, { timestamps: true });

module.exports = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
