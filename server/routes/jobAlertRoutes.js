const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const jobAlertController = require("../controllers/jobAlertController");

// All routes require authentication
router.use(verifyToken);

// Get user's job alerts
router.get("/", jobAlertController.getJobAlerts);

// Create a new job alert
router.post("/", jobAlertController.createJobAlert);

// Update a job alert
router.put("/:id", jobAlertController.updateJobAlert);

// Delete a job alert
router.delete("/:id", jobAlertController.deleteJobAlert);

// Toggle job alert active status
router.put("/:id/toggle", jobAlertController.toggleJobAlert);

module.exports = router;
