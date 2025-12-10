const express = require('express');
const router = express.Router();
const multer = require('multer');
const mammoth = require('mammoth');
const Groq = require('groq-sdk');
const h1bSponsors = require('../data/h1bSponsors');

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'), false);
    }
  }
});

// Extract text from PDF using dynamic import to avoid Vercel issues
async function extractTextFromPDF(buffer) {
  try {
    // Use dynamic import to load pdf-parse only when needed
    const pdfParse = (await import('pdf-parse-new')).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Try uploading a DOCX file instead.');
  }
}

// Extract text from DOCX
async function extractTextFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

// Analyze visa sponsorship based on JD and company history
function analyzeVisaSponsorship(jobDescription, companyName, visaStatus) {
  // If user doesn't need sponsorship, return eligible
  const noSponsorshipNeeded = ['citizen', 'green_card'];
  if (noSponsorshipNeeded.includes(visaStatus)) {
    return {
      status: 'eligible',
      message: "You're authorized to work in the US - visa sponsorship is not required for your status."
    };
  }

  // If no visa status provided, skip visa analysis
  if (!visaStatus || visaStatus === 'not_specified') {
    return null;
  }

  const jdLower = jobDescription.toLowerCase();

  // Keywords indicating NO sponsorship
  const noSponsorshipKeywords = [
    'no visa sponsorship',
    'not sponsor',
    'cannot sponsor',
    'will not sponsor',
    'won\'t sponsor',
    'do not sponsor',
    'doesn\'t sponsor',
    'does not sponsor',
    'unable to sponsor',
    'sponsorship is not available',
    'sponsorship not available',
    'no sponsorship',
    'must be authorized to work',
    'must be legally authorized',
    'must have existing right to work',
    'us citizens only',
    'u.s. citizens only',
    'citizens only',
    'permanent residents only',
    'green card required',
    'security clearance required',
    'clearance required',
    'us persons only',
    'itar'
  ];

  // Keywords indicating YES sponsorship
  const yesSponsorshipKeywords = [
    'visa sponsorship available',
    'visa sponsorship is available',
    'will sponsor',
    'sponsorship available',
    'sponsor h1b',
    'sponsor h-1b',
    'h1b sponsorship',
    'h-1b sponsorship',
    'sponsorship offered',
    'open to sponsoring',
    'willing to sponsor',
    'can sponsor',
    'provides sponsorship',
    'immigration sponsorship'
  ];

  // Check for negative keywords first (more specific)
  for (const keyword of noSponsorshipKeywords) {
    if (jdLower.includes(keyword)) {
      return {
        status: 'no_sponsorship',
        message: `The job description indicates they are not providing visa sponsorship for this role. Found: "${keyword}"`
      };
    }
  }

  // Check for positive keywords
  for (const keyword of yesSponsorshipKeywords) {
    if (jdLower.includes(keyword)) {
      return {
        status: 'sponsor_available',
        message: 'This job description indicates visa sponsorship is available for this role.'
      };
    }
  }

  // No visa info in JD - check company history
  if (companyName && companyName !== 'Not specified') {
    const companyLower = companyName.toLowerCase().trim();

    // Try to find company in H1B sponsors data
    const matchedCompany = h1bSponsors.find(sponsor => {
      const sponsorLower = sponsor.name.toLowerCase();
      // Check for exact match or partial match
      return sponsorLower.includes(companyLower) ||
             companyLower.includes(sponsorLower.split(' ')[0]) ||
             sponsorLower.split(' ')[0] === companyLower.split(' ')[0];
    });

    if (matchedCompany) {
      const totalLCAs = matchedCompany.totalLCAs || 0;
      const approvalRate = matchedCompany.approvalRate || 0;

      return {
        status: 'likely_sponsors',
        message: `No visa information in the job description. However, ${matchedCompany.name} has sponsored ${totalLCAs.toLocaleString()} H1B visas with a ${approvalRate}% approval rate - they historically do sponsor international candidates.`
      };
    }
  }

  // No info found anywhere
  return {
    status: 'unknown',
    message: 'No visa sponsorship information found in the job description, and no H1B sponsorship history available for this company. Consider reaching out to the recruiter directly to confirm.'
  };
}

