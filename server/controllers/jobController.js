const Job = require("../models/job");
const connectDB = require("../config/db");
const h1bSponsors = require("../data/h1bSponsors");
const { fetchAllJobs, getCacheStats, clearCache } = require("../services/jobAggregator");

// Cache for JoinRise API (kept for backwards compatibility)
let jobCache = {
  joinrise: { jobs: [], lastFetch: 0 }
};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Helper function to check if a company sponsors H1B visas
const checkVisaSponsorship = (companyName) => {
  if (!companyName) return { sponsors: false, sponsorData: null };

  const companyLower = companyName.toLowerCase().trim();

  // Check against H1B sponsors database
  const sponsor = h1bSponsors.find(s => {
    const sponsorLower = s.name.toLowerCase();
    // Check various matching patterns
    return sponsorLower.includes(companyLower) ||
           companyLower.includes(sponsorLower) ||
           sponsorLower.split(' ')[0] === companyLower.split(' ')[0] ||
           // Handle common company name variations
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

// Fetch jobs from JoinRise API (free, no auth required)
const fetchJoinRiseJobs = async () => {
  const now = Date.now();

  // Return cached jobs if still valid
  if (jobCache.joinrise.jobs.length > 0 && (now - jobCache.joinrise.lastFetch) < CACHE_DURATION) {
    return jobCache.joinrise.jobs;
  }

  try {
    const response = await fetch('https://api.joinrise.io/api/v1/jobs/public?limit=50&sort=desc&sortedBy=createdAt', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'JobLeap/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`JoinRise API request failed: ${response.status}`);
    }

    const data = await response.json();
    const jobsArray = data.result?.jobs || data.data || data.jobs || data || [];

    const jobs = (Array.isArray(jobsArray) ? jobsArray : []).map(job => {
      // Extract company name from owner object or direct field
      const companyName = job.owner?.companyName || job.company || job.companyName || 'Unknown Company';

      // Extract salary from descriptionBreakdown if available
      let salary = '';
      if (job.descriptionBreakdown?.salaryRangeMinYearly && job.descriptionBreakdown?.salaryRangeMaxYearly) {
        salary = `$${job.descriptionBreakdown.salaryRangeMinYearly.toLocaleString()} - $${job.descriptionBreakdown.salaryRangeMaxYearly.toLocaleString()}`;
      } else if (job.salary) {
        salary = job.salary;
      }

      return {
        _id: `joinrise_${job._id || job.id || Math.random().toString(36).substr(2, 9)}`,
        title: job.title || job.jobTitle || 'Untitled Position',
        company: companyName,
        location: job.locationAddress || job.location || 'Remote',
        salary: salary,
        jobType: job.type || job.jobType || job.descriptionBreakdown?.employmentType || 'Full-time',
        description: job.description || job.jobDescription || '',
        tags: job.skills_suggest || job.descriptionBreakdown?.keywords || job.skills || job.tags || [],
        logo: job.owner?.photo || job.logo || '',
        url: job.url || job.applyUrl || '',
        postedAt: job.createdAt ? new Date(job.createdAt) : new Date(),
        source: 'joinrise'
      };
    });

    // Update cache
    jobCache.joinrise = { jobs, lastFetch: now };
    console.log(`Fetched ${jobs.length} jobs from JoinRise`);
    return jobs;
  } catch (error) {
    console.error('Error fetching from JoinRise:', error.message);
    return jobCache.joinrise.jobs;
  }
};

// Fetch jobs from Adzuna API (requires API key)
const fetchAdzunaJobs = async (searchQuery = '') => {
  const now = Date.now();
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  // Skip if no API credentials
  if (!appId || !appKey) {
    console.log('Adzuna API credentials not configured, skipping...');
    return [];
  }

  // Return cached jobs if still valid
  if (jobCache.adzuna.jobs.length > 0 && (now - jobCache.adzuna.lastFetch) < CACHE_DURATION) {
    return jobCache.adzuna.jobs;
  }

  try {
    // Search in US market, can be changed to other countries (gb, de, etc.)
    const country = 'us';
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=50&content-type=application/json`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'JobLeap/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Adzuna API request failed: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results || [];

    const jobs = results.map(job => ({
      _id: `adzuna_${job.id}`,
      title: job.title || 'Untitled Position',
      company: job.company?.display_name || 'Unknown Company',
      location: job.location?.display_name || job.location?.area?.[0] || 'Remote',
      salary: job.salary_min && job.salary_max
        ? `$${Math.round(job.salary_min).toLocaleString()} - $${Math.round(job.salary_max).toLocaleString()}`
        : job.salary_is_predicted === 1
          ? `~$${Math.round(job.salary_min || job.salary_max || 0).toLocaleString()} (estimated)`
          : '',
      jobType: job.contract_type || job.contract_time || 'Full-time',
      description: job.description || '',
      tags: job.category?.tag ? [job.category.label] : [],
      logo: '',
      url: job.redirect_url || '',
      postedAt: job.created ? new Date(job.created) : new Date(),
      source: 'adzuna'
    }));

    // Update cache
    jobCache.adzuna = { jobs, lastFetch: now };
    console.log(`Fetched ${jobs.length} jobs from Adzuna`);
    return jobs;
  } catch (error) {
    console.error('Error fetching from Adzuna:', error.message);
    return jobCache.adzuna.jobs;
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();

    const jobData = {
      ...req.body,
      postedBy: req.user.id,
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

// Get all jobs with optional filtering by title and location
exports.getJobs = async (req, res) => {
  try {
    // Ensure DB is connected (important for serverless)
    await connectDB();

    const { title, location, source, visaSponsorship, jobType, page = 1, limit = 50 } = req.query;

    // Fetch from all sources in parallel
    const [dbJobs, aggregatedJobs, joinriseJobs] = await Promise.all([
      // Database jobs (user-posted)
      (async () => {
        const filter = {};
        if (title) {
          filter.title = { $regex: title, $options: "i" };
        }
        if (location) {
          filter.location = { $regex: location, $options: "i" };
        }
        const jobs = await Job.find(filter).sort({ postedAt: -1 });
        return jobs.map(job => ({ ...job.toObject(), source: 'local' }));
      })(),
      // Aggregated jobs from GitHub repos & APIs
      fetchAllJobs(),
      // JoinRise jobs (keeping for variety)
      fetchJoinRiseJobs()
    ]);

    // Filter external jobs based on search criteria
    const filterExternalJobs = (jobs) => {
      let filtered = jobs;

      if (title) {
        const titleLower = title.toLowerCase();
        filtered = filtered.filter(job =>
          job.title?.toLowerCase().includes(titleLower) ||
          job.company?.toLowerCase().includes(titleLower) ||
          (job.tags && job.tags.some(tag => tag?.toLowerCase().includes(titleLower)))
        );
      }

      if (location) {
        const locationLower = location.toLowerCase();
        filtered = filtered.filter(job =>
          job.location?.toLowerCase().includes(locationLower)
        );
      }

      if (jobType) {
        const typeLower = jobType.toLowerCase();
        filtered = filtered.filter(job =>
          job.jobType?.toLowerCase().includes(typeLower)
        );
      }

      return filtered;
    };

    const filteredAggregated = filterExternalJobs(aggregatedJobs);
    const filteredJoinrise = filterExternalJobs(joinriseJobs);

    // Combine all jobs
    let allJobs = [...dbJobs, ...filteredAggregated, ...filteredJoinrise];

    // Filter by source if specified
    if (source === 'local') {
      allJobs = dbJobs;
    } else if (source === 'github') {
      allJobs = filteredAggregated.filter(j =>
        j.source?.includes('simplify') || j.source?.includes('speedyapply')
      );
    } else if (source === 'remoteok') {
      allJobs = filteredAggregated.filter(j => j.source === 'remoteok');
    } else if (source === 'joinrise') {
      allJobs = filteredJoinrise;
    }

    // Remove duplicates by _id (in case of overlap between sources)
    const seenIds = new Set();
    allJobs = allJobs.filter(job => {
      const id = job._id?.toString();
      if (seenIds.has(id)) return false;
      seenIds.add(id);
      return true;
    });

    // Add visa sponsorship data to all jobs
    allJobs = allJobs.map(job => {
      const visaInfo = checkVisaSponsorship(job.company);

      // Also check if job has sponsorship info from source
      let sponsorsVisa = visaInfo.sponsors;
      if (job.sponsorship === 'Offers Sponsorship') {
        sponsorsVisa = true;
      } else if (job.sponsorship === 'U.S. Citizenship Required' || job.sponsorship === 'Does Not Offer Sponsorship') {
        sponsorsVisa = false;
      }

      return {
        ...job,
        sponsorsVisa,
        sponsorData: visaInfo.sponsorData
      };
    });

    // Filter by visa sponsorship if specified
    if (visaSponsorship === 'sponsors') {
      allJobs = allJobs.filter(job => job.sponsorsVisa === true);
    }

    // Sort by posted date (newest first)
    allJobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedJobs = allJobs.slice(startIndex, endIndex);

    res.status(200).json({
      jobs: paginatedJobs,
      totalJobs: allJobs.length,
      currentPage: parseInt(page),
      totalPages: Math.ceil(allJobs.length / parseInt(limit)),
      sources: getCacheStats()
    });
  } catch (err) {
    console.error("Error fetching jobs:", err.message, err.stack);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Get remote jobs only (from external APIs)
exports.getRemoteJobs = async (req, res) => {
  try {
    const [joinriseJobs, adzunaJobs] = await Promise.all([
      fetchJoinRiseJobs(),
      fetchAdzunaJobs()
    ]);
    const allJobs = [...joinriseJobs, ...adzunaJobs];
    allJobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    res.status(200).json(allJobs);
  } catch (err) {
    console.error("Error fetching remote jobs:", err);
    res.status(500).json({ error: "Failed to fetch remote jobs" });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
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

    res.status(200).json({
      success: true,
      job: { ...job.toObject(), source: 'local' }
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
      jobs: jobs.map(job => ({ ...job.toObject(), source: 'local' }))
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
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this job"
      });
    }

    // Update the job
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
    if (job.postedBy.toString() !== req.user.id) {
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

// Get job aggregation stats
exports.getJobStats = async (req, res) => {
  try {
    const stats = getCacheStats();
    res.status(200).json({
      success: true,
      stats
    });
  } catch (err) {
    console.error("Error getting job stats:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get job stats"
    });
  }
};

// Refresh job cache (force fetch from all sources)
exports.refreshJobCache = async (req, res) => {
  try {
    clearCache();
    const jobs = await fetchAllJobs(true);
    const stats = getCacheStats();

    res.status(200).json({
      success: true,
      message: `Successfully refreshed cache with ${jobs.length} jobs`,
      stats
    });
  } catch (err) {
    console.error("Error refreshing job cache:", err);
    res.status(500).json({
      success: false,
      message: "Failed to refresh job cache"
    });
  }
};
