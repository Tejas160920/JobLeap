const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmark
} = require("../controllers/bookmarkController");

// All bookmark routes require authentication
router.use(verifyToken);

// Get all bookmarks
router.get("/", getBookmarks);

// Check if job is bookmarked
router.get("/check", checkBookmark);

// Add bookmark
router.post("/", addBookmark);

// Remove bookmark by job ID
router.delete("/:jobId", removeBookmark);

// Remove bookmark by external job ID
router.delete("/external/:externalJobId", removeBookmark);

module.exports = router;