// Analyze resume against job description using Groq
async function analyzeWithGroq(resumeText, jobDescription, jobTitle, company) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('Groq API key not configured');
  }

  const groq = new Groq({ apiKey });

  const prompt = `You are a senior technical recruiter and ATS (Applicant Tracking System) expert with 15+ years of experience at Fortune 500 companies. You have deep expertise in:
- How modern ATS systems (Workday, Greenhouse, Lever, Taleo, iCIMS) parse and score resumes
- Keyword optimization and semantic matching algorithms
- Industry-specific hiring standards and requirements
- Resume formatting best practices for maximum ATS compatibility

TASK: Perform a comprehensive ATS compatibility analysis of the provided resume against the job description.

=== INPUT DATA ===

TARGET POSITION: ${jobTitle || 'Not specified'}
TARGET COMPANY: ${company || 'Not specified'}

--- JOB DESCRIPTION START ---
${jobDescription}
--- JOB DESCRIPTION END ---

--- RESUME CONTENT START ---
${resumeText}
--- RESUME CONTENT END ---

=== ANALYSIS INSTRUCTIONS ===

Perform the following analysis steps:

1. KEYWORD EXTRACTION & MATCHING:
   - Extract ALL important keywords from the job description including:
     * Hard skills (programming languages, tools, frameworks, technologies)
     * Soft skills (leadership, communication, problem-solving)
     * Industry-specific terms and jargon
     * Required certifications or qualifications
     * Years of experience requirements
   - Match these against the resume content (consider synonyms and variations)
   - Example: "JS" = "JavaScript", "ML" = "Machine Learning", "K8s" = "Kubernetes"

2. EXPERIENCE ANALYSIS:
   - Compare required years of experience vs demonstrated experience
   - Evaluate relevance of past roles to target position
   - Check for career progression and growth
   - Look for quantifiable achievements (numbers, percentages, metrics)

3. SKILLS ASSESSMENT:
   - Categorize as: Must-have vs Nice-to-have based on job description language
   - "Required", "Must have", "Essential" = Must-have (weight: HIGH)
   - "Preferred", "Nice to have", "Bonus" = Nice-to-have (weight: MEDIUM)
   - Check skill proficiency indicators if mentioned

4. EDUCATION EVALUATION:
   - Match degree requirements (exact match, equivalent, or exceeds)
   - Check for required certifications
   - Consider relevant coursework or bootcamps if degree not specified

5. ATS FORMATTING CHECK:
   - Identify potential parsing issues:
     * Complex tables or columns that ATS might misread
     * Images, graphics, or icons (ATS cannot read these)
     * Unusual fonts or special characters
     * Headers/footers that might be ignored
     * Missing standard sections (Contact, Experience, Education, Skills)
     * Non-standard date formats
     * Missing or buried contact information

6. SCORING RUBRIC (be strict but fair):
   - 90-100: Exceptional match - meets/exceeds all requirements, strong keyword alignment
   - 80-89: Strong match - meets most requirements, minor gaps
   - 70-79: Good match - meets core requirements, some notable gaps
   - 60-69: Moderate match - meets some requirements, significant gaps
   - 50-59: Weak match - missing several key requirements
   - Below 50: Poor match - major misalignment with job requirements

=== OUTPUT FORMAT ===

Respond with ONLY valid JSON (no markdown, no explanation, no code blocks). Use this exact structure:

{
  "score": <number 0-100, following the rubric above>,
  "summary": "<2-3 sentences: overall assessment, key strength, and main gap>",
  "matchedKeywords": ["<list 8-15 important keywords/skills from job that ARE in resume>"],
  "missingKeywords": ["<list 5-10 important keywords/skills from job that are MISSING from resume>"],
  "strengths": [
    "<strength 1: be specific, reference actual resume content>",
    "<strength 2: mention quantifiable achievements if present>",
    "<strength 3: highlight relevant experience>",
    "<strength 4: note any standout qualifications>",
    "<strength 5: if applicable>"
  ],
  "improvements": [
    "<improvement 1: specific, actionable suggestion with example>",
    "<improvement 2: mention exact keywords to add>",
    "<improvement 3: suggest how to reframe existing experience>",
    "<improvement 4: address any gaps directly>",
    "<improvement 5: formatting or structure suggestions>"
  ],
  "formatIssues": ["<list specific ATS formatting problems found, or empty array [] if none>"],
  "experienceMatch": {
    "score": <number 0-100>,
    "feedback": "<1-2 sentences: years match, role relevance, career progression>"
  },
  "skillsMatch": {
    "score": <number 0-100>,
    "feedback": "<1-2 sentences: technical skills coverage, tools/technologies alignment>"
  },
  "educationMatch": {
    "score": <number 0-100>,
    "feedback": "<1-2 sentences: degree match, certifications, relevant training>"
  }
}

=== IMPORTANT RULES ===

1. Be HONEST and ACCURATE - don't inflate scores to be nice. Job seekers need real feedback.
2. Be SPECIFIC - reference actual content from the resume and job description.
3. Be ACTIONABLE - every improvement should be something they can actually do.
4. Consider CONTEXT - a junior role has different expectations than a senior role.
5. NEVER hallucinate keywords - only list keywords that actually appear in the documents.
6. If resume text seems corrupted or unreadable, note this in formatIssues and adjust scores accordingly.
7. Ensure all arrays have at least 1 item (except formatIssues which can be empty).
8. All scores must be integers between 0-100.

Now analyze the resume and provide your JSON response:`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert ATS analyzer. Always respond with valid JSON only. No markdown, no explanations, just the JSON object.'
        },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2, // Lower temperature for more consistent output
      max_tokens: 2500, // Increased for detailed analysis
    });

    const text = completion.choices[0]?.message?.content || '';

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();

    // Handle various markdown formats
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.slice(7);
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.slice(0, -3);
    }
    cleanedText = cleanedText.trim();

    // Try to extract JSON if there's extra text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedText = jsonMatch[0];
    }

    // Parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parse error, raw text:', cleanedText.substring(0, 500));
      throw new Error('JSON parse failed');
    }

    // Validate and sanitize the response with fallbacks
    const validatedAnalysis = {
      score: typeof analysis.score === 'number' ? Math.min(100, Math.max(0, Math.round(analysis.score))) : 50,
      summary: typeof analysis.summary === 'string' ? analysis.summary : 'Analysis completed. Please review the detailed feedback below.',
      matchedKeywords: Array.isArray(analysis.matchedKeywords) ? analysis.matchedKeywords.filter(k => typeof k === 'string') : [],
      missingKeywords: Array.isArray(analysis.missingKeywords) ? analysis.missingKeywords.filter(k => typeof k === 'string') : [],
      strengths: Array.isArray(analysis.strengths) ? analysis.strengths.filter(s => typeof s === 'string').slice(0, 6) : ['Resume was successfully parsed'],
      improvements: Array.isArray(analysis.improvements) ? analysis.improvements.filter(i => typeof i === 'string').slice(0, 6) : ['Consider tailoring your resume more closely to the job description'],
      formatIssues: Array.isArray(analysis.formatIssues) ? analysis.formatIssues.filter(f => typeof f === 'string') : [],
      experienceMatch: {
        score: typeof analysis.experienceMatch?.score === 'number' ? Math.min(100, Math.max(0, Math.round(analysis.experienceMatch.score))) : 50,
        feedback: typeof analysis.experienceMatch?.feedback === 'string' ? analysis.experienceMatch.feedback : 'Experience evaluation completed.'
      },
      skillsMatch: {
        score: typeof analysis.skillsMatch?.score === 'number' ? Math.min(100, Math.max(0, Math.round(analysis.skillsMatch.score))) : 50,
        feedback: typeof analysis.skillsMatch?.feedback === 'string' ? analysis.skillsMatch.feedback : 'Skills evaluation completed.'
      },
      educationMatch: {
        score: typeof analysis.educationMatch?.score === 'number' ? Math.min(100, Math.max(0, Math.round(analysis.educationMatch.score))) : 50,
        feedback: typeof analysis.educationMatch?.feedback === 'string' ? analysis.educationMatch.feedback : 'Education evaluation completed.'
      }
    };

    // Ensure we have at least some content in critical arrays
    if (validatedAnalysis.matchedKeywords.length === 0) {
      validatedAnalysis.matchedKeywords = ['Resume content analyzed'];
    }
    if (validatedAnalysis.strengths.length === 0) {
      validatedAnalysis.strengths = ['Resume was successfully parsed and analyzed'];
    }
    if (validatedAnalysis.improvements.length === 0) {
      validatedAnalysis.improvements = ['Consider adding more keywords from the job description'];
    }

    return validatedAnalysis;
  } catch (error) {
    console.error('Groq analysis error:', error.message || error);
    if (error.message?.includes('API key')) {
      throw new Error('Invalid Groq API key. Please check your configuration.');
    }
    if (error.message?.includes('rate') || error.status === 429) {
      throw new Error('API rate limit reached. Please try again in a few minutes.');
    }
    if (error.message?.includes('JSON') || error.message?.includes('parse')) {
      throw new Error('Failed to parse AI response. Please try again.');
    }
    throw new Error(`AI analysis failed: ${error.message || 'Unknown error'}`);
  }
}

