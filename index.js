// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  app.get("/", (req, res)=>{
    res.send("Server is running");
    const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const entryRoutes = require('./routes/entryRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/entries', entryRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Serve static files from the Frontend folder
const path = require("path");
app.use(express.static('Frontend'));

// Serve index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve('Frontend', 'index.html'));
});
  })
// Routes
app.use('/api/entries', require('./routes/entryRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const path=require("path");
// app.use(express.static('Frontend'));
//  app.get('*', (req, res) => {
//     res.sendFile(path.resolve('Frontend','index.html'));
// });