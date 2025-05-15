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
    type: String, 
    required: false, 
  },
  date: {
    type: Date, 
    required: true,
  },
}, { timestamps: true }); 

module.exports = mongoose.model('Event', EventSchema);