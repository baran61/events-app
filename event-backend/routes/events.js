const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Public ➔ Tüm etkinlikleri listele
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Etkinlikler çekilemedi.' });
  }
});

module.exports = router;