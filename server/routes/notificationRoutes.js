const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

// All routes require authentication
router.use(verifyToken);

// Get user's notifications (paginated)
router.get("/", notificationController.getNotifications);

// Get unread notification count
router.get("/unread-count", notificationController.getUnreadCount);

// Mark a single notification as read
router.put("/:id/read", notificationController.markAsRead);

// Mark all notifications as read
router.put("/read-all", notificationController.markAllAsRead);

// Delete a notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
