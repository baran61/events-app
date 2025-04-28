const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // 🔥 Resim URL'si
    required: false, // Resim opsiyonel
  },
  date: {
    type: Date, // 🔥 Tarih bilgisi
    required: true,
  },
}, { timestamps: true }); // createdAt, updatedAt otomatik eklenir

module.exports = mongoose.model('Event', EventSchema);