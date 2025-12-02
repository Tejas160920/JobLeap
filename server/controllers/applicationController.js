const Application = require("../models/Application");
const Job = require("../models/job");
const connectDB = require("../config/db");

// Get user's applications
exports.getMyApplications = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();

    console.log('Fetching applications for user:', req.user.id);

    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company location salary jobType')
      .sort({ appliedAt: -1 });

    console.log('Found applications:', applications.length);
    console.log('Raw applications:', JSON.stringify(applications.map(a => ({
      _id: a._id,
      hasJob: !!a.job,
      externalJobId: a.externalJobId,
      hasExternalData: !!a.externalJobData
    }))));

    // Format applications to include both local and external job data
    const formattedApplications = applications.map(app => {
      // For local jobs with populated job data
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
      }
      // For external jobs (RemoteOK, etc.)
      if (app.externalJobId) {
        return {
          _id: app._id,
          jobId: app.externalJobId,
          jobTitle: app.externalJobData?.title || 'Unknown Job',
          company: app.externalJobData?.company || 'Unknown Company',
          location: app.externalJobData?.location || 'Remote',
          salary: app.externalJobData?.salary || '',
          jobType: app.externalJobData?.jobType || 'Remote',
          url: app.externalJobData?.url,
          status: app.status,
          appliedAt: app.appliedAt,
          isExternal: true
        };
      }
      // Fallback for any other cases
      console.log('Application without job or externalJobId:', app._id);
      return null;
    }).filter(Boolean);

    console.log('Formatted applications:', formattedApplications.length);

    res.status(200).json({
      success: true,
      applications: formattedApplications
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: err.message
    });
  }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();

    const { jobId, externalJobId, externalJobData, coverLetter } = req.body;

    console.log('Apply request body:', { jobId, externalJobId, hasExternalData: !!externalJobData });
    console.log('User ID:', req.user?.id);

    // Validate that we have either jobId or externalJobId
    if (!jobId && !externalJobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID or External Job ID is required"
      });
    }

    // Check if already applied
    let existingApplication;
    if (jobId) {
      existingApplication = await Application.findOne({
        job: jobId,
        applicant: req.user.id
      });
      console.log('Checking for existing application with jobId:', jobId, 'Found:', !!existingApplication);
    } else if (externalJobId) {
      existingApplication = await Application.findOne({
        externalJobId: externalJobId,
        applicant: req.user.id
      });
      console.log('Checking for existing application with externalJobId:', externalJobId, 'Found:', !!existingApplication);
      if (existingApplication) {
        console.log('Existing application ID:', existingApplication._id);
      }
    }

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
        applicationId: existingApplication._id
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

    console.log('Creating application with data:', applicationData);

    const application = new Application(applicationData);
    await application.save();

    console.log('Application saved successfully:', application._id);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });
  } catch (err) {
    console.error("Error applying for job:", err.message, err.stack);

    // Check for duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit application",
      error: err.message,
      details: err.errors ? Object.keys(err.errors).map(k => err.errors[k].message) : undefined
    });
  }
};

// Helper to drop old indexes (run once)
exports.fixIndexes = async (req, res) => {
  try {
    await connectDB();
    const Application = require("../models/Application");

    const droppedIndexes = [];
    const errors = [];

    // Get current indexes
    const currentIndexes = await Application.collection.indexes();

    // Try to drop ALL indexes except _id
    for (const idx of currentIndexes) {
      if (idx.name !== '_id_') {
        try {
          await Application.collection.dropIndex(idx.name);
          droppedIndexes.push(idx.name);
        } catch (e) {
          errors.push({ index: idx.name, error: e.message });
        }
      }
    }

    // Re-sync indexes (recreates them from schema)
    try {
      await Application.syncIndexes();
    } catch (e) {
      errors.push({ action: 'syncIndexes', error: e.message });
    }

    // Get new indexes
    const newIndexes = await Application.collection.indexes();

    res.json({
      success: true,
      message: "Indexes fixed",
      droppedIndexes,
      newIndexes: newIndexes.map(i => ({ name: i.name, key: i.key, unique: i.unique })),
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Debug endpoint to see raw applications
exports.debugApplications = async (req, res) => {
  try {
    await connectDB();

    // Get all applications (limited for safety)
    const applications = await Application.find({})
      .limit(50)
      .lean();

    // Also check indexes
    let indexes = [];
    try {
      indexes = await Application.collection.indexes();
    } catch (e) {
      indexes = [{ error: e.message }];
    }

    // Also format the applications like getMyApplications would
    const formattedApplications = applications.map(app => {
      if (app.job) {
        return {
          _id: app._id,
          jobId: app.job,
          jobTitle: 'Local Job (not populated)',
          company: 'N/A',
          status: app.status,
          appliedAt: app.appliedAt,
          isExternal: false,
          debug: 'has job'
        };
      }
      if (app.externalJobId) {
        return {
          _id: app._id,
          jobId: app.externalJobId,
          jobTitle: app.externalJobData?.title || 'Unknown Job',
          company: app.externalJobData?.company || 'Unknown Company',
          location: app.externalJobData?.location || 'Remote',
          salary: app.externalJobData?.salary || '',
          jobType: app.externalJobData?.jobType || 'Remote',
          url: app.externalJobData?.url,
          status: app.status,
          appliedAt: app.appliedAt,
          isExternal: true,
          debug: 'has externalJobId'
        };
      }
      return {
        _id: app._id,
        debug: 'no job or externalJobId',
        raw: app
      };
    });

    res.json({
      success: true,
      count: applications.length,
      indexes: indexes,
      rawApplications: applications.map(app => ({
        _id: app._id,
        applicant: app.applicant,
        job: app.job,
        externalJobId: app.externalJobId,
        hasExternalJobData: !!app.externalJobData,
        externalJobData: app.externalJobData,
        status: app.status,
        appliedAt: app.appliedAt
      })),
      formattedApplications
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Clear all applications for a user (debug endpoint)
exports.clearMyApplications = async (req, res) => {
  try {
    await connectDB();

    const result = await Application.deleteMany({ applicant: req.user.id });

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} applications`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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
