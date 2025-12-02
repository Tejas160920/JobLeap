const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // For local jobs
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    sparse: true
  },
  // For external jobs (RemoteOK, etc.)
  externalJobId: {
    type: String,
    sparse: true
  },
  externalJobData: {
    title: String,
    company: String,
    location: String,
    salary: String,
    jobType: String,
    description: String,
    url: String,
    logo: String,
    postedAt: Date,
    source: String
  },
  notes: {
    type: String,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound indexes to prevent duplicates
bookmarkSchema.index({ user: 1, job: 1 }, { unique: true, sparse: true });
bookmarkSchema.index({ user: 1, externalJobId: 1 }, { unique: true, sparse: true });
bookmarkSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
