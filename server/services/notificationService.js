const Notification = require("../models/Notification");
const { sendApplicationUpdateEmail, sendJobAlertEmail } = require("./emailService");

// Create a notification (and optionally send email)
const createNotification = async (userId, type, data, sendEmail = false) => {
  try {
    const notification = new Notification({
      user: userId,
      type,
      title: data.title,
      message: data.message,
      link: data.link || null,
      metadata: data.metadata || {}
    });

    await notification.save();

    // Send email if requested
    if (sendEmail && data.user) {
      if (type === "application_update" && data.jobTitle && data.company && data.newStatus) {
        await sendApplicationUpdateEmail(data.user, data.jobTitle, data.company, data.newStatus);
        notification.emailSent = true;
        await notification.save();
      }
    }

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Get notifications for a user
const getNotifications = async (userId, page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      Notification.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments({ user: userId })
    ]);

    return {
      notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw error;
  }
};

// Get unread notification count
const getUnreadCount = async (userId) => {
  try {
    const count = await Notification.countDocuments({ user: userId, read: false });
    return count;
  } catch (error) {
    console.error("Error getting unread count:", error);
    throw error;
  }
};

// Mark a single notification as read
const markAsRead = async (notificationId, userId) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { read: true },
      { new: true }
    );
    return notification;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Mark all notifications as read for a user
const markAllAsRead = async (userId) => {
  try {
    const result = await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );
    return result;
  } catch (error) {
    console.error("Error marking all as read:", error);
    throw error;
  }
};

// Delete a notification
const deleteNotification = async (notificationId, userId) => {
  try {
    const result = await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId
    });
    return result;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// Create welcome notification for new users
const createWelcomeNotification = async (userId) => {
  return createNotification(userId, "welcome", {
    title: "Welcome to JobLeap!",
    message: "Start your job search journey. Set up job alerts to get notified about matching opportunities.",
    link: "/"
  });
};

// Create job alert notification
const createJobAlertNotification = async (userId, alertName, jobCount, link = "/") => {
  return createNotification(userId, "job_alert", {
    title: `${jobCount} new job${jobCount > 1 ? 's' : ''} found`,
    message: `Your job alert "${alertName}" has ${jobCount} new matching ${jobCount > 1 ? 'jobs' : 'job'}.`,
    link,
    metadata: { alertName, jobCount }
  });
};

// Create application update notification
const createApplicationNotification = async (userId, jobTitle, company, newStatus, applicationId, user = null, sendEmail = false) => {
  const statusMessages = {
    pending: "is being reviewed",
    reviewing: "is under review",
    interview: "has advanced to interview stage!",
    offered: "has received an offer!",
    rejected: "has been closed",
    hired: "was successful!"
  };

  const message = `Your application for ${jobTitle} at ${company} ${statusMessages[newStatus] || `status: ${newStatus}`}`;

  return createNotification(userId, "application_update", {
    title: "Application Update",
    message,
    link: "/my-applications",
    metadata: { jobTitle, company, newStatus, applicationId },
    user,
    jobTitle,
    company,
    newStatus
  }, sendEmail);
};

module.exports = {
  createNotification,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createWelcomeNotification,
  createJobAlertNotification,
  createApplicationNotification
};
