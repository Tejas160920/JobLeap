let app;

try {
  app = require('../server');
} catch (error) {
  // If server fails to load, create a minimal app that shows the error
  const express = require('express');
  app = express();
  app.use((req, res) => {
    res.status(500).json({
      success: false,
      message: 'Server failed to initialize',
      error: error.message,
      stack: error.stack
    });
  });
}

module.exports = app;
