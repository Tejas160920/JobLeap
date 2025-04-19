const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { verifyToken, requireHiringRole } = require("../middleware/authMiddleware");

router.post("/jobs", jobController.createJob); // Create a job
router.get("/jobs", jobController.getJobs);     // Get all jobs



router.get("/", jobController.getJobs);
router.post("/", verifyToken, requireHiringRole, jobController.createJob);


module.exports = router;
