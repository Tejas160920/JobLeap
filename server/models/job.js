const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  // Unique identifier for deduplication (source_externalId)
  externalId: {
    type: String,
    unique: true,
    sparse: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  location: {
    type: String,
    trim: true,
    maxlength: 200
  },
  salary: {
    type: String,
    trim: true,
    maxlength: 100
  },
  jobType: {
    type: String,
    default: 'Full-time'
  },
  description: {
    type: String,
    maxlength: 50000
  },
  requirements: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  applicationUrl: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  applicationEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft', 'expired'],
    default: 'active'
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive', 'Internship', ''],
  },
  skills: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  logo: {
    type: String,
    trim: true
  },
  // Source tracking for aggregated jobs
  source: {
    type: String,
    enum: ['local', 'simplify', 'speedyapply', 'remoteok', 'adzuna', 'joinrise', 'github', 'other'],
    default: 'local'
  },
  // Visa sponsorship info
  sponsorship: {
    type: String
  },
  sponsorsVisa: {
    type: Boolean,
    default: null
  },
  sponsorData: {
    name: String,
    totalLCAs: Number,
    approvalRate: String,
    avgSalary: Number
  },
  viewCount: {
    type: Number,
    default: 0
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  lastSeenAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for fast querying
jobSchema.index({ title: 'text', company: 'text', description: 'text' });
jobSchema.index({ status: 1, postedAt: -1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ source: 1 });
jobSchema.index({ sponsorsVisa: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ lastSeenAt: 1 });
// Compound indexes for common queries
jobSchema.index({ status: 1, source: 1, postedAt: -1 });
jobSchema.index({ status: 1, sponsorsVisa: 1, postedAt: -1 });

module.exports = mongoose.model("Job", jobSchema);
