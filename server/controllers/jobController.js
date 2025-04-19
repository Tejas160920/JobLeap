const Job = require("../models/job");

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: "Failed to create job" });
  }
};

// Get all jobs with optional filtering by title and location
exports.getJobs = async (req, res) => {
  try {
    const { title, location } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // partial + case-insensitive
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(filter).sort({ postedAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};
