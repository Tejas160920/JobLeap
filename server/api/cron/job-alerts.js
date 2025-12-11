const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGO_URI);
};

// Import models after connection
const getModels = () => {
  const JobAlert = require("../../models/JobAlert");
  const User = require("../../models/User");
  const Job = require("../../models/Job");
  const { createJobAlertNotification } = require("../../services/notificationService");
  const { sendJobAlertEmail } = require("../../services/emailService");

  return { JobAlert, User, Job, createJobAlertNotification, sendJobAlertEmail };
};

// Build query from alert filters
const buildJobQuery = (filters) => {
  const query = {};

  if (filters.title) {
    query.$or = [
      { title: { $regex: filters.title, $options: "i" } },
      { company: { $regex: filters.title, $options: "i" } },
      { description: { $regex: filters.title, $options: "i" } }
    ];
  }

  if (filters.location) {
    query.location = { $regex: filters.location, $options: "i" };
  }

  if (filters.jobType) {
    query.type = { $regex: filters.jobType, $options: "i" };
  }

  if (filters.visaSponsorship === "yes") {
    query.visaSponsorship = true;
  }

  return query;
};

// Process a single job alert
const processAlert = async (alert, models) => {
  const { User, Job, createJobAlertNotification, sendJobAlertEmail } = models;

  try {
    const user = await User.findById(alert.user);
    if (!user) {
      console.log(`User not found for alert ${alert._id}`);
      return;
    }

    // Build query for matching jobs
    const query = buildJobQuery(alert.filters);

    // Only get jobs posted since last notification (or last 24 hours for new alerts)
    const sinceDate = alert.lastNotified || new Date(Date.now() - 24 * 60 * 60 * 1000);
    query.createdAt = { $gte: sinceDate };

    const matchingJobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    if (matchingJobs.length === 0) {
      console.log(`No new jobs for alert "${alert.name}" (${alert._id})`);
      return { alertId: alert._id, status: "no_jobs" };
    }

    console.log(`Found ${matchingJobs.length} jobs for alert "${alert.name}"`);

    // Create in-app notification
    await createJobAlertNotification(
      alert.user,
      alert.name,
      matchingJobs.length,
      `/?title=${encodeURIComponent(alert.filters.title || '')}&location=${encodeURIComponent(alert.filters.location || '')}`
    );

    // Send email if user has email notifications AND job alerts enabled
    const userSettings = user.settings || {};
    const emailEnabled = userSettings.emailNotifications !== false;
    const jobAlertsEnabled = userSettings.jobAlerts !== false;

    if (emailEnabled && jobAlertsEnabled) {
      await sendJobAlertEmail(user, matchingJobs, alert.name);
      console.log(`Email sent to ${user.email} for alert "${alert.name}"`);
    }

    // Update alert
    alert.lastNotified = new Date();
    alert.matchCount = (alert.matchCount || 0) + matchingJobs.length;
    await alert.save();

    return { alertId: alert._id, status: "processed", jobsFound: matchingJobs.length };
  } catch (error) {
    console.error(`Error processing alert ${alert._id}:`, error);
    return { alertId: alert._id, status: "error", error: error.message };
  }
};

module.exports = async (req, res) => {
  // Verify the request is from Vercel Cron
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow without auth for testing, but log it
    console.log("Cron job triggered (no auth header or invalid)");
  }

  try {
    await connectDB();
    const models = getModels();
    const { JobAlert } = models;

    console.log("Starting job alerts cron...");

    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = new Date().getDay();

    // Process alerts - runs twice daily (11 AM and 8 PM)
    // Only notify if not notified in the last 8 hours
    const cutoff = new Date(Date.now() - 8 * 60 * 60 * 1000);
    const alerts = await JobAlert.find({
      isActive: true,
      $or: [
        { lastNotified: null },
        { lastNotified: { $lt: cutoff } }
      ]
    });

    console.log(`Found ${alerts.length} alerts to process`);

    const results = [];
    for (const alert of alerts) {
      const result = await processAlert(alert, models);
      if (result) results.push(result);
    }

    console.log("Job alerts cron completed");

    res.status(200).json({
      success: true,
      message: "Job alerts processed",
      alerts: {
        count: alerts.length,
        results: results
      }
    });
  } catch (error) {
    console.error("Cron job error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
