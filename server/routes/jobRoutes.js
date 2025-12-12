const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { verifyToken, requireHiringRole } = require("../middleware/authMiddleware");
const { validateJobCreation } = require("../middleware/validation");

// Job routes
router.get("/jobs", jobController.getJobs);     // Get all jobs (public) - from MongoDB
router.get("/jobs/stats", jobController.getJobStats); // Get job aggregation stats (public)
router.get("/jobs/refresh", jobController.refreshJobCache); // Info about refresh endpoint
router.get("/jobs/my-jobs", verifyToken, requireHiringRole, jobController.getMyJobs); // Get jobs posted by current user
router.get("/jobs/:id", jobController.getJobById); // Get a single job by ID (public)
router.post("/jobs", verifyToken, requireHiringRole, validateJobCreation, jobController.createJob); // Create a job
router.put("/jobs/:id", verifyToken, requireHiringRole, jobController.updateJob); // Update a job
router.delete("/jobs/:id", verifyToken, requireHiringRole, jobController.deleteJob); // Delete a job

module.exports = router;
