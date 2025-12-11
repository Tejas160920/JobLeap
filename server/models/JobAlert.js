const mongoose = require("mongoose");

const jobAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  filters: {
    title: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    jobType: {
      type: String,
      default: ""
    },
    visaSponsorship: {
      type: String,
      default: ""
    }
  },
  frequency: {
    type: String,
    enum: ["instant", "daily", "weekly"],
    default: "daily"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastNotified: {
    type: Date,
    default: null
  },
  matchCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
jobAlertSchema.index({ user: 1, isActive: 1 });
jobAlertSchema.index({ isActive: 1, frequency: 1, lastNotified: 1 });

// Limit alerts per user
jobAlertSchema.statics.canCreateAlert = async function(userId) {
  const count = await this.countDocuments({ user: userId });
  return count < 10; // Max 10 alerts per user
};

module.exports = mongoose.model("JobAlert", jobAlertSchema);
