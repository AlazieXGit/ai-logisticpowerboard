const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Express Backend is running', status: 'ok' });
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: process.env.DATABASE_URL ? 'configured' : 'not configured'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on port ${PORT}`);
});
