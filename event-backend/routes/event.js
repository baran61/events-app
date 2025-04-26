const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Etkinlik ekle

router.post('/' , verifyToken, verifyAdmin, async (req,res) => {
    try {    
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch(err) {
        console.log(err);
        res.status(500).json({message:  'Etkinlik eklenemedi !' })

    }
})

// Tüm etkinlikleri getir

router.get('/', async (req, res) => {
    try {
      const events = await Event.find().sort({ date: -1 });
      res.status(200).json(events);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Etkinlikler çekilemedi.' });
    }
  });
  
  // 📝 Etkinlik güncelle

  router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedEvent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Etkinlik güncellenemedi.' });
    }
  });
  
  // ❌ Etkinlik sil
  
  router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Etkinlik silindi.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Etkinlik silinemedi.' });
    }
  });
  
  module.exports = router;