// POST /api/ats/check - Analyze resume against job
router.post('/check', upload.single('resume'), async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file (PDF or DOCX)'
      });
    }

    // Get job details from request body
    const { jobDescription, jobTitle, company } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required'
      });
    }

    // Extract text based on file type
    let resumeText;
    if (req.file.mimetype === 'application/pdf') {
      resumeText = await extractTextFromPDF(req.file.buffer);
    } else {
      resumeText = await extractTextFromDOCX(req.file.buffer);
    }

    // Check if text was extracted
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract enough text from the resume. Please ensure the file contains readable text.'
      });
    }

    // Analyze with Gemini
    const analysis = await analyzeWithGroq(
      resumeText,
      jobDescription,
      jobTitle || 'Not specified',
      company || 'Not specified'
    );

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('ATS check error:', error);

    // Handle specific errors
    if (error.message === 'Gemini API key not configured') {
      return res.status(503).json({
        success: false,
        message: 'ATS checking service is not configured. Please contact support.'
      });
    }

    if (error.message.includes('Only PDF and DOCX')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume'
    });
  }
});

// POST /api/ats/optimize - Standalone resume optimizer (same as check but for optimizer page)
router.post('/optimize', upload.single('resume'), async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file (PDF or DOCX)'
      });
    }

    // Get job details from request body
    const { jobDescription, jobTitle, company, visaStatus } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required'
      });
    }

    // Extract text based on file type
    let resumeText;
    if (req.file.mimetype === 'application/pdf') {
      resumeText = await extractTextFromPDF(req.file.buffer);
    } else {
      resumeText = await extractTextFromDOCX(req.file.buffer);
    }

    // Check if text was extracted
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract enough text from the resume. Please ensure the file contains readable text.'
      });
    }

    // Analyze with Groq
    const analysis = await analyzeWithGroq(
      resumeText,
      jobDescription,
      jobTitle || 'Not specified',
      company || 'Not specified'
    );

    // Analyze visa sponsorship if visa status provided
    const visaVerdict = analyzeVisaSponsorship(jobDescription, company, visaStatus);
    if (visaVerdict) {
      analysis.visaVerdict = visaVerdict;
    }

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('ATS optimize error:', error);

    if (error.message === 'Groq API key not configured') {
      return res.status(503).json({
        success: false,
        message: 'ATS optimization service is not configured. Please contact support.'
      });
    }

    if (error.message.includes('Only PDF and DOCX')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze resume'
    });
  }
});

