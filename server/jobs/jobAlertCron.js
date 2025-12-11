const cron = require("node-cron");
const JobAlert = require("../models/JobAlert");
const User = require("../models/User");
const Job = require("../models/Job");
const { createJobAlertNotification } = require("../services/notificationService");
const { sendJobAlertEmail } = require("../services/emailService");

// Build query from alert filters (similar to jobController)
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
const processAlert = async (alert) => {
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
      return;
    }

    console.log(`Found ${matchingJobs.length} jobs for alert "${alert.name}"`);

    // Create in-app notification
    await createJobAlertNotification(
      alert.user,
      alert.name,
      matchingJobs.length,
      `/?title=${encodeURIComponent(alert.filters.title || '')}&location=${encodeURIComponent(alert.filters.location || '')}`
    );

    // Send email if user has email notifications enabled
    const userSettings = user.settings || {};
    if (userSettings.emailNotifications !== false && userSettings.jobAlertEmails !== false) {
      await sendJobAlertEmail(user, matchingJobs, alert.name);
    }

    // Update alert
    alert.lastNotified = new Date();
    alert.matchCount = (alert.matchCount || 0) + matchingJobs.length;
    await alert.save();

    console.log(`Processed alert "${alert.name}" for user ${user.email}`);
  } catch (error) {
    console.error(`Error processing alert ${alert._id}:`, error);
  }
};

// Process all daily alerts
const processDailyAlerts = async () => {
  console.log("Starting daily job alerts processing...");

  try {
    // Get all active daily alerts that haven't been notified in the last 23 hours
    const cutoffTime = new Date(Date.now() - 23 * 60 * 60 * 1000);

    const alerts = await JobAlert.find({
      isActive: true,
      frequency: "daily",
      $or: [
        { lastNotified: null },
        { lastNotified: { $lt: cutoffTime } }
      ]
    });

    console.log(`Found ${alerts.length} daily alerts to process`);

    for (const alert of alerts) {
      await processAlert(alert);
    }

    console.log("Daily job alerts processing completed");
  } catch (error) {
    console.error("Error in daily alerts cron:", error);
  }
};

// Process weekly alerts
const processWeeklyAlerts = async () => {
  console.log("Starting weekly job alerts processing...");

  try {
    // Get all active weekly alerts that haven't been notified in the last 6.5 days
    const cutoffTime = new Date(Date.now() - 6.5 * 24 * 60 * 60 * 1000);

    const alerts = await JobAlert.find({
      isActive: true,
      frequency: "weekly",
      $or: [
        { lastNotified: null },
        { lastNotified: { $lt: cutoffTime } }
      ]
    });

    console.log(`Found ${alerts.length} weekly alerts to process`);

    for (const alert of alerts) {
      await processAlert(alert);
    }

    console.log("Weekly job alerts processing completed");
  } catch (error) {
    console.error("Error in weekly alerts cron:", error);
  }
};

// Initialize cron jobs
const initCronJobs = () => {
  // Skip cron on Vercel (serverless)
  if (process.env.VERCEL) {
    console.log("Skipping cron jobs on Vercel");
    return;
  }

  // Daily alerts: Run every day at 8 AM
  cron.schedule("0 8 * * *", processDailyAlerts, {
    timezone: "America/New_York"
  });

  // Weekly alerts: Run every Monday at 8 AM
  cron.schedule("0 8 * * 1", processWeeklyAlerts, {
    timezone: "America/New_York"
  });

  console.log("Cron jobs initialized - Daily alerts at 8 AM, Weekly alerts on Monday 8 AM (ET)");
};

// Export for manual triggering and testing
module.exports = {
  initCronJobs,
  processDailyAlerts,
  processWeeklyAlerts,
  processAlert
};
