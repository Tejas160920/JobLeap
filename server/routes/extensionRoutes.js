/**
 * Extension API Routes
 * Endpoints for the JobLeap Chrome Extension
 */

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Application = require('../models/Application');
const Groq = require('groq-sdk');

// ============================================
// Profile Endpoints
// ============================================

/**
 * GET /api/extension/profile
 * Get user profile optimized for extension autofill
 * Uses the autofillProfile from User model
 */
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('email autofillProfile');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Helper to sanitize values - convert "null", null, undefined to empty string
    const sanitize = (val) => {
      if (val === null || val === undefined || val === 'null' || val === 'undefined') {
        return '';
      }
      return String(val);
    };

    const ap = user.autofillProfile || {};

    // Transform autofillProfile to extension-compatible format
    const profile = {
      // Basics
      firstName: sanitize(ap.firstName),
      lastName: sanitize(ap.lastName),
      preferredName: sanitize(ap.preferredName),
      pronouns: sanitize(ap.pronouns),
      namePronunciation: sanitize(ap.namePronunciation),
      // Personal (for backwards compatibility and structured access)
      personal: {
        firstName: sanitize(ap.firstName),
        lastName: sanitize(ap.lastName),
        email: sanitize(ap.personal?.email || user.email),
        phone: sanitize(ap.personal?.phone),
        phoneCountryCode: sanitize(ap.personal?.phoneCountryCode || '+1'),
        currentCompany: sanitize(ap.personal?.currentCompany),
        linkedIn: sanitize(ap.links?.linkedin),
        github: sanitize(ap.links?.github),
        portfolio: sanitize(ap.links?.portfolio),
        address: {
          street: sanitize(ap.personal?.address?.street),
          city: sanitize(ap.personal?.address?.city),
          state: sanitize(ap.personal?.address?.state),
          zipCode: sanitize(ap.personal?.address?.zipCode),
          country: sanitize(ap.personal?.address?.country || 'United States'),
        },
        dateOfBirth: sanitize(ap.personal?.dateOfBirth),
      },
      // Links
      links: {
        linkedin: sanitize(ap.links?.linkedin),
        github: sanitize(ap.links?.github),
        portfolio: sanitize(ap.links?.portfolio),
        twitter: sanitize(ap.links?.twitter),
        other: sanitize(ap.links?.other),
      },
      // Experience
      experience: (ap.experience || []).map(exp => ({
        title: sanitize(exp.position),
        company: sanitize(exp.company),
        location: sanitize(exp.location),
        experienceType: sanitize(exp.experienceType),
        startDate: sanitize(exp.startDate),
        endDate: sanitize(exp.endDate),
        current: exp.current || false,
        description: sanitize(exp.description),
      })),
      // Education
      education: (ap.education || []).map(edu => ({
        school: sanitize(edu.school),
        degree: sanitize(edu.degree),
        field: sanitize(edu.major),
        gpa: sanitize(edu.gpa),
        startDate: sanitize(edu.startDate),
        endDate: sanitize(edu.endDate),
      })),
      // Skills
      skills: ap.skills || [],
      // Work Authorization
      workAuthorization: {
        authorizedUS: sanitize(ap.workAuthorization?.authorizedUS),
        authorizedCanada: sanitize(ap.workAuthorization?.authorizedCanada),
        authorizedUK: sanitize(ap.workAuthorization?.authorizedUK),
        authorizedEU: sanitize(ap.workAuthorization?.authorizedEU),
        requireSponsorship: sanitize(ap.workAuthorization?.requireSponsorship),
      },
      // Legacy preferences field for backwards compatibility
      preferences: {
        authorizedToWork: ap.workAuthorization?.authorizedUS === 'yes',
        requiresSponsorship: ap.workAuthorization?.requireSponsorship === 'yes',
        authorizedUS: sanitize(ap.workAuthorization?.authorizedUS),
        authorizedCanada: sanitize(ap.workAuthorization?.authorizedCanada),
        authorizedUK: sanitize(ap.workAuthorization?.authorizedUK),
        authorizedEU: sanitize(ap.workAuthorization?.authorizedEU),
      },
      // EEO
      eeo: {
        gender: sanitize(ap.eeo?.gender),
        hispanicLatino: sanitize(ap.eeo?.hispanicLatino),
        ethnicity: sanitize(ap.eeo?.ethnicity),
        veteranStatus: sanitize(ap.eeo?.veteranStatus),
        disabilityStatus: sanitize(ap.eeo?.disabilityStatus),
        lgbtq: sanitize(ap.eeo?.lgbtq),
      },
      // Common Application Answers
      commonAnswers: {
        howDidYouHear: sanitize(ap.commonAnswers?.howDidYouHear),
        willingToRelocate: sanitize(ap.commonAnswers?.willingToRelocate),
        earliestStartDate: sanitize(ap.commonAnswers?.earliestStartDate),
        salaryExpectation: sanitize(ap.commonAnswers?.salaryExpectation),
        previouslyApplied: sanitize(ap.commonAnswers?.previouslyApplied),
        previouslyEmployed: sanitize(ap.commonAnswers?.previouslyEmployed),
      },
      // Other
      lookingForFirstJob: ap.lookingForFirstJob || false,
      files: {
        resumeName: sanitize(ap.resumeFile),
      },
    };

    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error('Extension profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
    });
  }
});