// POST /api/ats/enhance-text - AI text enhancement for resume builder
router.post('/enhance-text', async (req, res) => {
  try {
    const { text, type } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Text is required for enhancement'
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        message: 'AI enhancement service is not configured'
      });
    }

    const groq = new Groq({ apiKey });

    // Different prompts based on enhancement type
    const prompts = {
      experience: `You are an expert resume writer. Improve this job description bullet point to be more impactful for ATS systems and recruiters.

Rules:
- Start with a strong action verb (Led, Developed, Implemented, Optimized, Spearheaded, Architected, etc.)
- Include quantifiable metrics where possible (%, numbers, time saved)
- Keep it concise (1-2 lines max)
- Make it ATS-friendly with relevant keywords
- Focus on impact and results, not just responsibilities

Original text: "${text}"

Respond with ONLY the improved bullet point text, nothing else. No quotes, no explanation.`,

      summary: `You are an expert resume writer. Improve this professional summary to be compelling and ATS-optimized.

Rules:
- Keep it to 2-3 impactful sentences
- Highlight years of experience, key skills, and unique value proposition
- Include relevant industry keywords
- Make it specific, not generic
- Avoid first-person pronouns (I, me, my)

Original text: "${text}"

Respond with ONLY the improved summary text, nothing else. No quotes, no explanation.`,

      project: `You are an expert resume writer. Improve this project description to highlight technical skills and impact.

Rules:
- Mention specific technologies, frameworks, and tools used
- Highlight the problem solved and impact achieved
- Include metrics if applicable (users served, performance improvements, etc.)
- Keep it to 2-3 concise sentences
- Make it ATS-friendly

Original text: "${text}"

Respond with ONLY the improved project description, nothing else. No quotes, no explanation.`,

      skill: `You are an expert resume writer. Suggest related skills and technologies based on this skill.

Original skill: "${text}"

Respond with a comma-separated list of 5-8 related skills/technologies that are commonly paired with this skill on resumes. Only list the skills, nothing else.`
    };

    const prompt = prompts[type] || prompts.experience;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer and career coach. Provide concise, impactful improvements. Respond only with the improved text, no explanations or formatting.'
        },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 300,
    });

    const enhancedText = completion.choices[0]?.message?.content?.trim() || '';

    if (!enhancedText) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate enhancement'
      });
    }

    res.json({
      success: true,
      enhanced: enhancedText
    });

  } catch (error) {
    console.error('Text enhancement error:', error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'Rate limit reached. Please try again in a moment.'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to enhance text'
    });
  }
});

