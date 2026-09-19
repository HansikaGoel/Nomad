const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  const text = String(req.body.text || '').trim();
  const sourceLang = String(req.body.sourceLang || '').trim();
  const targetLang = String(req.body.targetLang || '').trim();
  if (!text || !sourceLang || !targetLang) return res.status(400).json({ error: 'text, sourceLang, and targetLang are required' });
  if (sourceLang === targetLang) return res.json({ translatedText: text });

  try {
    const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(sourceLang)}|${encodeURIComponent(targetLang)}`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Translation provider request failed');
    const payload = await response.json();
    const translatedText = payload.responseData?.translatedText;
    if (!translatedText) throw new Error('Translation provider returned no result');
    return res.json({ translatedText });
  } catch (error) {
    return res.status(502).json({ error: 'Translation service unavailable', detail: error.message });
  }
});

module.exports = router;
