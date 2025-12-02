const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const { verifyToken } = require("../middleware/authMiddleware");

// Fix indexes route (no auth required, run once)
router.get("/fix-indexes", applicationController.fixIndexes);

// All routes below require authentication
router.use(verifyToken);

// Get user's applications
router.get("/", applicationController.getMyApplications);

// Apply for a job
router.post("/", applicationController.applyForJob);

// Get single application details
router.get("/:applicationId", applicationController.getApplicationDetails);

// Withdraw application
router.patch("/:applicationId/withdraw", applicationController.withdrawApplication);

module.exports = router;
