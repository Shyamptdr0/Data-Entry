// server/models/Entry.js
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  id:{type: Number},
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', entrySchema);
