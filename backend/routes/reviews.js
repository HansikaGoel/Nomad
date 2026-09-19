const express = require('express');
const Review = require('../models/Review');
const destinations = require('../seed');

const router = express.Router();
const reviews = [];
router.get('/:destinationId', (req, res) => res.json(reviews.filter((review) => review.destinationId === req.params.destinationId)));
router.post('/', (req, res) => {
  const { destinationId, userName, authorName, rating, comment, itemCategory = 'Destination' } = req.body;
  const reviewer = userName || authorName;
  if (!destinations.some((item) => item.id === destinationId) || !reviewer || !comment || Number(rating) < 1 || Number(rating) > 5) return res.status(400).json({ error: 'destinationId, userName, comment, and a rating from 1 to 5 are required' });
  const review = { id: `review-${Date.now()}`, destinationId, userName: reviewer, rating: Number(rating), comment, itemCategory, verifiedTraveler: true, date: new Date().toISOString() };
  reviews.unshift(review);
  if (process.env.MONGODB_URI && Review.db.readyState === 1) Review.create(review).catch(() => { });
  return res.status(201).json(review);
});
module.exports = router;
