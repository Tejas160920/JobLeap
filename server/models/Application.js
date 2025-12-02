const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: function() {
      // Job is required only if it's not an external job
      return !this.externalJobId;
    }
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
    url: String,
    logo: String,
    postedAt: Date,
    source: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interview', 'offered', 'rejected', 'withdrawn', 'accepted'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    maxlength: 5000
  },
  resumeUrl: {
    type: String
  },
  notes: {
    type: String,
    maxlength: 2000
  },
  // Employer notes (only visible to hiring user)
  employerNotes: {
    type: String,
    maxlength: 2000
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Track status history
  statusHistory: [{
    status: String,
    changedAt: {
      type: Date,
      default: Date.now
    },
    note: String
  }]
}, {
  timestamps: true
});

// Indexes for performance and preventing duplicates
// Note: Removed unique sparse indexes as they can cause issues with null values
applicationSchema.index({ job: 1, applicant: 1 });
applicationSchema.index({ externalJobId: 1, applicant: 1 });
applicationSchema.index({ applicant: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });

// Pre-save middleware to update statusHistory
applicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date()
    });
  }
  next();
});

module.exports = mongoose.model("Application", applicationSchema);
