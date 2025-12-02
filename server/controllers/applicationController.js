const Application = require("../models/Application");
const Job = require("../models/job");
const connectDB = require("../config/db");

// Get user's applications
exports.getMyApplications = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company location salary jobType')
      .sort({ appliedAt: -1 });

    // Format applications to include both local and external job data
    const formattedApplications = applications.map(app => {
      if (app.job) {
        return {
          _id: app._id,
          jobId: app.job._id,
          jobTitle: app.job.title,
          company: app.job.company,
          location: app.job.location,
          salary: app.job.salary,
          jobType: app.job.jobType,
          status: app.status,
          appliedAt: app.appliedAt,
          isExternal: false
        };
      } else if (app.externalJobData) {
        return {
          _id: app._id,
          jobId: app.externalJobId,
          jobTitle: app.externalJobData.title,
          company: app.externalJobData.company,
          location: app.externalJobData.location,
          salary: app.externalJobData.salary || '',
          jobType: 'Remote',
          url: app.externalJobData.url,
          status: app.status,
          appliedAt: app.appliedAt,
          isExternal: true
        };
      }
      return null;
    }).filter(Boolean);

    res.status(200).json({
      success: true,
      applications: formattedApplications
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications"
    });
  }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();

    const { jobId, externalJobId, externalJobData, coverLetter } = req.body;

    // Check if already applied
    let existingApplication;
    if (jobId) {
      existingApplication = await Application.findOne({
        job: jobId,
        applicant: req.user.id
      });
    } else if (externalJobId) {
      existingApplication = await Application.findOne({
        externalJobId,
        applicant: req.user.id
      });
    }

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job"
      });
    }

    // Create application
    const applicationData = {
      applicant: req.user.id,
      coverLetter,
      status: 'pending'
    };

    if (jobId) {
      applicationData.job = jobId;
    } else if (externalJobId) {
      applicationData.externalJobId = externalJobId;
      applicationData.externalJobData = externalJobData;
    }

    const application = new Application(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });
  } catch (err) {
    console.error("Error applying for job:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit application"
    });
  }
};

// Withdraw application
exports.withdrawApplication = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();

    const { applicationId } = req.params;

    const application = await Application.findOne({
      _id: applicationId,
      applicant: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    if (application.status === 'withdrawn') {
      return res.status(400).json({
        success: false,
        message: "Application already withdrawn"
      });
    }

    if (['accepted', 'rejected'].includes(application.status)) {
      return res.status(400).json({
        success: false,
        message: "Cannot withdraw a finalized application"
      });
    }

    application.status = 'withdrawn';
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully"
    });
  } catch (err) {
    console.error("Error withdrawing application:", err);
    res.status(500).json({
      success: false,
      message: "Failed to withdraw application"
    });
  }
};

// Get single application details
exports.getApplicationDetails = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();

    const { applicationId } = req.params;

    const application = await Application.findOne({
      _id: applicationId,
      applicant: req.user.id
    }).populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (err) {
    console.error("Error fetching application details:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application details"
    });
  }
};
