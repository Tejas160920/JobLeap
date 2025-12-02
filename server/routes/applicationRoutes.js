const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const { verifyToken } = require("../middleware/authMiddleware");

// Fix indexes route (no auth required, run once)
router.get("/fix-indexes", applicationController.fixIndexes);

// Debug endpoint (no auth required)
router.get("/debug", applicationController.debugApplications);

// All routes below require authentication
router.use(verifyToken);

// Clear user's applications (for testing)
router.delete("/clear-mine", applicationController.clearMyApplications);

// Get user's applications
router.get("/", applicationController.getMyApplications);

// Apply for a job
router.post("/", applicationController.applyForJob);

// Get single application details
router.get("/:applicationId", applicationController.getApplicationDetails);

// Withdraw application
router.patch("/:applicationId/withdraw", applicationController.withdrawApplication);

module.exports = router;
