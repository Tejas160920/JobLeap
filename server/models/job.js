const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  salary: {
    type: String,
    trim: true,
    maxlength: 50
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship', 'Freelance'],
    default: 'Full-time'
  },
  description: {
    type: String,
    maxlength: 10000
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
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'],
  },
  skills: [{
    type: String,
    trim: true
  }],
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
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for search performance
jobSchema.index({ title: 'text', company: 'text', description: 'text' });
jobSchema.index({ status: 1, postedAt: -1 });
jobSchema.index({ postedBy: 1 });

module.exports = mongoose.model("Job", jobSchema);
