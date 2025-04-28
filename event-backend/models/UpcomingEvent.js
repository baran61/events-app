const mongoose = require('mongoose');

const upcomingEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  date: { type: Date },
});

module.exports = mongoose.model('UpcomingEvent', upcomingEventSchema);