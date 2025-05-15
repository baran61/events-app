const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  username: {type: String, required: true },
  eventTitle: { type: String, required: true },
  userEmail: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', TicketSchema); 