// POST /api/ats/generate-cover-letter - AI-powered cover letter generation
router.post('/generate-cover-letter', async (req, res) => {
  try {
    const { jobDescription, jobTitle, company, resumeText, tone = 'professional' } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Job description is required'
      });
    }

    if (!jobTitle || !jobTitle.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required'
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required'
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        message: 'Cover letter generation service is not configured'
      });
    }

    const groq = new Groq({ apiKey });

    // Tone-specific instructions
    const toneInstructions = {
      professional: 'Use a formal, business-appropriate tone. Be polished and respectful.',
      friendly: 'Use a warm, personable tone while remaining professional. Show genuine enthusiasm.',
      confident: 'Use a bold, assertive tone. Highlight achievements confidently without being arrogant.',
      enthusiastic: 'Use a passionate, energetic tone. Show genuine excitement about the opportunity.'
    };

    const toneGuide = toneInstructions[tone] || toneInstructions.professional;

    const prompt = `You are an expert career coach and professional cover letter writer. Generate a compelling, ATS-optimized cover letter for a job application.

=== JOB DETAILS ===
Job Title: ${jobTitle}
Company: ${company}
Job Description:
${jobDescription}

${resumeText ? `=== CANDIDATE BACKGROUND ===
${resumeText}` : ''}

=== TONE ===
${toneGuide}

=== COVER LETTER REQUIREMENTS ===

1. STRUCTURE (3-4 paragraphs):
   - Opening: Hook that shows enthusiasm and states the position. Don't use generic openings like "I am writing to apply for..."
   - Body (1-2 paragraphs): Match your skills/experience to key requirements. Use specific examples from the resume if provided.
   - Closing: Strong call to action expressing interest in discussing the role further.

2. CONTENT RULES:
   - Address the letter to "Hiring Manager" (not "To Whom It May Concern")
   - Mention the company name at least twice naturally
   - Include 3-5 keywords from the job description
   - Reference specific achievements with numbers if the candidate background is provided
   - Show knowledge of the company or role (based on the job description)
   - Keep total length to 250-350 words

3. STYLE RULES:
   - No clichés or generic phrases
   - Active voice, strong verbs
   - Specific and concrete, not vague
   - Match the tone specified above
   - Professional formatting with proper spacing

4. DO NOT:
   - Start with "I am writing to apply for..."
   - Use phrases like "I believe I would be a great fit"
   - Include salary expectations
   - Mention that you're "excited to apply"
   - Use bullet points (write in paragraph form)

Generate ONLY the cover letter text, nothing else. No explanations before or after. Start directly with "Dear Hiring Manager,"`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert cover letter writer. Generate professional, compelling cover letters that are ATS-optimized and tailored to specific job descriptions. Always output only the cover letter text, no additional commentary.'
        },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 800,
    });

    const coverLetter = completion.choices[0]?.message?.content?.trim() || '';

    if (!coverLetter) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate cover letter'
      });
    }

    res.json({
      success: true,
      coverLetter
    });

  } catch (error) {
    console.error('Cover letter generation error:', error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'Rate limit reached. Please try again in a moment.'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate cover letter'
    });
  }
});

// Handle multer errors
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
  }
  next(error);
});

module.exports = router;
