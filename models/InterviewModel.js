// models/Interview.js
const mongoose = require('mongoose');


// Define the interview schema
const interviewSchema = new mongoose.Schema({
  jobPosition: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  jobExperience: {
    type: Number,
    required: true,
  },
  jsonMockRes: {
    type: [Object], // Array of question-answer pairs
    required: true,
  },
  createdBy: {
    type: String, // Email or any unique identifier
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  mockId: {
    type: String,
    
  }
});

module.exports = mongoose.model('Interview', interviewSchema);
