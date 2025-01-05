const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create a new entry
router.post('/', authenticate, async (req, res) => {
  try {
    const newEntry = new Entry({ ...req.body, userId: req.userId });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all entries for the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.userId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single entry by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.userId });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an entry
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found or not authorized' });
    }
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an entry
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found or not authorized' });
    }
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
