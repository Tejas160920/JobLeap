const h1bSponsors = require('../data/h1bSponsors');

// Get all H1B sponsors with search and filters
exports.getSponsors = async (req, res) => {
  try {
    const {
      search,
      industry,
      state,
      sortBy = 'totalLCAs',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
      minSalary,
      maxSalary
    } = req.query;

    let filtered = [...h1bSponsors];

    // Search by company name
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by industry
    if (industry) {
      filtered = filtered.filter(company =>
        company.industry.toLowerCase() === industry.toLowerCase()
      );
    }

    // Filter by state
    if (state) {
      filtered = filtered.filter(company =>
        company.headquarters.state.toLowerCase() === state.toLowerCase() ||
        company.topLocations.some(loc => loc.state.toLowerCase() === state.toLowerCase())
      );
    }

    // Filter by salary range
    if (minSalary) {
      filtered = filtered.filter(company => company.avgSalary >= parseInt(minSalary));
    }
    if (maxSalary) {
      filtered = filtered.filter(company => company.avgSalary <= parseInt(maxSalary));
    }

    // Sort
    const validSortFields = ['totalLCAs', 'avgSalary', 'approvalRate', 'name'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'totalLCAs';

    filtered.sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return sortOrder === 'asc'
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    });

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedResults = filtered.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedResults,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filtered.length / parseInt(limit)),
        totalResults: filtered.length,
        hasMore: endIndex < filtered.length
      }
    });
  } catch (error) {
    console.error('Error fetching H1B sponsors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch H1B sponsors'
    });
  }
};

// Get single company details
exports.getCompanyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const company = h1bSponsors.find(c => c.slug === slug);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch company details'
    });
  }
};

// Get H1B statistics overview
exports.getStats = async (req, res) => {
  try {
    const totalCompanies = h1bSponsors.length;
    const totalLCAs = h1bSponsors.reduce((sum, c) => sum + c.totalLCAs, 0);
    const totalApproved = h1bSponsors.reduce((sum, c) => sum + c.approvedLCAs, 0);
    const avgSalary = Math.round(
      h1bSponsors.reduce((sum, c) => sum + c.avgSalary, 0) / totalCompanies
    );

    // Top companies by LCAs
    const topByLCAs = [...h1bSponsors]
      .sort((a, b) => b.totalLCAs - a.totalLCAs)
      .slice(0, 10)
      .map(c => ({
        name: c.name,
        slug: c.slug,
        totalLCAs: c.totalLCAs,
        avgSalary: c.avgSalary
      }));

    // Top companies by salary
    const topBySalary = [...h1bSponsors]
      .sort((a, b) => b.avgSalary - a.avgSalary)
      .slice(0, 10)
      .map(c => ({
        name: c.name,
        slug: c.slug,
        avgSalary: c.avgSalary,
        totalLCAs: c.totalLCAs
      }));

    // Industry breakdown
    const industryStats = {};
    h1bSponsors.forEach(company => {
      if (!industryStats[company.industry]) {
        industryStats[company.industry] = {
          count: 0,
          totalLCAs: 0,
          avgSalary: 0
        };
      }
      industryStats[company.industry].count++;
      industryStats[company.industry].totalLCAs += company.totalLCAs;
      industryStats[company.industry].avgSalary += company.avgSalary;
    });

    // Calculate average salary per industry
    Object.keys(industryStats).forEach(industry => {
      industryStats[industry].avgSalary = Math.round(
        industryStats[industry].avgSalary / industryStats[industry].count
      );
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalCompanies,
          totalLCAs,
          totalApproved,
          overallApprovalRate: ((totalApproved / totalLCAs) * 100).toFixed(1),
          avgSalary
        },
        topByLCAs,
        topBySalary,
        industryStats
      }
    });
  } catch (error) {
    console.error('Error fetching H1B stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch H1B statistics'
    });
  }
};

// Search salaries by job title across companies
exports.searchSalaries = async (req, res) => {
  try {
    const { title, location } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required'
      });
    }

    const titleLower = title.toLowerCase();
    const results = [];

    h1bSponsors.forEach(company => {
      company.topJobTitles.forEach(job => {
        if (job.title.toLowerCase().includes(titleLower)) {
          results.push({
            company: company.name,
            companySlug: company.slug,
            industry: company.industry,
            jobTitle: job.title,
            avgSalary: job.avgSalary,
            openings: job.count,
            headquarters: company.headquarters
          });
        }
      });
    });

    // Filter by location if provided
    let filtered = results;
    if (location) {
      const locationLower = location.toLowerCase();
      filtered = results.filter(r =>
        r.headquarters.city.toLowerCase().includes(locationLower) ||
        r.headquarters.state.toLowerCase().includes(locationLower)
      );
    }

    // Sort by salary descending
    filtered.sort((a, b) => b.avgSalary - a.avgSalary);

    // Calculate stats
    const salaries = filtered.map(r => r.avgSalary);
    const stats = salaries.length > 0 ? {
      min: Math.min(...salaries),
      max: Math.max(...salaries),
      avg: Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length),
      median: salaries.sort((a, b) => a - b)[Math.floor(salaries.length / 2)]
    } : null;

    res.json({
      success: true,
      data: filtered,
      stats,
      totalResults: filtered.length
    });
  } catch (error) {
    console.error('Error searching salaries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search salaries'
    });
  }
};

// Get list of H1B sponsor company names (for job matching)
exports.getSponsorNames = async (req, res) => {
  try {
    const names = h1bSponsors.map(c => ({
      name: c.name,
      slug: c.slug,
      variations: [
        c.name.toLowerCase(),
        c.name.split(' ')[0].toLowerCase(),
        c.slug
      ]
    }));

    res.json({
      success: true,
      data: names
    });
  } catch (error) {
    console.error('Error fetching sponsor names:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sponsor names'
    });
  }
};
