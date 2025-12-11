/**
 * Job Aggregator Service
 * Fetches jobs from multiple GitHub repos and APIs, handles deduplication
 */

// Cache for aggregated jobs
let aggregatedJobsCache = {
  jobs: [],
  lastFetch: 0,
  sources: {},
  isLoading: false
};

// Cache duration: 6 hours for GitHub repos, 4 hours for APIs
const GITHUB_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours
const API_CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours

// Flag to track if initial fetch is in progress
let initialFetchPromise = null;

/**
 * Normalize company name for deduplication
 */
const normalizeCompanyName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/,?\s*(inc|llc|corp|ltd|co|corporation|incorporated|limited)\.?$/i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
};

/**
 * Normalize job title for deduplication
 */
const normalizeTitle = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Generate a unique key for deduplication
 */
const generateJobKey = (job) => {
  const company = normalizeCompanyName(job.company);
  const title = normalizeTitle(job.title);
  return `${company}_${title}`;
};

/**
 * Calculate similarity between two strings (for fuzzy matching)
 */
const calculateSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  if (s1 === s2) return 1;
  if (s1.length < 2 || s2.length < 2) return 0;

  // Simple word overlap similarity
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  const intersection = words1.filter(w => words2.includes(w));

  return (2 * intersection.length) / (words1.length + words2.length);
};

/**
 * Fetch jobs from SimplifyJobs Summer Internships
 */
const fetchSimplifyInternships = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/.github/scripts/listings.json',
      { headers: { 'User-Agent': 'JobLeap/1.0' } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const jobs = (Array.isArray(data) ? data : [])
      .filter(job => job.active && job.is_visible)
      .map(job => ({
        _id: `simplify_intern_${job.id}`,
        title: job.title || 'Software Engineering Intern',
        company: job.company_name || 'Unknown Company',
        location: Array.isArray(job.locations) ? job.locations.join(', ') : (job.locations || 'Remote'),
        salary: '',
        jobType: 'Internship',
        description: `${job.title} at ${job.company_name}. Terms: ${Array.isArray(job.terms) ? job.terms.join(', ') : job.terms || 'Summer 2025'}`,
        tags: ['internship', 'software engineering', ...(Array.isArray(job.terms) ? job.terms : [])],
        logo: '',
        url: job.url || '',
        postedAt: job.date_posted ? new Date(job.date_posted * 1000) : new Date(),
        updatedAt: job.date_updated ? new Date(job.date_updated * 1000) : new Date(),
        source: 'simplify_internships',
        sponsorship: job.sponsorship || 'Unknown',
        active: job.active
      }));

    console.log(`[JobAggregator] Fetched ${jobs.length} jobs from SimplifyJobs Internships`);
    return jobs;
  } catch (error) {
    console.error('[JobAggregator] Error fetching SimplifyJobs Internships:', error.message);
    return [];
  }
};

/**
 * Fetch jobs from SimplifyJobs New Grad Positions
 */
const fetchSimplifyNewGrad = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/SimplifyJobs/New-Grad-Positions/dev/.github/scripts/listings.json',
      { headers: { 'User-Agent': 'JobLeap/1.0' } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const jobs = (Array.isArray(data) ? data : [])
      .filter(job => job.active && job.is_visible)
      .map(job => ({
        _id: `simplify_newgrad_${job.id}`,
        title: job.title || 'Software Engineer',
        company: job.company_name || 'Unknown Company',
        location: Array.isArray(job.locations) ? job.locations.join(', ') : (job.locations || 'Remote'),
        salary: '',
        jobType: 'Full-time',
        description: `${job.title} at ${job.company_name}. Category: ${job.category || 'Software Engineering'}`,
        tags: ['new grad', 'entry level', job.category || 'software'].filter(Boolean),
        logo: '',
        url: job.url || '',
        postedAt: job.date_posted ? new Date(job.date_posted * 1000) : new Date(),
        updatedAt: job.date_updated ? new Date(job.date_updated * 1000) : new Date(),
        source: 'simplify_newgrad',
        sponsorship: job.sponsorship || 'Unknown',
        active: job.active
      }));

    console.log(`[JobAggregator] Fetched ${jobs.length} jobs from SimplifyJobs New Grad`);
    return jobs;
  } catch (error) {
    console.error('[JobAggregator] Error fetching SimplifyJobs New Grad:', error.message);
    return [];
  }
};

/**
 * Fetch jobs from RemoteOK API (free, legal)
 */
