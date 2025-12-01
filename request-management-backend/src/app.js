const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const requestRoutes = require('./routes/request.routes');
const { auth } = require("./middleware/auth"); // <-- ADD THIS

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// basic request logging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Health route
app.get('/', (_req, res) => {
  res.send('API running');
});

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/requests', auth, requestRoutes);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

async function init() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected & synced');
  } catch (error) {
    console.error('DB init error:', error);
  }
}

init();

module.exports = app;
