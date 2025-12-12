const Job = require("../models/job");
const connectDB = require("../config/db");
const h1bSponsors = require("../data/h1bSponsors");

// US State abbreviations mapping
const stateAbbreviations = {
  'alabama': 'al', 'alaska': 'ak', 'arizona': 'az', 'arkansas': 'ar',
  'california': 'ca', 'colorado': 'co', 'connecticut': 'ct', 'delaware': 'de',
  'florida': 'fl', 'georgia': 'ga', 'hawaii': 'hi', 'idaho': 'id',
  'illinois': 'il', 'indiana': 'in', 'iowa': 'ia', 'kansas': 'ks',
  'kentucky': 'ky', 'louisiana': 'la', 'maine': 'me', 'maryland': 'md',
  'massachusetts': 'ma', 'michigan': 'mi', 'minnesota': 'mn', 'mississippi': 'ms',
  'missouri': 'mo', 'montana': 'mt', 'nebraska': 'ne', 'nevada': 'nv',
  'new hampshire': 'nh', 'new jersey': 'nj', 'new mexico': 'nm', 'new york': 'ny',
  'north carolina': 'nc', 'north dakota': 'nd', 'ohio': 'oh', 'oklahoma': 'ok',
  'oregon': 'or', 'pennsylvania': 'pa', 'rhode island': 'ri', 'south carolina': 'sc',
  'south dakota': 'sd', 'tennessee': 'tn', 'texas': 'tx', 'utah': 'ut',
  'vermont': 'vt', 'virginia': 'va', 'washington': 'wa', 'west virginia': 'wv',
  'wisconsin': 'wi', 'wyoming': 'wy', 'district of columbia': 'dc'
};

// Reverse mapping (abbreviation to full name)
const stateFullNames = Object.fromEntries(
  Object.entries(stateAbbreviations).map(([name, abbr]) => [abbr, name])
);

// Helper function to get location regex patterns
const getLocationRegex = (location) => {
  const locationLower = location.toLowerCase().trim();
  const patterns = [locationLower];

  // Add state abbreviation/full name
  if (stateFullNames[locationLower]) {
    patterns.push(stateFullNames[locationLower]);
  }
  if (stateAbbreviations[locationLower]) {
    patterns.push(stateAbbreviations[locationLower]);
  }

  // Common variations
  if (locationLower === 'remote') {
    patterns.push('work from home', 'wfh', 'anywhere', 'remote');
  }
  if (locationLower === 'nyc' || locationLower === 'new york') {
    patterns.push('nyc', 'new york', 'ny');
  }
  if (locationLower === 'sf' || locationLower === 'san francisco') {
    patterns.push('sf', 'san francisco', 'bay area');
  }

  return patterns.join('|');
};

// Helper function to check if a company sponsors H1B visas
const checkVisaSponsorship = (companyName) => {
  if (!companyName) return { sponsors: false, sponsorData: null };

  const companyLower = companyName.toLowerCase().trim();

  const sponsor = h1bSponsors.find(s => {
    const sponsorLower = s.name.toLowerCase();
    return sponsorLower.includes(companyLower) ||
           companyLower.includes(sponsorLower) ||
           sponsorLower.split(' ')[0] === companyLower.split(' ')[0] ||
           companyLower.includes(sponsorLower.replace(/,?\s*(inc|llc|corp|ltd|co)\.?$/i, '').trim()) ||
           sponsorLower.includes(companyLower.replace(/,?\s*(inc|llc|corp|ltd|co)\.?$/i, '').trim());
  });

  if (sponsor) {
    return {
      sponsors: true,
      sponsorData: {
        name: sponsor.name,
        totalLCAs: sponsor.totalLCAs,
        approvalRate: sponsor.approvalRate,
        avgSalary: sponsor.avgSalary
      }
    };
  }

  return { sponsors: false, sponsorData: null };
};

