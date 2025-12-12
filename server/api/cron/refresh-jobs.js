const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGO_URI);
};

// H1B sponsors data for visa check
const h1bSponsors = require("../../data/h1bSponsors");

// Helper function to check if a company sponsors H1B visas
const checkVisaSponsorship = (companyName) => {
  if (!companyName) return { sponsors: false, sponsorData: null };

  const companyLower = companyName.toLowerCase().trim();

  const sponsor = h1bSponsors.find(s => {
    const sponsorLower = s.name.toLowerCase();
    return sponsorLower.includes(companyLower) ||
           companyLower.includes(sponsorLower) ||
           sponsorLower.split(' ')[0] === companyLower.split(' ')[0] ||
           companyLower.includes(sponsorLower.replace(/,?\s*(inc|llc|corp|ltd|co)\.?$/i, '').trim()) ||
           sponsorLower.includes(companyLower.replace(/,?\s*(inc|llc|corp|ltd|co)\.?$/i, '').trim());
  });

  if (sponsor) {
    return {
      sponsors: true,
      sponsorData: {
        name: sponsor.name,
        totalLCAs: sponsor.totalLCAs,
        approvalRate: sponsor.approvalRate,
        avgSalary: sponsor.avgSalary
      }
    };
  }

  return { sponsors: false, sponsorData: null };
};