const fetchRemoteOK = async () => {
  try {
    const response = await fetch('https://remoteok.com/api', {
      headers: {
        'User-Agent': 'JobLeap/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    // First item is legal notice, skip it
    const jobsData = Array.isArray(data) ? data.slice(1) : [];

    const jobs = jobsData
      .filter(job => job.position && job.company)
      .map(job => ({
        _id: `remoteok_${job.id || job.slug}`,
        title: job.position || 'Remote Position',
        company: job.company || 'Unknown Company',
        location: job.location || 'Remote',
        salary: job.salary_min && job.salary_max
          ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
          : '',
        jobType: 'Full-time',
        description: job.description || '',
        tags: Array.isArray(job.tags) ? job.tags : [],
        logo: job.company_logo || job.logo || '',
        url: job.url || job.apply_url || `https://remoteok.com/l/${job.slug}`,
        postedAt: job.date ? new Date(job.date) : new Date(),
        updatedAt: new Date(),
        source: 'remoteok',
        active: true
      }));

    console.log(`[JobAggregator] Fetched ${jobs.length} jobs from RemoteOK`);
    return jobs;
  } catch (error) {
    console.error('[JobAggregator] Error fetching RemoteOK:', error.message);
    return [];
  }
};

/**
 * Parse jobs from speedyapply markdown (fallback parser)
 * Note: This parses the README markdown tables
 */
const fetchSpeedyApplyJobs = async () => {
  try {
    // Fetch the main README which contains USA internships
    const response = await fetch(
      'https://raw.githubusercontent.com/speedyapply/2026-SWE-College-Jobs/main/README.md',
      { headers: { 'User-Agent': 'JobLeap/1.0' } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const markdown = await response.text();
    const jobs = parseMarkdownTable(markdown, 'speedyapply');

    console.log(`[JobAggregator] Fetched ${jobs.length} jobs from SpeedyApply`);
    return jobs;
  } catch (error) {
    console.error('[JobAggregator] Error fetching SpeedyApply:', error.message);
    return [];
  }
};

/**
 * Parse markdown table to extract jobs (handles HTML in markdown)
 * Table structure: | Company | Position | Location | Salary | Apply Link | Age |
 */
const parseMarkdownTable = (markdown, source) => {
  const jobs = [];

  // Split by lines and find table rows
  const lines = markdown.split('\n');

  for (const line of lines) {
    // Skip if not a table row or is header/separator
    if (!line.startsWith('|') || line.includes('---') || line.includes('Company') || line.includes('Position')) {
      continue;
    }

    // Split by | and clean up
    const cells = line.split('|').map(c => c.trim()).filter(c => c);

    if (cells.length < 5) continue;

    // Extract company name from first cell (has company homepage link)
    let company = cells[0];
    const companyMatch = company.match(/\*\*([^*]+)\*\*/) || // **Company**
                         company.match(/>([^<]+)<\/strong/) || // >Company</strong
                         company.match(/\[([^\]]+)\]/); // [Company]
    if (companyMatch) company = companyMatch[1];
    company = company.replace(/<[^>]+>/g, '').trim();

    // Extract position from second cell
    let position = cells[1];
    position = position.replace(/<[^>]+>/g, '').replace(/\*\*/g, '').trim();

    // Extract location from third cell
    let location = cells[2];
    location = location.replace(/<[^>]+>/g, '').trim();

    // Extract salary from fourth cell
    let salary = cells[3] || '';
    salary = salary.replace(/<[^>]+>/g, '').trim();

    // Extract APPLY URL from fifth cell (this is the job posting link, not company homepage)
    let url = '';
    const applyCell = cells[4] || '';
    const applyUrlMatch = applyCell.match(/href="([^"]+)"/);
    if (applyUrlMatch) {
      url = applyUrlMatch[1];
    }

    // Skip if URL is just an image or missing
    if (!url || url.includes('imgur.com')) {
      // Try to find any other URL in the apply cell
      const altUrlMatch = applyCell.match(/https?:\/\/[^\s"<>]+/);
      if (altUrlMatch) url = altUrlMatch[0];
    }

    // Validate we have meaningful data
    if (company && position && url &&
        company.length > 1 && position.length > 1 &&
        !company.startsWith('$') && !position.startsWith('$') &&
        !company.includes('img src') &&
        !url.includes('imgur.com')) {
      jobs.push({
        _id: `${source}_${Buffer.from(company + position).toString('base64').slice(0, 12)}`,
        title: position,
        company: company,
        location: location || 'USA',
        salary: salary.startsWith('$') ? salary : '',
        jobType: position.toLowerCase().includes('intern') ? 'Internship' : 'Full-time',
        description: `${position} at ${company}`,
        tags: position.toLowerCase().includes('intern') ? ['internship'] : ['full-time'],
        logo: '',
        url: url,
        postedAt: new Date(),
        updatedAt: new Date(),
        source: source,
        active: !line.toLowerCase().includes('closed')
      });
    }
  }

  return jobs.filter(job => job.active);
};

/**
 * Deduplicate jobs based on company + title + fuzzy matching
 */
const deduplicateJobs = (jobs) => {
  const seen = new Map();
  const deduplicated = [];

  for (const job of jobs) {
    const key = generateJobKey(job);

    if (!seen.has(key)) {
      // Check for fuzzy matches
      let isDuplicate = false;

      for (const [existingKey, existingJob] of seen) {
        const sameCompany = normalizeCompanyName(job.company) === normalizeCompanyName(existingJob.company);
        const titleSimilarity = calculateSimilarity(job.title, existingJob.title);

        if (sameCompany && titleSimilarity > 0.85) {
          isDuplicate = true;
          // Merge locations if different
          if (job.location && !existingJob.location.includes(job.location)) {
            existingJob.location = `${existingJob.location}, ${job.location}`;
          }
          break;
        }
      }

      if (!isDuplicate) {
        seen.set(key, job);
        deduplicated.push(job);
      }
    } else {
      // Same key - merge locations if different
      const existing = seen.get(key);
      if (job.location && !existing.location.includes(job.location)) {
        existing.location = `${existing.location}, ${job.location}`;
      }
    }
  }

  return deduplicated;
};

/**
 * Main function to fetch and aggregate all jobs
 */
const fetchAllJobs = async (forceRefresh = false) => {
  const now = Date.now();

  // Return cached jobs if still valid and not forcing refresh
  if (!forceRefresh &&
      aggregatedJobsCache.jobs.length > 0 &&
      (now - aggregatedJobsCache.lastFetch) < API_CACHE_DURATION) {
    console.log(`[JobAggregator] Returning ${aggregatedJobsCache.jobs.length} cached jobs`);
    return aggregatedJobsCache.jobs;
  }

  // If already loading, wait for that to complete
  if (initialFetchPromise && !forceRefresh) {
    console.log('[JobAggregator] Waiting for ongoing fetch...');
    return initialFetchPromise;
  }

  // Mark as loading
  aggregatedJobsCache.isLoading = true;
  console.log('[JobAggregator] Fetching fresh jobs from all sources...');

  // Fetch from all sources in parallel
  const [
    simplifyInternships,
    simplifyNewGrad,
    remoteOKJobs,
    speedyApplyJobs
  ] = await Promise.all([
    fetchSimplifyInternships(),
    fetchSimplifyNewGrad(),
    fetchRemoteOK(),
    fetchSpeedyApplyJobs()
  ]);

  // Combine all jobs
  const allJobs = [
    ...simplifyInternships,
    ...simplifyNewGrad,
    ...remoteOKJobs,
    ...speedyApplyJobs
  ];

  // Filter out inactive jobs
  const activeJobs = allJobs.filter(job => job.active !== false);

  // Deduplicate
  const deduplicated = deduplicateJobs(activeJobs);

  // Sort by date (newest first)
  deduplicated.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

  // Update cache
  aggregatedJobsCache = {
    jobs: deduplicated,
    lastFetch: now,
    sources: {
      simplify_internships: simplifyInternships.length,
      simplify_newgrad: simplifyNewGrad.length,
      remoteok: remoteOKJobs.length,
      speedyapply: speedyApplyJobs.length,
      total_before_dedup: allJobs.length,
      total_after_dedup: deduplicated.length
    },
    isLoading: false
  };

  // Clear the promise
  initialFetchPromise = null;

  console.log(`[JobAggregator] Aggregated ${deduplicated.length} unique jobs from ${allJobs.length} total`);
  console.log('[JobAggregator] Sources:', aggregatedJobsCache.sources);

  return deduplicated;
};

/**
 * Get cache statistics
 */
const getCacheStats = () => {
  return {
    totalJobs: aggregatedJobsCache.jobs.length,
    lastFetch: aggregatedJobsCache.lastFetch
      ? new Date(aggregatedJobsCache.lastFetch).toISOString()
      : null,
    sources: aggregatedJobsCache.sources,
    cacheAge: aggregatedJobsCache.lastFetch
      ? Math.round((Date.now() - aggregatedJobsCache.lastFetch) / 1000 / 60) + ' minutes'
      : 'Not fetched yet'
  };
};

/**
 * Clear cache (useful for manual refresh)
 */
const clearCache = () => {
  aggregatedJobsCache = {
    jobs: [],
    lastFetch: 0,
    sources: {},
    isLoading: false
  };
  initialFetchPromise = null;
  console.log('[JobAggregator] Cache cleared');
};

/**
 * Pre-fetch jobs in background (call on server startup)
 */
const prefetchJobs = () => {
  console.log('[JobAggregator] Starting background pre-fetch...');
  initialFetchPromise = fetchAllJobs(true).catch(err => {
    console.error('[JobAggregator] Pre-fetch error:', err.message);
    initialFetchPromise = null;
  });
  return initialFetchPromise;
};

/**
 * Check if cache has jobs
 */
const hasCachedJobs = () => {
  return aggregatedJobsCache.jobs.length > 0;
};

/**
 * Get cached jobs immediately (without fetching)
 */
const getCachedJobs = () => {
  return aggregatedJobsCache.jobs;
};

module.exports = {
  fetchAllJobs,
  getCacheStats,
  clearCache,
  prefetchJobs,
  hasCachedJobs,
  getCachedJobs,
  // Export individual fetchers for testing
  fetchSimplifyInternships,
  fetchSimplifyNewGrad,
  fetchRemoteOK,
  fetchSpeedyApplyJobs
};
