// Create web server

// Require modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

// Create express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Comments' });
});

app.get('/comments', (req, res) => {
  res.render('comments', { title: 'Comments' });
});

// POST route from form
app.post('/comments', [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('email').isLength({ min: 1 }).withMessage('Email is required'),
  check('comment').isLength({ min: 1 }).withMessage('Comment is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('comments', {
      title: 'Comments',
      errors: errors.array(),
      data: req.body
    });
  } else {
    res.render('comments', {
      title: 'Comments',
      success: 'Comment submitted successfully!',
      data: {}
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});