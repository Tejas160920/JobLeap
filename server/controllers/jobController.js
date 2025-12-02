const Job = require("../models/job");

// Cache for RemoteOK jobs (refresh every 30 minutes)
let remoteOKCache = {
  jobs: [],
  lastFetch: 0
};
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Fetch jobs from RemoteOK API
const fetchRemoteOKJobs = async () => {
  const now = Date.now();

  // Return cached jobs if still valid
  if (remoteOKCache.jobs.length > 0 && (now - remoteOKCache.lastFetch) < CACHE_DURATION) {
    return remoteOKCache.jobs;
  }

  try {
    const response = await fetch('https://remoteok.com/api', {
      headers: {
        'User-Agent': 'JobLeap/1.0'
      }
    });

    if (!response.ok) {
      throw new Error('RemoteOK API request failed');
    }

    const data = await response.json();

    // RemoteOK returns first item as metadata, skip it
    const jobs = data.slice(1).map(job => ({
      _id: `remoteok_${job.id}`,
      title: job.position || 'Untitled Position',
      company: job.company || 'Unknown Company',
      location: job.location || 'Remote',
      salary: job.salary || '',
      jobType: 'Remote',
      description: job.description || '',
      tags: job.tags || [],
      logo: job.company_logo || '',
      url: job.url || '',
      postedAt: job.date ? new Date(job.date) : new Date(),
      source: 'remoteok'
    }));

    // Update cache
    remoteOKCache = {
      jobs,
      lastFetch: now
    };

    console.log(`Fetched ${jobs.length} jobs from RemoteOK`);
    return jobs;
  } catch (error) {
    console.error('Error fetching from RemoteOK:', error.message);
    // Return cached jobs even if expired, or empty array
    return remoteOKCache.jobs;
  }
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
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
    const { title, location, source } = req.query;

    // Fetch from both sources in parallel
    const [dbJobs, remoteOKJobs] = await Promise.all([
      // Database jobs
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
      // RemoteOK jobs
      fetchRemoteOKJobs()
    ]);

    // Filter RemoteOK jobs based on search criteria
    let filteredRemoteJobs = remoteOKJobs;

    if (title) {
      const titleLower = title.toLowerCase();
      filteredRemoteJobs = filteredRemoteJobs.filter(job =>
        job.title.toLowerCase().includes(titleLower) ||
        job.company.toLowerCase().includes(titleLower) ||
        (job.tags && job.tags.some(tag => tag.toLowerCase().includes(titleLower)))
      );
    }

    if (location) {
      const locationLower = location.toLowerCase();
      filteredRemoteJobs = filteredRemoteJobs.filter(job =>
        job.location.toLowerCase().includes(locationLower)
      );
    }

    // Combine and sort by date
    let allJobs = [...dbJobs, ...filteredRemoteJobs];

    // Filter by source if specified
    if (source === 'local') {
      allJobs = dbJobs;
    } else if (source === 'remoteok') {
      allJobs = filteredRemoteJobs;
    }

    // Sort by posted date (newest first)
    allJobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    res.status(200).json(allJobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Get remote jobs only (from RemoteOK)
exports.getRemoteJobs = async (req, res) => {
  try {
    const jobs = await fetchRemoteOKJobs();
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching remote jobs:", err);
    res.status(500).json({ error: "Failed to fetch remote jobs" });
  }
};
