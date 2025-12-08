const express = require('express');
const router = express.Router();
const h1bController = require('../controllers/h1bController');

// Get H1B statistics overview
router.get('/stats', h1bController.getStats);

// Search salaries by job title
router.get('/salaries', h1bController.searchSalaries);

// Get list of sponsor names (for job matching)
router.get('/sponsor-names', h1bController.getSponsorNames);

// Get all sponsors with search/filter
router.get('/sponsors', h1bController.getSponsors);

// Get single company by slug
router.get('/sponsors/:slug', h1bController.getCompanyBySlug);

module.exports = router;
