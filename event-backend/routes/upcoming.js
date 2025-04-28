const express = require('express');
const router = express.Router();
const UpcomingEvent = require('../models/UpcomingEvent');

// Tüm yaklaşan etkinlikleri getir
router.get('/', async (req, res) => {
  try {
    const upcomingEvents = await UpcomingEvent.find().sort({ date: 1 });
    res.status(200).json(upcomingEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Yaklaşan etkinlikler çekilemedi.' });
  }
});

module.exports = router;