/**
 * PUT /api/extension/profile
 * Update user profile from extension
 * Syncs data to the autofillProfile structure
 */
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({
        success: false,
        error: 'Profile data required',
      });
    }

    // Get the user first to merge with existing autofillProfile
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Map extension profile to autofillProfile structure
    const autofillProfile = {
      ...user.autofillProfile,
      firstName: profile.personal?.firstName || user.autofillProfile?.firstName || '',
      lastName: profile.personal?.lastName || user.autofillProfile?.lastName || '',
      personal: {
        ...user.autofillProfile?.personal,
        phone: profile.personal?.phone || user.autofillProfile?.personal?.phone || '',
        location: [
          profile.personal?.address?.city,
          profile.personal?.address?.state,
        ].filter(Boolean).join(', ') || user.autofillProfile?.personal?.location || '',
        dateOfBirth: profile.personal?.dateOfBirth || user.autofillProfile?.personal?.dateOfBirth || '',
      },
      links: {
        ...user.autofillProfile?.links,
        linkedin: profile.personal?.linkedIn || user.autofillProfile?.links?.linkedin || '',
        github: profile.personal?.github || user.autofillProfile?.links?.github || '',
        portfolio: profile.personal?.portfolio || user.autofillProfile?.links?.portfolio || '',
      },
      skills: profile.skills || user.autofillProfile?.skills || [],
      experience: (profile.experience || []).map(exp => ({
        position: exp.title || '',
        company: exp.company || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        current: exp.current || false,
        description: exp.description || '',
      })),
      education: (profile.education || []).map(edu => ({
        school: edu.school || '',
        degree: edu.degree || '',
        major: edu.field || '',
        gpa: edu.gpa || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
      })),
      workAuthorization: {
        ...user.autofillProfile?.workAuthorization,
        authorizedUS: profile.preferences?.authorizedToWork ? 'yes' : user.autofillProfile?.workAuthorization?.authorizedUS || '',
        requireSponsorship: profile.preferences?.requiresSponsorship ? 'yes' : user.autofillProfile?.workAuthorization?.requireSponsorship || '',
      },
    };

    // Update the user
    user.autofillProfile = autofillProfile;
    user.profileCompleted = true;
    await user.save();

    res.json({
      success: true,
      message: 'Profile updated',
    });
  } catch (error) {
    console.error('Extension profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
    });
  }
});

// ============================================
// AI Draft Endpoint
// ============================================

/**
 * POST /api/extension/draft-answer
 * Generate AI-drafted answer for a custom question
 */
router.post('/draft-answer', verifyToken, async (req, res) => {
  try {
    const { question, jobDescription, jobTitle, company, profile } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: 'Question is required',
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'AI service not configured',
      });
    }

    const groq = new Groq({ apiKey });

    // Build context from profile
    const profileContext = buildProfileContext(profile);

    const systemPrompt = `You are an expert job application assistant. Your task is to draft a compelling, authentic answer to a job application question.

CRITICAL RULES:
1. NEVER invent or fabricate experience, skills, or achievements
2. Only use information provided in the candidate's profile
3. If required information is missing, indicate what's needed
4. Keep answers concise but impactful (2-4 sentences for short questions, 4-6 for longer ones)
5. Match the tone to the company/role (professional but not stuffy)
6. Focus on specific, concrete examples when available

CANDIDATE PROFILE:
${profileContext}

${jobTitle ? `JOB TITLE: ${jobTitle}` : ''}
${company ? `COMPANY: ${company}` : ''}
${jobDescription ? `JOB DESCRIPTION:\n${jobDescription.substring(0, 1500)}` : ''}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Please draft an answer to this application question: "${question}"

If you cannot answer due to missing profile information, start your response with "[NEEDS INFO]" and explain what information is needed.`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0]?.message?.content || '';
    const needsInfo = answer.startsWith('[NEEDS INFO]');

    res.json({
      success: true,
      answer: needsInfo ? answer.replace('[NEEDS INFO]', '').trim() : answer,
      confidence: needsInfo ? 0.3 : 0.8,
      basedOn: extractUsedFields(answer, profile),
      needsMoreInfo: needsInfo,
    });
  } catch (error) {
    console.error('AI draft error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate answer',
    });
  }
});

