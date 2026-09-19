const express = require('express');
const cors = require('cors');
require('dotenv').config();

const destinations = require('./seed');
const destinationRoutes = require('./routes/destinations');
const aiItineraryRoutes = require('./routes/aiItinerary');
const reviewRoutes = require('./routes/reviews');
const translatorRoutes = require('./routes/translator');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const findDestination = (id) => destinations.find((destination) => destination.id === id);

app.get('/api/health', (req, res) => res.json({ status: 'ok', provider: 'memory' }));

app.use('/api/destinations', destinationRoutes);
app.use('/api/ai', aiItineraryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/translate', translatorRoutes);

app.post('/api/translator/scan', (req, res) => {
  const text = String(req.body.text || '').trim();
  const destination = findDestination(req.body.destinationId) || destinations[0];
  const phrase = destination.languages.phrases.find((item) => item.original.toLowerCase() === text.toLowerCase());
  res.json(phrase || { original: text || destination.languages.phrases[0].original, phonetic: destination.languages.phrases[0].phonetic, translation: destination.languages.phrases[0].translation, note: destination.languages.phrases[0].note });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`NOMADE backend listening on http://localhost:${PORT}`));

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected; memory data remains available as a demo fallback.'))
    .catch(() => console.warn('MongoDB unavailable; serving the in-memory pilot dataset.'));
}

module.exports = app;