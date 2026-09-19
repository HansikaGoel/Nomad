const express = require('express');
const destinations = require('../seed');

const router = express.Router();
router.post('/itinerary', (req, res) => {
  const destination = destinations.find((item) => item.id === req.body.destinationId) || destinations[0];
  const days = Math.max(1, Math.min(7, Number(req.body.days) || 3));
  const focus = req.body.focus || 'heritage';
  const activities = [
    `Begin with ${destination.historyAndHeritage[0].siteName} before the crowds arrive.`,
    `Taste ${destination.foodAndCuisine[0].dishName} and ask your host about its story.`,
    `Meet makers around ${destination.folkArtAndAttire[0].artName} and browse their studio work.`,
    `End the day with ${destination.folkDanceAndMusic[0].formName}, a living expression of local identity.`
  ];
  return res.json({ title: `${days} days of ${focus} in ${destination.name}`, itinerary: Array.from({ length: days }, (_, index) => ({ day: index + 1, focus: ['Arrive & orient', 'Taste the city', 'Make something by hand', 'Listen after dark'][index % 4], activity: activities[index % activities.length] })) });
});
module.exports = router;
