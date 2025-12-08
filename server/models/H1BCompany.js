const mongoose = require('mongoose');

const h1bCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // LCA Statistics
  totalLCAs: {
    type: Number,
    default: 0
  },
  approvedLCAs: {
    type: Number,
    default: 0
  },
  deniedLCAs: {
    type: Number,
    default: 0
  },
  approvalRate: {
    type: Number,
    default: 0
  },
  // Salary Information
  avgSalary: {
    type: Number,
    default: 0
  },
  minSalary: {
    type: Number,
    default: 0
  },
  maxSalary: {
    type: Number,
    default: 0
  },
  medianSalary: {
    type: Number,
    default: 0
  },
  // Company Details
  industry: {
    type: String,
    default: 'Technology'
  },
  headquarters: {
    city: String,
    state: String
  },
  // Top Job Titles
  topJobTitles: [{
    title: String,
    count: Number,
    avgSalary: Number
  }],
  // Top Locations
  topLocations: [{
    city: String,
    state: String,
    count: Number,
    avgSalary: Number
  }],
  // Yearly Trend
  yearlyData: [{
    year: Number,
    totalLCAs: Number,
    approvedLCAs: Number,
    avgSalary: Number
  }],
  // Metadata
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  dataSource: {
    type: String,
    default: 'DOL OFLC'
  },
  fiscalYear: {
    type: String,
    default: 'FY2025'
  }
}, {
  timestamps: true
});

// Text search index
h1bCompanySchema.index({ name: 'text' });

// Compound indexes for efficient queries
h1bCompanySchema.index({ totalLCAs: -1 });
h1bCompanySchema.index({ avgSalary: -1 });
h1bCompanySchema.index({ approvalRate: -1 });
h1bCompanySchema.index({ 'headquarters.state': 1 });
h1bCompanySchema.index({ industry: 1 });

module.exports = mongoose.model('H1BCompany', h1bCompanySchema);
