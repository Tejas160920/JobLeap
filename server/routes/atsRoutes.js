const express = require('express');
const router = express.Router();
const multer = require('multer');
const mammoth = require('mammoth');
const Groq = require('groq-sdk');

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

// Analyze resume against job description using Groq
async function analyzeWithGroq(resumeText, jobDescription, jobTitle, company) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('Groq API key not configured');
  }

  const groq = new Groq({ apiKey });

  const prompt = `You are an expert ATS (Applicant Tracking System) analyzer. Analyze this resume against the job description and provide a detailed compatibility assessment.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Provide your analysis in the following JSON format (respond ONLY with valid JSON, no markdown or extra text):
{
  "score": <number between 0-100>,
  "summary": "<2-3 sentence summary of the match>",
  "matchedKeywords": ["<list of important keywords from job that appear in resume>"],
  "missingKeywords": ["<list of important keywords from job that are missing from resume>"],
  "strengths": ["<list 3-5 strong points about this resume for this job>"],
  "improvements": ["<list 3-5 specific suggestions to improve the resume for this job>"],
  "formatIssues": ["<list any formatting issues that might cause ATS problems, or empty array if none>"],
  "experienceMatch": {
    "score": <number 0-100>,
    "feedback": "<brief feedback on experience alignment>"
  },
  "skillsMatch": {
    "score": <number 0-100>,
    "feedback": "<brief feedback on skills alignment>"
  },
  "educationMatch": {
    "score": <number 0-100>,
    "feedback": "<brief feedback on education alignment>"
  }
}

Be constructive and specific in your feedback. Focus on actionable improvements.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.3,
      max_tokens: 2000,
    });

    const text = completion.choices[0]?.message?.content || '';

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.slice(7);
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.slice(0, -3);
    }
    cleanedText = cleanedText.trim();

    // Parse JSON response
    const analysis = JSON.parse(cleanedText);
    return analysis;
  } catch (error) {
    console.error('Groq analysis error:', error.message || error);
    if (error.message?.includes('API key')) {
      throw new Error('Invalid Groq API key. Please check your configuration.');
    }
    if (error.message?.includes('rate') || error.status === 429) {
      throw new Error('API rate limit reached. Please try again in a few minutes.');
    }
    if (error.message?.includes('JSON')) {
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
