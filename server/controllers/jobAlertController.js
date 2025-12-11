const JobAlert = require("../models/JobAlert");

// Get user's job alerts
const getJobAlerts = async (req, res) => {
  try {
    const userId = req.user.id;

    const alerts = await JobAlert.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      alerts
    });
  } catch (error) {
    console.error("Error fetching job alerts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job alerts"
    });
  }
};

// Create a new job alert
const createJobAlert = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, filters, frequency } = req.body;

    // Check if user can create more alerts
    const canCreate = await JobAlert.canCreateAlert(userId);
    if (!canCreate) {
      return res.status(400).json({
        success: false,
        message: "Maximum number of job alerts reached (10). Please delete an existing alert first."
      });
    }

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Alert name is required"
      });
    }

    // Create the alert
    const alert = new JobAlert({
      user: userId,
      name: name.trim(),
      filters: {
        title: filters?.title || "",
        location: filters?.location || "",
        jobType: filters?.jobType || "",
        visaSponsorship: filters?.visaSponsorship || ""
      },
      frequency: frequency || "daily"
    });

    await alert.save();

    res.status(201).json({
      success: true,
      alert,
      message: "Job alert created successfully"
    });
  } catch (error) {
    console.error("Error creating job alert:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job alert"
    });
  }
};

// Update a job alert
const updateJobAlert = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, filters, frequency } = req.body;

    const alert = await JobAlert.findOne({ _id: id, user: userId });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Job alert not found"
      });
    }

    // Update fields if provided
    if (name) alert.name = name.trim();
    if (filters) {
      alert.filters = {
        title: filters.title ?? alert.filters.title,
        location: filters.location ?? alert.filters.location,
        jobType: filters.jobType ?? alert.filters.jobType,
        visaSponsorship: filters.visaSponsorship ?? alert.filters.visaSponsorship
      };
    }
    if (frequency) alert.frequency = frequency;

    await alert.save();

    res.json({
      success: true,
      alert,
      message: "Job alert updated successfully"
    });
  } catch (error) {
    console.error("Error updating job alert:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update job alert"
    });
  }
};

// Delete a job alert
const deleteJobAlert = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await JobAlert.findOneAndDelete({ _id: id, user: userId });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Job alert not found"
      });
    }

    res.json({
      success: true,
      message: "Job alert deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting job alert:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job alert"
    });
  }
};

// Toggle job alert active status
const toggleJobAlert = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const alert = await JobAlert.findOne({ _id: id, user: userId });

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Job alert not found"
      });
    }

    alert.isActive = !alert.isActive;
    await alert.save();

    res.json({
      success: true,
      alert,
      message: `Job alert ${alert.isActive ? 'activated' : 'paused'}`
    });
  } catch (error) {
    console.error("Error toggling job alert:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle job alert"
    });
  }
};

module.exports = {
  getJobAlerts,
  createJobAlert,
  updateJobAlert,
  deleteJobAlert,
  toggleJobAlert
};
