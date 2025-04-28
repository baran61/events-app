const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const eventsRoutes = require('./routes/events');
const upcomingRoutes = require('./routes/upcoming');

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Kullanıcı işlemleri
app.use('/api/events', eventsRoutes);    // Etkinlikleri GÖRMEK için
app.use('/api/upcoming', upcomingRoutes); // Yaklaşan etkinlikleri GÖRMEK için

// Admin işlemleri
app.use('/api/admin', adminRoutes); // Sadece admin için yönetim işlemleri

// Kullanıcı auth işlemleri
app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));