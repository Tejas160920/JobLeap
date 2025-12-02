const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { verifyToken, requireHiringRole } = require("../middleware/authMiddleware");
const { validateJobCreation } = require("../middleware/validation");

// Job routes
router.get("/jobs", jobController.getJobs);     // Get all jobs (public) - combines local + RemoteOK
router.get("/jobs/remote", jobController.getRemoteJobs); // Get remote jobs only from RemoteOK
router.post("/jobs", verifyToken, requireHiringRole, validateJobCreation, jobController.createJob); // Create a job (authenticated hiring users only)

module.exports = router;
