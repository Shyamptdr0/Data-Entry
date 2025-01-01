// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/entries', require('./routes/entryRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const path=require("path");
// app.use(express.static('Frontend/dist'));
//  app.get('*', (req, res) => {
//     res.sendFile(path.resolve('Frontend','dist','index.html'));
// });