/**
 * Build profile context string for AI
 */
function buildProfileContext(profile) {
  if (!profile) return 'No profile information available.';

  const sections = [];

  // Personal
  if (profile.personal) {
    const p = profile.personal;
    sections.push(
      `Name: ${p.firstName || ''} ${p.lastName || ''}`.trim()
    );
    if (p.email) sections.push(`Email: ${p.email}`);
  }

  // Experience
  if (profile.experience?.length > 0) {
    sections.push('\nWORK EXPERIENCE:');
    profile.experience.slice(0, 3).forEach((exp) => {
      sections.push(
        `- ${exp.title} at ${exp.company} (${exp.startDate || ''} - ${exp.endDate || exp.current ? 'Present' : ''})`
      );
      if (exp.description) {
        sections.push(`  ${exp.description.substring(0, 200)}`);
      }
    });
  }

  // Education
  if (profile.education?.length > 0) {
    sections.push('\nEDUCATION:');
    profile.education.slice(0, 2).forEach((edu) => {
      sections.push(`- ${edu.degree} in ${edu.field} from ${edu.school}`);
    });
  }

  // Skills
  if (profile.skills?.length > 0) {
    sections.push(`\nSKILLS: ${profile.skills.slice(0, 15).join(', ')}`);
  }

  return sections.join('\n') || 'Limited profile information available.';
}

/**
 * Extract which profile fields were used in the answer
 */
function extractUsedFields(answer, profile) {
  const usedFields = [];
  const lowerAnswer = answer.toLowerCase();

  if (profile?.personal?.firstName && lowerAnswer.includes(profile.personal.firstName.toLowerCase())) {
    usedFields.push('personal.firstName');
  }

  if (profile?.experience?.length > 0) {
    profile.experience.forEach((exp) => {
      if (exp.company && lowerAnswer.includes(exp.company.toLowerCase())) {
        usedFields.push('experience');
      }
    });
  }

  if (profile?.skills?.length > 0) {
    profile.skills.forEach((skill) => {
      if (lowerAnswer.includes(skill.toLowerCase())) {
        usedFields.push('skills');
      }
    });
  }

  return [...new Set(usedFields)];
}

// ============================================
// Application Logging
// ============================================

/**
 * POST /api/extension/log-application
 * Log an application from the extension
 */
router.post('/log-application', verifyToken, async (req, res) => {
  try {
    const { company, jobTitle, jobUrl, atsType, status } = req.body;

    if (!company || !jobTitle) {
      return res.status(400).json({
        success: false,
        error: 'Company and job title are required',
      });
    }

    // Create or update application record
    const existingApp = await Application.findOne({
      applicant: req.user.id,
      'externalJobData.url': jobUrl,
    });

    if (existingApp) {
      // Update existing
      existingApp.status = status === 'submitted' ? 'pending' : 'pending';
      existingApp.updatedAt = new Date();
      await existingApp.save();

      return res.json({
        success: true,
        message: 'Application updated',
        applicationId: existingApp._id,
      });
    }

    // Create new application for external job
    const application = new Application({
      applicant: req.user.id,
      externalJobId: `ext-${Date.now()}`,
      externalJobData: {
        title: jobTitle,
        company: company,
        url: jobUrl,
        source: atsType || 'extension',
        appliedAt: new Date(),
      },
      status: 'pending',
      appliedAt: new Date(),
    });

    await application.save();

    res.json({
      success: true,
      message: 'Application logged',
      applicationId: application._id,
    });
  } catch (error) {
    console.error('Log application error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to log application',
    });
  }
});

/**
 * GET /api/extension/saved-answers
 * Get saved answers for common questions
 */
router.get('/saved-answers', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('savedAnswers');

    res.json({
      success: true,
      savedAnswers: user?.savedAnswers || {},
    });
  } catch (error) {
    console.error('Get saved answers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch saved answers',
    });
  }
});

/**
 * POST /api/extension/saved-answers
 * Save an answer for reuse
 */
router.post('/saved-answers', verifyToken, async (req, res) => {
  try {
    const { questionPattern, answer } = req.body;

    if (!questionPattern || !answer) {
      return res.status(400).json({
        success: false,
        error: 'Question pattern and answer are required',
      });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $set: { [`savedAnswers.${questionPattern}`]: answer },
    });

    res.json({
      success: true,
      message: 'Answer saved',
    });
  } catch (error) {
    console.error('Save answer error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save answer',
    });
  }
});

// ============================================
// Health Check
// ============================================

/**
 * GET /api/extension/health
 * Health check for extension connectivity
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
