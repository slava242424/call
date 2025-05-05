const express = require('express');
const cors = require('cors');
const callRoutes = require('./routes/calls');
const clientRoutes = require('./routes/clients');
const requestRoutes = require('./routes/requests');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Маршрути
app.use('/api/calls', callRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/requests', requestRoutes);

// Домашня сторінка
app.get('/', (req, res) => {
  res.send('API для інформаційної системи Call-центр');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});