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
 */
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Transform to extension profile format
    const profile = {
      personal: {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        linkedIn: user.linkedIn || '',
        github: user.github || '',
        portfolio: user.website || '',
        address: {
          city: user.location?.split(',')[0]?.trim() || '',
          state: user.location?.split(',')[1]?.trim() || '',
          country: 'United States',
        },
      },
      experience: user.experience || [],
      education: user.education || [],
      skills: user.skills || [],
      preferences: {
        authorizedToWork: true,
        requiresSponsorship: false,
      },
      savedAnswers: user.savedAnswers || {},
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

    // Map extension profile to user model
    const updates = {
      firstName: profile.personal?.firstName,
      lastName: profile.personal?.lastName,
      phone: profile.personal?.phone,
      linkedIn: profile.personal?.linkedIn,
      github: profile.personal?.github,
      website: profile.personal?.portfolio,
      location: [
        profile.personal?.address?.city,
        profile.personal?.address?.state,
      ]
        .filter(Boolean)
        .join(', '),
      skills: profile.skills,
      experience: profile.experience,
      education: profile.education,
      savedAnswers: profile.savedAnswers,
    };

    // Remove undefined values
    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select('-password');

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
