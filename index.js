const express = require('express');
const connectDB = require('./config/db');
const interviewRoutes = require('./routes/interviewRoutes');
const userAnswerRoutes = require('./routes/userAnswerRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Local development URL
  'https://ai-interview-app-red.vercel.app', // Vercel deployment URL
  // Add more allowed origins if needed
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials if required (e.g., cookies)
}));

// Connect to the database
connectDB();

// Routes
app.use('/api/interviews', interviewRoutes);
app.use('/api/userAnswer', userAnswerRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('<h1>This is Homepage</h1>');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
