if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const app = express();
  const expressLayouts = require('express-ejs-layouts');
  const indexRouter = require('./routes/index');
  
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.set('layout', 'layouts/layout');
  app.use(expressLayouts);
  app.use(express.static('public'));
  
  const mongoose = require('mongoose');
  
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in the environment variables.');
  }
  
  // Connect to MongoDB using the DATABASE_URL
  mongoose.connect(process.env.DATABASE_URL)
  
  const db = mongoose.connection;
  db.on('error', error => console.error(error));
  db.once('open', () => console.log('Connected to mongoose'));
  
  app.use('/', indexRouter);
  app.listen(process.env.PORT || 3000);
  