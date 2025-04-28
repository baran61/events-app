const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const UpcomingEvent = require('../models/UpcomingEvent');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// --- Etkinlik İşlemleri ---
router.get('/events', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Etkinlikler çekilemedi.' });
  }
});

router.post('/events', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Etkinlik eklenemedi.' });
  }
});

router.put('/events/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Etkinlik güncellenemedi.' });
  }
});

router.delete('/events/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Etkinlik silindi.' });
  } catch (err) {
    res.status(500).json({ message: 'Etkinlik silinemedi.' });
  }
});

// --- Yaklaşan Etkinlik İşlemleri ---
router.get('/upcoming', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const upcomingEvents = await UpcomingEvent.find().sort({ date: 1 });
    res.status(200).json(upcomingEvents);
  } catch (err) {
    res.status(500).json({ message: 'Yaklaşan etkinlikler çekilemedi.' });
  }
});

router.post('/upcoming', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newUpcoming = new UpcomingEvent(req.body);
    await newUpcoming.save();
    res.status(201).json(newUpcoming);
  } catch (err) {
    res.status(500).json({ message: 'Yaklaşan etkinlik eklenemedi.' });
  }
});

router.put('/upcoming/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedUpcoming = await UpcomingEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUpcoming);
  } catch (err) {
    res.status(500).json({ message: 'Yaklaşan etkinlik güncellenemedi.' });
  }
});

router.delete('/upcoming/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await UpcomingEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Yaklaşan etkinlik silindi.' });
  } catch (err) {
    res.status(500).json({ message: 'Yaklaşan etkinlik silinemedi.' });
  }
});

module.exports = router;