// Fetch with timeout helper
const fetchWithTimeout = async (url, options = {}, timeout = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Fetch from SimplifyJobs Internships
const fetchSimplifyInternships = async () => {
  try {
    console.log('[RefreshJobs] Fetching SimplifyJobs Internships...');
    const response = await fetchWithTimeout(
      'https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/.github/scripts/listings.json',
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jobs = await response.json();

    return jobs.slice(0, 2000).map(job => ({
      externalId: `simplify_${job.id || job.url || Math.random().toString(36).substr(2, 9)}`,
      title: job.title || 'Software Engineering Intern',
      company: job.company_name || 'Unknown Company',
      location: Array.isArray(job.locations) ? job.locations.join(', ') : (job.locations || 'Remote'),
      jobType: 'Internship',
      description: job.description || '',
      url: job.url || '',
      sponsorship: job.sponsorship || '',
      tags: job.terms || [],
      postedAt: job.date_posted ? new Date(job.date_posted * 1000) : new Date(),
      source: 'simplify'
    }));
  } catch (error) {
    console.error('[RefreshJobs] SimplifyJobs Internships error:', error.message);
    return [];
  }
};

// Fetch from SimplifyJobs New Grad
const fetchSimplifyNewGrad = async () => {
  try {
    console.log('[RefreshJobs] Fetching SimplifyJobs New Grad...');
    const response = await fetchWithTimeout(
      'https://raw.githubusercontent.com/SimplifyJobs/New-Grad-Positions/dev/.github/scripts/listings.json',
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jobs = await response.json();

    return jobs.slice(0, 2000).map(job => ({
      externalId: `simplify_ng_${job.id || job.url || Math.random().toString(36).substr(2, 9)}`,
      title: job.title || 'Software Engineer',
      company: job.company_name || 'Unknown Company',
      location: Array.isArray(job.locations) ? job.locations.join(', ') : (job.locations || 'Remote'),
      jobType: 'Full-time',
      description: job.description || '',
      url: job.url || '',
      sponsorship: job.sponsorship || '',
      tags: job.terms || [],
      postedAt: job.date_posted ? new Date(job.date_posted * 1000) : new Date(),
      source: 'simplify'
    }));
  } catch (error) {
    console.error('[RefreshJobs] SimplifyJobs New Grad error:', error.message);
    return [];
  }
};

// Fetch from SpeedyApply Internships
const fetchSpeedyApplyInternships = async () => {
  try {
    console.log('[RefreshJobs] Fetching SpeedyApply Internships...');
    const response = await fetchWithTimeout(
      'https://raw.githubusercontent.com/speedyapply/2025-SWE-College-Jobs/main/internships.json',
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jobs = await response.json();

    return jobs.slice(0, 1000).map(job => ({
      externalId: `speedy_int_${job.id || job.url || Math.random().toString(36).substr(2, 9)}`,
      title: job.title || 'Software Engineering Intern',
      company: job.company || 'Unknown Company',
      location: job.location || 'Remote',
      jobType: 'Internship',
      description: job.description || '',
      url: job.url || job.link || '',
      tags: job.tags || [],
      postedAt: job.posted_date ? new Date(job.posted_date) : new Date(),
      source: 'speedyapply'
    }));
  } catch (error) {
    console.error('[RefreshJobs] SpeedyApply Internships error:', error.message);
    return [];
  }
};

// Fetch from SpeedyApply New Grad
const fetchSpeedyApplyNewGrad = async () => {
  try {
    console.log('[RefreshJobs] Fetching SpeedyApply New Grad...');
    const response = await fetchWithTimeout(
      'https://raw.githubusercontent.com/speedyapply/2025-SWE-College-Jobs/main/new_grad.json',
      { headers: { 'Accept': 'application/json' } }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jobs = await response.json();

    return jobs.slice(0, 1000).map(job => ({
      externalId: `speedy_ng_${job.id || job.url || Math.random().toString(36).substr(2, 9)}`,
      title: job.title || 'Software Engineer',
      company: job.company || 'Unknown Company',
      location: job.location || 'Remote',
      jobType: 'Full-time',
      description: job.description || '',
      url: job.url || job.link || '',
      tags: job.tags || [],
      postedAt: job.posted_date ? new Date(job.posted_date) : new Date(),
      source: 'speedyapply'
    }));
  } catch (error) {
    console.error('[RefreshJobs] SpeedyApply New Grad error:', error.message);
    return [];
  }
};

// Fetch from RemoteOK
const fetchRemoteOK = async () => {
  try {
    console.log('[RefreshJobs] Fetching RemoteOK...');
    const response = await fetchWithTimeout(
      'https://remoteok.com/api',
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'JobLeap/1.0'
        }
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const jobs = Array.isArray(data) ? data.filter(item => item.id) : [];

    return jobs.slice(0, 500).map(job => ({
      externalId: `remoteok_${job.id}`,
      title: job.position || 'Remote Position',
      company: job.company || 'Unknown Company',
      location: job.location || 'Remote',
      salary: job.salary || '',
      jobType: 'Remote',
      description: job.description || '',
      url: job.url || `https://remoteok.com/l/${job.id}`,
      logo: job.company_logo || job.logo || '',
      tags: job.tags || [],
      postedAt: job.date ? new Date(job.date) : new Date(),
      source: 'remoteok'
    }));
  } catch (error) {
    console.error('[RefreshJobs] RemoteOK error:', error.message);
    return [];
  }
};

module.exports = async (req, res) => {
  const startTime = Date.now();

  try {
    await connectDB();
    const Job = require("../../models/job");

    console.log('[RefreshJobs] Starting job refresh...');

    // Fetch from all sources in parallel
    const [
      simplifyInternships,
      simplifyNewGrad,
      speedyInternships,
      speedyNewGrad,
      remoteOKJobs
    ] = await Promise.all([
      fetchSimplifyInternships(),
      fetchSimplifyNewGrad(),
      fetchSpeedyApplyInternships(),
      fetchSpeedyApplyNewGrad(),
      fetchRemoteOK()
    ]);

    const allJobs = [
      ...simplifyInternships,
      ...simplifyNewGrad,
      ...speedyInternships,
      ...speedyNewGrad,
      ...remoteOKJobs
    ];

    console.log(`[RefreshJobs] Fetched ${allJobs.length} jobs from all sources`);

    // Add visa sponsorship data
    const jobsWithVisa = allJobs.map(job => {
      const visaInfo = checkVisaSponsorship(job.company);

      let sponsorsVisa = visaInfo.sponsors;
      if (job.sponsorship === 'Offers Sponsorship') {
        sponsorsVisa = true;
      } else if (job.sponsorship === 'U.S. Citizenship Required' || job.sponsorship === 'Does Not Offer Sponsorship') {
        sponsorsVisa = false;
      }

      return {
        ...job,
        sponsorsVisa,
        sponsorData: visaInfo.sponsorData,
        status: 'active',
        lastSeenAt: new Date()
      };
    });

    // Upsert jobs into MongoDB (bulk operation for speed)
    // Always update postedAt from source data, don't preserve old dates
    const bulkOps = jobsWithVisa.map(job => ({
      updateOne: {
        filter: { externalId: job.externalId },
        update: {
          $set: {
            ...job,
            postedAt: job.postedAt // Ensure postedAt is always updated from source
          }
        },
        upsert: true
      }
    }));

    let result = { upsertedCount: 0, modifiedCount: 0 };
    if (bulkOps.length > 0) {
      // Process in batches of 500 to avoid timeout
      const batchSize = 500;
      for (let i = 0; i < bulkOps.length; i += batchSize) {
        const batch = bulkOps.slice(i, i + batchSize);
        const batchResult = await Job.bulkWrite(batch, { ordered: false });
        result.upsertedCount += batchResult.upsertedCount || 0;
        result.modifiedCount += batchResult.modifiedCount || 0;
      }
    }

    // Mark old jobs as expired (not seen in the last 2 hours)
    // This ensures only freshly refreshed jobs remain active
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const expiredResult = await Job.updateMany(
      {
        source: { $ne: 'local' },
        lastSeenAt: { $lt: twoHoursAgo },
        status: 'active'
      },
      { $set: { status: 'expired' } }
    );

    const duration = Date.now() - startTime;

    console.log(`[RefreshJobs] Completed in ${duration}ms`);
    console.log(`[RefreshJobs] New: ${result.upsertedCount}, Updated: ${result.modifiedCount}, Expired: ${expiredResult.modifiedCount}`);

    res.status(200).json({
      success: true,
      message: 'Jobs refreshed successfully',
      stats: {
        fetched: allJobs.length,
        new: result.upsertedCount,
        updated: result.modifiedCount,
        expired: expiredResult.modifiedCount,
        duration: `${duration}ms`,
        sources: {
          simplifyInternships: simplifyInternships.length,
          simplifyNewGrad: simplifyNewGrad.length,
          speedyInternships: speedyInternships.length,
          speedyNewGrad: speedyNewGrad.length,
          remoteOK: remoteOKJobs.length
        }
      }
    });
  } catch (error) {
    console.error('[RefreshJobs] Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