// Create a new job (user-posted)
exports.createJob = async (req, res) => {
  try {
    await connectDB();

    const jobData = {
      ...req.body,
      postedBy: req.user.id,
      source: 'local',
      status: 'active'
    };

    const job = new Job(jobData);
    await job.save();

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job
    });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Get all jobs with optional filtering (FAST - queries MongoDB)
exports.getJobs = async (req, res) => {
  try {
    await connectDB();

    const { title, location, source, visaSponsorship, jobType, page = 1, limit = 20 } = req.query;

    // Build MongoDB query
    const query = { status: 'active' };

    // Title search (searches title, company, and tags)
    if (title) {
      const titleRegex = { $regex: title, $options: 'i' };
      query.$or = [
        { title: titleRegex },
        { company: titleRegex },
        { tags: titleRegex },
        { description: titleRegex }
      ];
    }

    // Location filter
    if (location) {
      const locationPattern = getLocationRegex(location);
      query.location = { $regex: locationPattern, $options: 'i' };
    }

    // Source filter
    if (source && source !== 'all') {
      if (source === 'github') {
        query.source = { $in: ['simplify', 'speedyapply'] };
      } else {
        query.source = source;
      }
    }

    // Job type filter
    if (jobType) {
      query.jobType = { $regex: jobType, $options: 'i' };
    }

    // Visa sponsorship filter
    if (visaSponsorship === 'sponsors') {
      query.sponsorsVisa = true;
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    // Simple and fast: exclude remoteok first, then add remoteok at end if needed
    const githubQuery = { ...query, source: { $in: ['simplify', 'speedyapply', 'local'] } };
    const remoteokQuery = { ...query, source: 'remoteok' };

    // Get GitHub/quality jobs first
    const githubJobs = await Job.find(githubQuery)
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    let jobs = githubJobs;

    // If we don't have enough GitHub jobs, fill with RemoteOK
    if (githubJobs.length < limitNum) {
      const remaining = limitNum - githubJobs.length;
      const remoteokSkip = Math.max(0, skip - await Job.countDocuments(githubQuery));
      const remoteokJobs = await Job.find(remoteokQuery)
        .sort({ postedAt: -1 })
        .skip(remoteokSkip)
        .limit(remaining)
        .lean();
      jobs = [...githubJobs, ...remoteokJobs];
    }

    // Get total count
    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      jobs,
      totalJobs,
      page: pageNum,
      totalPages: Math.ceil(totalJobs / limitNum),
      hasMore: skip + jobs.length < totalJobs
    });
  } catch (err) {
    console.error("Error fetching jobs:", err.message, err.stack);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;

    // Try to find by MongoDB _id or externalId
    let job = await Job.findById(id).catch(() => null);
    if (!job) {
      job = await Job.findOne({ externalId: id });
    }

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Get jobs posted by the current user
exports.getMyJobs = async (req, res) => {
  try {
    await connectDB();

    const jobs = await Job.find({ postedBy: req.user.id }).sort({ postedAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (err) {
    console.error("Error fetching user jobs:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user is the owner of the job
    if (job.postedBy?.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this job"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob
    });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    await connectDB();

    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Check if user is the owner of the job
    if (job.postedBy?.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job"
      });
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
};

// Get job stats
exports.getJobStats = async (req, res) => {
  try {
    await connectDB();

    const [totalJobs, bySource, recentCount] = await Promise.all([
      Job.countDocuments({ status: 'active' }),
      Job.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: '$source', count: { $sum: 1 } } }
      ]),
      Job.countDocuments({
        status: 'active',
        postedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      })
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        recentJobs24h: recentCount,
        bySource: bySource.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {})
      }
    });
  } catch (err) {
    console.error("Error getting job stats:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get job stats"
    });
  }
};

// Refresh job cache (triggers the cron manually)
exports.refreshJobCache = async (req, res) => {
  try {
    // Just redirect to the cron endpoint
    res.status(200).json({
      success: true,
      message: "Use /api/cron/refresh-jobs to refresh job database"
    });
  } catch (err) {
    console.error("Error refreshing job cache:", err);
    res.status(500).json({
      success: false,
      message: "Failed to refresh job cache"
    });
  }
};
