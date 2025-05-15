const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Bilet kaydetme
router.post('/', async (req, res) => {
  const { eventTitle, userEmail } = req.body;

  if (!eventTitle || !userEmail) {
    return res.status(400).json({ message: 'Eksik bilgi.' });
  }

  try {
    const newTicket = new Ticket({ eventTitle, userEmail });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Bilet kaydetme hatası:', error);
    res.status(500).json({ message: 'Bilet kaydedilemedi.' });
  }
});

module.exports = router;