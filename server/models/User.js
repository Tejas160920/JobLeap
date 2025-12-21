const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      // Password required only for non-OAuth users
      return !this.googleId && !this.appleId;
    },
  },
  role: {
    type: String,
    enum: ["hiring", "seeking"],
    required: true,
  },
  // OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  appleId: {
    type: String,
    unique: true,
    sparse: true
  },
  // Profile information
  profile: {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, trim: true },
    avatar: { type: String },
    bio: { type: String, maxlength: 500 },
    location: { type: String, trim: true },
    website: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    experience: { type: String, trim: true },
    education: { type: String, trim: true }
  },
  // AutoFill Profile for Chrome Extension
  autofillProfile: {
    // Basics
    firstName: String,
    lastName: String,
    preferredName: String,
    pronouns: String,
    namePronunciation: String,
    resumeFile: String,
    // Education
    education: [{
      school: String,
      degree: String,
      major: String,
      gpa: String,
      startDate: String,
      endDate: String
    }],
    // Experience
    lookingForFirstJob: { type: Boolean, default: false },
    experience: [{
      position: String,
      company: String,
      location: String,
      experienceType: String,
      startDate: String,
      endDate: String,
      current: { type: Boolean, default: false },
      description: String
    }],
    // Work Authorization
    workAuthorization: {
      authorizedUS: String,
      authorizedCanada: String,
      authorizedUK: String,
      authorizedEU: String,
      requireSponsorship: String
    },
    // EEO (Equal Employment Opportunity)
    eeo: {
      gender: String,
      hispanicLatino: String,
      ethnicity: String,
      veteranStatus: String,
      disabilityStatus: String,
      lgbtq: String
    },
    // Skills
    skills: [String],
    // Personal
    personal: {
      email: String,
      phone: String,
      phoneCountryCode: String,
      dateOfBirth: String,
      currentCompany: String,
      // Address fields
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
      }
    },
    // Links
    links: {
      linkedin: String,
      github: String,
      portfolio: String,
      twitter: String,
      other: String
    },
    // Common Application Questions (default answers)
    commonAnswers: {
      howDidYouHear: String,
      willingToRelocate: String,
      earliestStartDate: String,
      salaryExpectation: String,
      previouslyApplied: { type: String, default: 'No' },
      previouslyEmployed: { type: String, default: 'No' }
    }
  },
  profileCompleted: {
    type: Boolean,
    default: false
  },
  needsRoleSelection: {
    type: Boolean,
    default: false
  },
  // Settings
  settings: {
    emailNotifications: { type: Boolean, default: true },
    jobAlerts: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false },
    profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
    twoFactorAuth: { type: Boolean, default: false }
  },
  // Security fields
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
