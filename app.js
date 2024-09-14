require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const examRoutes = require('./routes/examRoutes');
const answerRoutes = require('./routes/answerRoutes');
const authRoutes = require('./routes/authRoutes');
const { sequelize } = require('./models');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/question', questionRoutes);
app.use('/exam', examRoutes);
app.use('/answers', answerRoutes); 

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
