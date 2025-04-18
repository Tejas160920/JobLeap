const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { verifyToken, requireHiringRole } = require("../middleware/authMiddleware");

router.post("/jobs", jobController.createJob); // Create a job
router.get("/jobs", jobController.getJobs);     // Get all jobs



// Public route
router.get("/", getJobs);

// Protected route (only hiring users)
router.post("/", verifyToken, requireHiringRole, createJob);

module.exports = router;
