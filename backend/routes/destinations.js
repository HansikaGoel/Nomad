const express = require('express');
const Destination = require('../models/Destination');
const pilotData = require('../seed');

const router = express.Router();
const memoryReviews = [];
const findMemory = (id) => pilotData.find((destination) => destination.id === id);

router.get('/', async (req, res) => {
  const query = String(req.query.search || '').toLowerCase();
  if (process.env.MONGODB_URI && Destination.db.readyState === 1) {
    const result = await Destination.find(query ? { $or: [{ name: new RegExp(query, 'i') }, { state: new RegExp(query, 'i') }, { country: new RegExp(query, 'i') }] } : {}).select('id name state country tagline heroImage badges rating').lean();
    return res.json(result);
  }
  return res.json(pilotData.filter((item) => !query || `${item.name} ${item.state} ${item.country}`.toLowerCase().includes(query)).map(({ id, name, state, country, tagline, heroImage, badges, rating }) => ({ id, name, state, country, tagline, heroImage, badges, rating })));
});

router.get('/compare', (req, res) => {
  const result = [findMemory(req.query.d1), findMemory(req.query.d2)].filter(Boolean);
  if (result.length !== 2) return res.status(400).json({ error: 'Two valid destination ids are required' });
  return res.json(result.map(({ id, name, state, country, foodAndCuisine, languages, historyAndHeritage }) => ({ id, name, state, country, foodAndCuisine, languages, historyAndHeritage })));
});

router.get('/:id/dashboard', (req, res) => {
  const destination = findMemory(req.params.id);
  if (!destination) return res.status(404).json({ error: 'Destination not found' });
  return res.json({ ...destination, reviews: memoryReviews.filter((review) => review.destinationId === destination.id) });
});

router.get('/:id', (req, res) => {
  const destination = findMemory(req.params.id);
  if (!destination) return res.status(404).json({ error: 'Destination not found' });
  return res.json(destination);
});

module.exports = router;
