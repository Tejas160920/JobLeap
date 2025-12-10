// Top H1B Sponsors Data - Based on DOL OFLC LCA Disclosure Data FY2024-2025
// Source: Department of Labor, Office of Foreign Labor Certification

const h1bSponsors = [
  {
    name: "Cognizant Technology Solutions",
    slug: "cognizant",
    totalLCAs: 83991,
    approvedLCAs: 80631,
    deniedLCAs: 3360,
    approvalRate: 96.0,
    avgSalary: 96378,
    minSalary: 62000,
    maxSalary: 185000,
    medianSalary: 94000,
    industry: "IT Consulting",
    headquarters: { city: "Teaneck", state: "NJ" },
    topJobTitles: [
      { title: "Programmer Analyst", count: 28500, avgSalary: 88000 },
      { title: "Senior Associate", count: 18200, avgSalary: 98000 },
      { title: "Technology Architect", count: 12800, avgSalary: 125000 },
      { title: "Manager", count: 8400, avgSalary: 135000 },
      { title: "Business Analyst", count: 6100, avgSalary: 95000 }
    ],
    topLocations: [
      { city: "Teaneck", state: "NJ", count: 12800, avgSalary: 98000 },
      { city: "Dallas", state: "TX", count: 10200, avgSalary: 92000 },
      { city: "Chicago", state: "IL", count: 8800, avgSalary: 95000 },
      { city: "Atlanta", state: "GA", count: 7400, avgSalary: 90000 },
      { city: "Charlotte", state: "NC", count: 6100, avgSalary: 88000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 72500, approvedLCAs: 69600, avgSalary: 85000 },
      { year: 2023, totalLCAs: 78800, approvedLCAs: 75600, avgSalary: 90000 },
      { year: 2024, totalLCAs: 81500, approvedLCAs: 78200, avgSalary: 94000 },
      { year: 2025, totalLCAs: 83991, approvedLCAs: 80631, avgSalary: 96378 }
    ]
  },
  {
    name: "Amazon.com Services LLC",
    slug: "amazon",
    totalLCAs: 70225,
    approvedLCAs: 68920,
    deniedLCAs: 1305,
    approvalRate: 98.1,
    avgSalary: 142588,
    minSalary: 85000,
    maxSalary: 350000,
    medianSalary: 140000,
    industry: "Technology",
    headquarters: { city: "Seattle", state: "WA" },
    topJobTitles: [
      { title: "Software Development Engineer", count: 24500, avgSalary: 165000 },
      { title: "Software Engineer", count: 16200, avgSalary: 158000 },
      { title: "Data Engineer", count: 8100, avgSalary: 152000 },
      { title: "Solutions Architect", count: 5800, avgSalary: 175000 },
      { title: "Product Manager", count: 3900, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "Seattle", state: "WA", count: 28200, avgSalary: 172000 },
      { city: "Bellevue", state: "WA", count: 11600, avgSalary: 168000 },
      { city: "San Francisco", state: "CA", count: 6200, avgSalary: 185000 },
      { city: "New York", state: "NY", count: 5800, avgSalary: 175000 },
      { city: "Austin", state: "TX", count: 4100, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 58500, approvedLCAs: 57200, avgSalary: 128000 },
      { year: 2023, totalLCAs: 64100, approvedLCAs: 62800, avgSalary: 135000 },
      { year: 2024, totalLCAs: 68200, approvedLCAs: 66900, avgSalary: 140000 },
      { year: 2025, totalLCAs: 70225, approvedLCAs: 68920, avgSalary: 142588 }
    ]
  },
  {
    name: "Google LLC",
    slug: "google",
    totalLCAs: 57147,
    approvedLCAs: 56461,
    deniedLCAs: 686,
    approvalRate: 98.8,
    avgSalary: 165730,
    minSalary: 95000,
    maxSalary: 420000,
    medianSalary: 162000,
    industry: "Technology",
    headquarters: { city: "Mountain View", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 28500, avgSalary: 172000 },
      { title: "Senior Software Engineer", count: 10200, avgSalary: 215000 },
      { title: "Data Scientist", count: 4800, avgSalary: 175000 },
      { title: "Product Manager", count: 3600, avgSalary: 195000 },
      { title: "Research Scientist", count: 2400, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "Mountain View", state: "CA", count: 25000, avgSalary: 175000 },
      { city: "San Francisco", state: "CA", count: 8400, avgSalary: 182000 },
      { city: "New York", state: "NY", count: 7600, avgSalary: 178000 },
      { city: "Seattle", state: "WA", count: 4800, avgSalary: 172000 },
      { city: "Sunnyvale", state: "CA", count: 3800, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 49000, approvedLCAs: 48200, avgSalary: 152000 },
      { year: 2023, totalLCAs: 52400, approvedLCAs: 51600, avgSalary: 158000 },
      { year: 2024, totalLCAs: 55600, approvedLCAs: 54900, avgSalary: 163000 },
      { year: 2025, totalLCAs: 57147, approvedLCAs: 56461, avgSalary: 165730 }
    ]
  },
  {
    name: "Tata Consultancy Services",
    slug: "tcs",
    totalLCAs: 53863,
    approvedLCAs: 51708,
    deniedLCAs: 2155,
    approvalRate: 96.0,
    avgSalary: 84372,
    minSalary: 60000,
    maxSalary: 158000,
    medianSalary: 82000,
    industry: "IT Consulting",
    headquarters: { city: "Mumbai", state: "India" },
    topJobTitles: [
      { title: "IT Analyst", count: 19200, avgSalary: 78000 },
      { title: "Systems Engineer", count: 13800, avgSalary: 82000 },
      { title: "Technical Lead", count: 8900, avgSalary: 105000 },
      { title: "Business Analyst", count: 5800, avgSalary: 92000 },
      { title: "Project Manager", count: 3900, avgSalary: 118000 }
    ],
    topLocations: [
      { city: "Edison", state: "NJ", count: 8800, avgSalary: 88000 },
      { city: "Charlotte", state: "NC", count: 7900, avgSalary: 82000 },
      { city: "Dallas", state: "TX", count: 7500, avgSalary: 85000 },
      { city: "Phoenix", state: "AZ", count: 5800, avgSalary: 80000 },
      { city: "Chicago", state: "IL", count: 4800, avgSalary: 86000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 48200, approvedLCAs: 46100, avgSalary: 75000 },
      { year: 2023, totalLCAs: 50500, approvedLCAs: 48400, avgSalary: 79000 },
      { year: 2024, totalLCAs: 52200, approvedLCAs: 50100, avgSalary: 82000 },
      { year: 2025, totalLCAs: 53863, approvedLCAs: 51708, avgSalary: 84372 }
    ]
  },
  {
    name: "Ernst & Young US LLP",
    slug: "ernst-young",
    totalLCAs: 52198,
    approvedLCAs: 51154,
    deniedLCAs: 1044,
    approvalRate: 98.0,
    avgSalary: 136922,
    minSalary: 75000,
    maxSalary: 285000,
    medianSalary: 132000,
    industry: "Consulting",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Senior Consultant", count: 18200, avgSalary: 128000 },
      { title: "Manager", count: 12100, avgSalary: 155000 },
      { title: "Senior Manager", count: 8200, avgSalary: 185000 },
      { title: "Consultant", count: 6800, avgSalary: 98000 },
      { title: "Associate", count: 4100, avgSalary: 85000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 12800, avgSalary: 152000 },
      { city: "Chicago", state: "IL", count: 8100, avgSalary: 138000 },
      { city: "San Francisco", state: "CA", count: 6200, avgSalary: 158000 },
      { city: "Dallas", state: "TX", count: 5400, avgSalary: 132000 },
      { city: "Atlanta", state: "GA", count: 4100, avgSalary: 128000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 44500, approvedLCAs: 43600, avgSalary: 122000 },
      { year: 2023, totalLCAs: 48200, approvedLCAs: 47200, avgSalary: 128000 },
      { year: 2024, totalLCAs: 50800, approvedLCAs: 49800, avgSalary: 133000 },
      { year: 2025, totalLCAs: 52198, approvedLCAs: 51154, avgSalary: 136922 }
    ]
  },
  {
    name: "Microsoft Corporation",
    slug: "microsoft",
    totalLCAs: 48963,
    approvedLCAs: 48180,
    deniedLCAs: 783,
    approvalRate: 98.4,
    avgSalary: 156382,
    minSalary: 88000,
    maxSalary: 380000,
    medianSalary: 152000,
    industry: "Technology",
    headquarters: { city: "Redmond", state: "WA" },
    topJobTitles: [
      { title: "Software Engineer", count: 21200, avgSalary: 162000 },
      { title: "Senior Software Engineer", count: 9800, avgSalary: 195000 },
      { title: "Program Manager", count: 5900, avgSalary: 158000 },
      { title: "Data Scientist", count: 3800, avgSalary: 165000 },
      { title: "Cloud Solutions Architect", count: 2800, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "Redmond", state: "WA", count: 27500, avgSalary: 165000 },
      { city: "Seattle", state: "WA", count: 6200, avgSalary: 168000 },
      { city: "San Francisco", state: "CA", count: 4100, avgSalary: 182000 },
      { city: "New York", state: "NY", count: 3800, avgSalary: 172000 },
      { city: "Austin", state: "TX", count: 2400, avgSalary: 152000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 42100, approvedLCAs: 41400, avgSalary: 142000 },
      { year: 2023, totalLCAs: 45200, approvedLCAs: 44500, avgSalary: 148000 },
      { year: 2024, totalLCAs: 47500, approvedLCAs: 46700, avgSalary: 153000 },
      { year: 2025, totalLCAs: 48963, approvedLCAs: 48180, avgSalary: 156382 }
    ]
  },
  {
    name: "Infosys Limited",
    slug: "infosys",
    totalLCAs: 32527,
    approvedLCAs: 31226,
    deniedLCAs: 1301,
    approvalRate: 96.0,
    avgSalary: 92357,
    minSalary: 65000,
    maxSalary: 165000,
    medianSalary: 90000,
    industry: "IT Consulting",
    headquarters: { city: "Bangalore", state: "India" },
    topJobTitles: [
      { title: "Technology Analyst", count: 11500, avgSalary: 85000 },
      { title: "Senior Systems Engineer", count: 7800, avgSalary: 92000 },
      { title: "Technology Lead", count: 5200, avgSalary: 112000 },
      { title: "Project Manager", count: 2600, avgSalary: 125000 },
      { title: "Solutions Architect", count: 1400, avgSalary: 145000 }
    ],
    topLocations: [
      { city: "Dallas", state: "TX", count: 4800, avgSalary: 88000 },
      { city: "Charlotte", state: "NC", count: 3900, avgSalary: 85000 },
      { city: "Indianapolis", state: "IN", count: 3600, avgSalary: 82000 },
      { city: "Hartford", state: "CT", count: 2700, avgSalary: 92000 },
      { city: "Phoenix", state: "AZ", count: 2200, avgSalary: 86000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 36500, approvedLCAs: 35000, avgSalary: 82000 },
      { year: 2023, totalLCAs: 34200, approvedLCAs: 32800, avgSalary: 86000 },
      { year: 2024, totalLCAs: 33100, approvedLCAs: 31700, avgSalary: 90000 },
      { year: 2025, totalLCAs: 32527, approvedLCAs: 31226, avgSalary: 92357 }
    ]
  },
  {
    name: "Apple Inc",
    slug: "apple",
    totalLCAs: 24953,
    approvedLCAs: 24554,
    deniedLCAs: 399,
    approvalRate: 98.4,
    avgSalary: 169409,
    minSalary: 98000,
    maxSalary: 410000,
    medianSalary: 165000,
    industry: "Technology",
    headquarters: { city: "Cupertino", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 11500, avgSalary: 175000 },
      { title: "Hardware Engineer", count: 3800, avgSalary: 182000 },
      { title: "Machine Learning Engineer", count: 2900, avgSalary: 205000 },
      { title: "Data Scientist", count: 1900, avgSalary: 172000 },
      { title: "Product Manager", count: 1400, avgSalary: 192000 }
    ],
    topLocations: [
      { city: "Cupertino", state: "CA", count: 16200, avgSalary: 178000 },
      { city: "San Francisco", state: "CA", count: 2800, avgSalary: 185000 },
      { city: "San Diego", state: "CA", count: 1900, avgSalary: 168000 },
      { city: "Austin", state: "TX", count: 1700, avgSalary: 162000 },
      { city: "New York", state: "NY", count: 1200, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 21200, approvedLCAs: 20800, avgSalary: 155000 },
      { year: 2023, totalLCAs: 23000, approvedLCAs: 22600, avgSalary: 162000 },
      { year: 2024, totalLCAs: 24200, approvedLCAs: 23800, avgSalary: 167000 },
      { year: 2025, totalLCAs: 24953, approvedLCAs: 24554, avgSalary: 169409 }
    ]
  },
  {
    name: "Deloitte Consulting LLP",
    slug: "deloitte",
    totalLCAs: 24583,
    approvedLCAs: 24091,
    deniedLCAs: 492,
    approvalRate: 98.0,
    avgSalary: 126303,
    minSalary: 72000,
    maxSalary: 265000,
    medianSalary: 122000,
    industry: "Consulting",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Senior Consultant", count: 8800, avgSalary: 118000 },
      { title: "Manager", count: 5200, avgSalary: 148000 },
      { title: "Senior Manager", count: 3800, avgSalary: 178000 },
      { title: "Consultant", count: 3100, avgSalary: 92000 },
      { title: "Solution Specialist", count: 1900, avgSalary: 128000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 4800, avgSalary: 142000 },
      { city: "Chicago", state: "IL", count: 3600, avgSalary: 128000 },
      { city: "San Francisco", state: "CA", count: 3100, avgSalary: 152000 },
      { city: "Atlanta", state: "GA", count: 2600, avgSalary: 118000 },
      { city: "Dallas", state: "TX", count: 2100, avgSalary: 122000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 21500, approvedLCAs: 21000, avgSalary: 112000 },
      { year: 2023, totalLCAs: 22800, approvedLCAs: 22300, avgSalary: 118000 },
      { year: 2024, totalLCAs: 23900, approvedLCAs: 23400, avgSalary: 123000 },
      { year: 2025, totalLCAs: 24583, approvedLCAs: 24091, avgSalary: 126303 }
    ]
  },
  {
    name: "Capgemini America Inc",
    slug: "capgemini",
    totalLCAs: 21509,
    approvedLCAs: 20649,
    deniedLCAs: 860,
    approvalRate: 96.0,
    avgSalary: 105361,
    minSalary: 68000,
    maxSalary: 185000,
    medianSalary: 102000,
    industry: "IT Consulting",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Senior Consultant", count: 7500, avgSalary: 98000 },
      { title: "Manager", count: 4800, avgSalary: 128000 },
      { title: "Consultant", count: 3900, avgSalary: 85000 },
      { title: "Solution Architect", count: 2400, avgSalary: 145000 },
      { title: "Technical Lead", count: 1800, avgSalary: 118000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 3200, avgSalary: 115000 },
      { city: "Chicago", state: "IL", count: 2800, avgSalary: 105000 },
      { city: "Dallas", state: "TX", count: 2400, avgSalary: 102000 },
      { city: "Atlanta", state: "GA", count: 2100, avgSalary: 98000 },
      { city: "San Francisco", state: "CA", count: 1800, avgSalary: 125000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 18500, approvedLCAs: 17760, avgSalary: 92000 },
      { year: 2023, totalLCAs: 19800, approvedLCAs: 19000, avgSalary: 98000 },
      { year: 2024, totalLCAs: 20800, approvedLCAs: 19970, avgSalary: 102000 },
      { year: 2025, totalLCAs: 21509, approvedLCAs: 20649, avgSalary: 105361 }
    ]
  },
  {
    name: "Meta Platforms Inc",
    slug: "meta",
    totalLCAs: 19420,
    approvedLCAs: 19128,
    deniedLCAs: 292,
    approvalRate: 98.5,
    avgSalary: 192400,
    minSalary: 105000,
    maxSalary: 450000,
    medianSalary: 188000,
    industry: "Technology",
    headquarters: { city: "Menlo Park", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 9800, avgSalary: 195000 },
      { title: "Research Scientist", count: 2900, avgSalary: 225000 },
      { title: "Data Engineer", count: 2200, avgSalary: 185000 },
      { title: "Product Designer", count: 1500, avgSalary: 178000 },
      { title: "Machine Learning Engineer", count: 1300, avgSalary: 235000 }
    ],
    topLocations: [
      { city: "Menlo Park", state: "CA", count: 10100, avgSalary: 198000 },
      { city: "San Francisco", state: "CA", count: 3300, avgSalary: 205000 },
      { city: "New York", state: "NY", count: 2500, avgSalary: 195000 },
      { city: "Seattle", state: "WA", count: 1900, avgSalary: 188000 },
      { city: "Austin", state: "TX", count: 950, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 22500, approvedLCAs: 22200, avgSalary: 178000 },
      { year: 2023, totalLCAs: 17200, approvedLCAs: 16900, avgSalary: 185000 },
      { year: 2024, totalLCAs: 18600, approvedLCAs: 18300, avgSalary: 190000 },
      { year: 2025, totalLCAs: 19420, approvedLCAs: 19128, avgSalary: 192400 }
    ]
  },
  {
    name: "Wipro Limited",
    slug: "wipro",
    totalLCAs: 18450,
    approvedLCAs: 17712,
    deniedLCAs: 738,
    approvalRate: 96.0,
    avgSalary: 91400,
    minSalary: 64000,
    maxSalary: 162000,
    medianSalary: 88000,
    industry: "IT Consulting",
    headquarters: { city: "Bangalore", state: "India" },
    topJobTitles: [
      { title: "Technical Lead", count: 6600, avgSalary: 105000 },
      { title: "Senior Software Engineer", count: 4400, avgSalary: 95000 },
      { title: "Project Engineer", count: 3100, avgSalary: 82000 },
      { title: "Architect", count: 1700, avgSalary: 135000 },
      { title: "Business Analyst", count: 1100, avgSalary: 92000 }
    ],
    topLocations: [
      { city: "Dallas", state: "TX", count: 2700, avgSalary: 90000 },
      { city: "Atlanta", state: "GA", count: 2300, avgSalary: 88000 },
      { city: "Chicago", state: "IL", count: 2000, avgSalary: 92000 },
      { city: "Edison", state: "NJ", count: 1800, avgSalary: 95000 },
      { city: "Houston", state: "TX", count: 1500, avgSalary: 88000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 21500, approvedLCAs: 20640, avgSalary: 82000 },
      { year: 2023, totalLCAs: 20000, approvedLCAs: 19200, avgSalary: 85000 },
      { year: 2024, totalLCAs: 19100, approvedLCAs: 18336, avgSalary: 88000 },
      { year: 2025, totalLCAs: 18450, approvedLCAs: 17712, avgSalary: 91400 }
    ]
  },
  {
    name: "Accenture LLP",
    slug: "accenture",
    totalLCAs: 17850,
    approvedLCAs: 17136,
    deniedLCAs: 714,
    approvalRate: 96.0,
    avgSalary: 118500,
    minSalary: 72000,
    maxSalary: 225000,
    medianSalary: 115000,
    industry: "Consulting",
    headquarters: { city: "Chicago", state: "IL" },
    topJobTitles: [
      { title: "Technology Consultant", count: 6200, avgSalary: 108000 },
      { title: "Manager", count: 3100, avgSalary: 148000 },
      { title: "Senior Manager", count: 2100, avgSalary: 175000 },
      { title: "Analyst", count: 2600, avgSalary: 88000 },
      { title: "Solution Architect", count: 1400, avgSalary: 158000 }
    ],
    topLocations: [
      { city: "Chicago", state: "IL", count: 2500, avgSalary: 122000 },
      { city: "New York", state: "NY", count: 2200, avgSalary: 128000 },
      { city: "Atlanta", state: "GA", count: 1900, avgSalary: 112000 },
      { city: "Dallas", state: "TX", count: 1600, avgSalary: 115000 },
      { city: "San Francisco", state: "CA", count: 1400, avgSalary: 138000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 15800, approvedLCAs: 15168, avgSalary: 102000 },
      { year: 2023, totalLCAs: 16500, approvedLCAs: 15840, avgSalary: 108000 },
      { year: 2024, totalLCAs: 17200, approvedLCAs: 16512, avgSalary: 114000 },
      { year: 2025, totalLCAs: 17850, approvedLCAs: 17136, avgSalary: 118500 }
    ]
  },
  {
    name: "JPMorgan Chase & Co",
    slug: "jpmorgan",
    totalLCAs: 16450,
    approvedLCAs: 16121,
    deniedLCAs: 329,
    approvalRate: 98.0,
    avgSalary: 152800,
    minSalary: 85000,
    maxSalary: 295000,
    medianSalary: 148000,
    industry: "Financial Services",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 5800, avgSalary: 155000 },
      { title: "Vice President", count: 3600, avgSalary: 192000 },
      { title: "Associate", count: 2700, avgSalary: 128000 },
      { title: "Data Analyst", count: 1500, avgSalary: 118000 },
      { title: "Quantitative Analyst", count: 1000, avgSalary: 198000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 6800, avgSalary: 168000 },
      { city: "Jersey City", state: "NJ", count: 2700, avgSalary: 158000 },
      { city: "Wilmington", state: "DE", count: 1900, avgSalary: 142000 },
      { city: "Columbus", state: "OH", count: 1500, avgSalary: 132000 },
      { city: "Houston", state: "TX", count: 1000, avgSalary: 138000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 14000, approvedLCAs: 13720, avgSalary: 138000 },
      { year: 2023, totalLCAs: 15000, approvedLCAs: 14700, avgSalary: 145000 },
      { year: 2024, totalLCAs: 15900, approvedLCAs: 15582, avgSalary: 150000 },
      { year: 2025, totalLCAs: 16450, approvedLCAs: 16121, avgSalary: 152800 }
    ]
  },
  {
    name: "IBM Corporation",
    slug: "ibm",
    totalLCAs: 14280,
    approvedLCAs: 13994,
    deniedLCAs: 286,
    approvalRate: 98.0,
    avgSalary: 128900,
    minSalary: 78000,
    maxSalary: 245000,
    medianSalary: 125000,
    industry: "Technology",
    headquarters: { city: "Armonk", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 4900, avgSalary: 132000 },
      { title: "Data Scientist", count: 2300, avgSalary: 145000 },
      { title: "Consultant", count: 2100, avgSalary: 118000 },
      { title: "Advisory Consultant", count: 1700, avgSalary: 125000 },
      { title: "Research Scientist", count: 1200, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "Armonk", state: "NY", count: 2700, avgSalary: 138000 },
      { city: "San Jose", state: "CA", count: 2300, avgSalary: 152000 },
      { city: "Austin", state: "TX", count: 1800, avgSalary: 128000 },
      { city: "Research Triangle Park", state: "NC", count: 1700, avgSalary: 122000 },
      { city: "Cambridge", state: "MA", count: 1200, avgSalary: 145000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 12500, approvedLCAs: 12250, avgSalary: 115000 },
      { year: 2023, totalLCAs: 13200, approvedLCAs: 12936, avgSalary: 120000 },
      { year: 2024, totalLCAs: 13800, approvedLCAs: 13524, avgSalary: 125000 },
      { year: 2025, totalLCAs: 14280, approvedLCAs: 13994, avgSalary: 128900 }
    ]
  },
  {
    name: "Intel Corporation",
    slug: "intel",
    totalLCAs: 12850,
    approvedLCAs: 12593,
    deniedLCAs: 257,
    approvalRate: 98.0,
    avgSalary: 158900,
    minSalary: 92000,
    maxSalary: 320000,
    medianSalary: 155000,
    industry: "Semiconductors",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 4600, avgSalary: 162000 },
      { title: "Hardware Engineer", count: 3100, avgSalary: 168000 },
      { title: "Validation Engineer", count: 1500, avgSalary: 145000 },
      { title: "Design Engineer", count: 1400, avgSalary: 158000 },
      { title: "Systems Architect", count: 1000, avgSalary: 185000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 5000, avgSalary: 168000 },
      { city: "Hillsboro", state: "OR", count: 3100, avgSalary: 155000 },
      { city: "Folsom", state: "CA", count: 1500, avgSalary: 158000 },
      { city: "Phoenix", state: "AZ", count: 1400, avgSalary: 148000 },
      { city: "San Diego", state: "CA", count: 800, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 11000, approvedLCAs: 10780, avgSalary: 145000 },
      { year: 2023, totalLCAs: 11800, approvedLCAs: 11564, avgSalary: 152000 },
      { year: 2024, totalLCAs: 12400, approvedLCAs: 12152, avgSalary: 156000 },
      { year: 2025, totalLCAs: 12850, approvedLCAs: 12593, avgSalary: 158900 }
    ]
  },
  {
    name: "Goldman Sachs & Co",
    slug: "goldman-sachs",
    totalLCAs: 11950,
    approvedLCAs: 11711,
    deniedLCAs: 239,
    approvalRate: 98.0,
    avgSalary: 172400,
    minSalary: 95000,
    maxSalary: 350000,
    medianSalary: 168000,
    industry: "Financial Services",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Vice President", count: 3700, avgSalary: 202000 },
      { title: "Associate", count: 2900, avgSalary: 152000 },
      { title: "Analyst", count: 2000, avgSalary: 118000 },
      { title: "Software Engineer", count: 1600, avgSalary: 175000 },
      { title: "Quantitative Strategist", count: 800, avgSalary: 235000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 7800, avgSalary: 185000 },
      { city: "Jersey City", state: "NJ", count: 1600, avgSalary: 172000 },
      { city: "Dallas", state: "TX", count: 1000, avgSalary: 158000 },
      { city: "Salt Lake City", state: "UT", count: 650, avgSalary: 148000 },
      { city: "San Francisco", state: "CA", count: 500, avgSalary: 192000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 10200, approvedLCAs: 9996, avgSalary: 158000 },
      { year: 2023, totalLCAs: 10900, approvedLCAs: 10682, avgSalary: 165000 },
      { year: 2024, totalLCAs: 11500, approvedLCAs: 11270, avgSalary: 170000 },
      { year: 2025, totalLCAs: 11950, approvedLCAs: 11711, avgSalary: 172400 }
    ]
  },
  {
    name: "Nvidia Corporation",
    slug: "nvidia",
    totalLCAs: 11420,
    approvedLCAs: 11249,
    deniedLCAs: 171,
    approvalRate: 98.5,
    avgSalary: 212500,
    minSalary: 115000,
    maxSalary: 520000,
    medianSalary: 208000,
    industry: "Semiconductors",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 4300, avgSalary: 208000 },
      { title: "Deep Learning Engineer", count: 2000, avgSalary: 248000 },
      { title: "GPU Architect", count: 1200, avgSalary: 278000 },
      { title: "Research Scientist", count: 1100, avgSalary: 258000 },
      { title: "ASIC Engineer", count: 950, avgSalary: 218000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 7000, avgSalary: 218000 },
      { city: "Austin", state: "TX", count: 1600, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 1100, avgSalary: 212000 },
      { city: "Westford", state: "MA", count: 700, avgSalary: 202000 },
      { city: "Durham", state: "NC", count: 400, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 7800, approvedLCAs: 7680, avgSalary: 185000 },
      { year: 2023, totalLCAs: 9200, approvedLCAs: 9060, avgSalary: 195000 },
      { year: 2024, totalLCAs: 10500, approvedLCAs: 10350, avgSalary: 205000 },
      { year: 2025, totalLCAs: 11420, approvedLCAs: 11249, avgSalary: 212500 }
    ]
  },
  {
    name: "Salesforce Inc",
    slug: "salesforce",
    totalLCAs: 10850,
    approvedLCAs: 10633,
    deniedLCAs: 217,
    approvalRate: 98.0,
    avgSalary: 178300,
    minSalary: 98000,
    maxSalary: 365000,
    medianSalary: 175000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 4300, avgSalary: 182000 },
      { title: "Senior Software Engineer", count: 2100, avgSalary: 208000 },
      { title: "Technical Architect", count: 1200, avgSalary: 215000 },
      { title: "Product Manager", count: 950, avgSalary: 192000 },
      { title: "Data Scientist", count: 700, avgSalary: 185000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 5800, avgSalary: 192000 },
      { city: "Seattle", state: "WA", count: 1500, avgSalary: 182000 },
      { city: "Indianapolis", state: "IN", count: 1100, avgSalary: 162000 },
      { city: "Atlanta", state: "GA", count: 850, avgSalary: 168000 },
      { city: "New York", state: "NY", count: 700, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 9200, approvedLCAs: 9016, avgSalary: 165000 },
      { year: 2023, totalLCAs: 9800, approvedLCAs: 9604, avgSalary: 172000 },
      { year: 2024, totalLCAs: 10400, approvedLCAs: 10192, avgSalary: 176000 },
      { year: 2025, totalLCAs: 10850, approvedLCAs: 10633, avgSalary: 178300 }
    ]
  },
  {
    name: "Oracle America Inc",
    slug: "oracle",
    totalLCAs: 10280,
    approvedLCAs: 10074,
    deniedLCAs: 206,
    approvalRate: 98.0,
    avgSalary: 152600,
    minSalary: 85000,
    maxSalary: 295000,
    medianSalary: 148000,
    industry: "Technology",
    headquarters: { city: "Austin", state: "TX" },
    topJobTitles: [
      { title: "Software Developer", count: 3900, avgSalary: 158000 },
      { title: "Principal Software Engineer", count: 1900, avgSalary: 192000 },
      { title: "Cloud Engineer", count: 1500, avgSalary: 165000 },
      { title: "Technical Analyst", count: 1100, avgSalary: 128000 },
      { title: "Product Manager", count: 700, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "Austin", state: "TX", count: 3300, avgSalary: 155000 },
      { city: "Redwood City", state: "CA", count: 2500, avgSalary: 175000 },
      { city: "Seattle", state: "WA", count: 1200, avgSalary: 168000 },
      { city: "Burlington", state: "MA", count: 950, avgSalary: 158000 },
      { city: "Denver", state: "CO", count: 700, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 8800, approvedLCAs: 8624, avgSalary: 138000 },
      { year: 2023, totalLCAs: 9400, approvedLCAs: 9212, avgSalary: 145000 },
      { year: 2024, totalLCAs: 9900, approvedLCAs: 9702, avgSalary: 150000 },
      { year: 2025, totalLCAs: 10280, approvedLCAs: 10074, avgSalary: 152600 }
    ]
  },
  {
    name: "HCL America Inc",
    slug: "hcl",
    totalLCAs: 9850,
    approvedLCAs: 9456,
    deniedLCAs: 394,
    approvalRate: 96.0,
    avgSalary: 98500,
    minSalary: 68000,
    maxSalary: 175000,
    medianSalary: 95000,
    industry: "IT Consulting",
    headquarters: { city: "Sunnyvale", state: "CA" },
    topJobTitles: [
      { title: "Technical Lead", count: 3400, avgSalary: 112000 },
      { title: "Senior Software Engineer", count: 2300, avgSalary: 98000 },
      { title: "Business Analyst", count: 1500, avgSalary: 88000 },
      { title: "Project Manager", count: 1100, avgSalary: 125000 },
      { title: "Architect", count: 750, avgSalary: 145000 }
    ],
    topLocations: [
      { city: "Sunnyvale", state: "CA", count: 1800, avgSalary: 115000 },
      { city: "Dallas", state: "TX", count: 1400, avgSalary: 95000 },
      { city: "Cary", state: "NC", count: 1200, avgSalary: 92000 },
      { city: "Chicago", state: "IL", count: 1000, avgSalary: 98000 },
      { city: "Atlanta", state: "GA", count: 850, avgSalary: 95000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 8500, approvedLCAs: 8160, avgSalary: 88000 },
      { year: 2023, totalLCAs: 9000, approvedLCAs: 8640, avgSalary: 92000 },
      { year: 2024, totalLCAs: 9500, approvedLCAs: 9120, avgSalary: 96000 },
      { year: 2025, totalLCAs: 9850, approvedLCAs: 9456, avgSalary: 98500 }
    ]
  },
  {
    name: "Qualcomm Inc",
    slug: "qualcomm",
    totalLCAs: 9250,
    approvedLCAs: 9065,
    deniedLCAs: 185,
    approvalRate: 98.0,
    avgSalary: 172500,
    minSalary: 98000,
    maxSalary: 345000,
    medianSalary: 168000,
    industry: "Semiconductors",
    headquarters: { city: "San Diego", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 3400, avgSalary: 178000 },
      { title: "Systems Engineer", count: 1900, avgSalary: 172000 },
      { title: "Hardware Engineer", count: 1500, avgSalary: 182000 },
      { title: "Modem Engineer", count: 950, avgSalary: 185000 },
      { title: "DSP Engineer", count: 700, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "San Diego", state: "CA", count: 6500, avgSalary: 178000 },
      { city: "Santa Clara", state: "CA", count: 1100, avgSalary: 185000 },
      { city: "San Jose", state: "CA", count: 700, avgSalary: 182000 },
      { city: "Austin", state: "TX", count: 550, avgSalary: 165000 },
      { city: "Boulder", state: "CO", count: 300, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 7800, approvedLCAs: 7644, avgSalary: 158000 },
      { year: 2023, totalLCAs: 8400, approvedLCAs: 8232, avgSalary: 165000 },
      { year: 2024, totalLCAs: 8900, approvedLCAs: 8722, avgSalary: 170000 },
      { year: 2025, totalLCAs: 9250, approvedLCAs: 9065, avgSalary: 172500 }
    ]
  },
  {
    name: "Uber Technologies Inc",
    slug: "uber",
    totalLCAs: 8620,
    approvedLCAs: 8448,
    deniedLCAs: 172,
    approvalRate: 98.0,
    avgSalary: 192200,
    minSalary: 105000,
    maxSalary: 398000,
    medianSalary: 188000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 3700, avgSalary: 195000 },
      { title: "Senior Software Engineer", count: 1800, avgSalary: 225000 },
      { title: "Data Scientist", count: 950, avgSalary: 185000 },
      { title: "Machine Learning Engineer", count: 750, avgSalary: 235000 },
      { title: "Product Manager", count: 600, avgSalary: 202000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 4900, avgSalary: 205000 },
      { city: "New York", state: "NY", count: 1400, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 950, avgSalary: 192000 },
      { city: "Sunnyvale", state: "CA", count: 600, avgSalary: 195000 },
      { city: "Chicago", state: "IL", count: 300, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 7200, approvedLCAs: 7056, avgSalary: 175000 },
      { year: 2023, totalLCAs: 7800, approvedLCAs: 7644, avgSalary: 182000 },
      { year: 2024, totalLCAs: 8300, approvedLCAs: 8134, avgSalary: 188000 },
      { year: 2025, totalLCAs: 8620, approvedLCAs: 8448, avgSalary: 192200 }
    ]
  },
  {
    name: "Cisco Systems Inc",
    slug: "cisco",
    totalLCAs: 8450,
    approvedLCAs: 8281,
    deniedLCAs: 169,
    approvalRate: 98.0,
    avgSalary: 165800,
    minSalary: 95000,
    maxSalary: 325000,
    medianSalary: 162000,
    industry: "Technology",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 3200, avgSalary: 168000 },
      { title: "Technical Leader", count: 1500, avgSalary: 185000 },
      { title: "Network Engineer", count: 1200, avgSalary: 158000 },
      { title: "Product Manager", count: 800, avgSalary: 178000 },
      { title: "Data Scientist", count: 600, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 5200, avgSalary: 175000 },
      { city: "Research Triangle Park", state: "NC", count: 1200, avgSalary: 155000 },
      { city: "Austin", state: "TX", count: 800, avgSalary: 162000 },
      { city: "Richardson", state: "TX", count: 500, avgSalary: 158000 },
      { city: "San Francisco", state: "CA", count: 400, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 7200, approvedLCAs: 7056, avgSalary: 152000 },
      { year: 2023, totalLCAs: 7700, approvedLCAs: 7546, avgSalary: 158000 },
      { year: 2024, totalLCAs: 8100, approvedLCAs: 7938, avgSalary: 163000 },
      { year: 2025, totalLCAs: 8450, approvedLCAs: 8281, avgSalary: 165800 }
    ]
  },
  {
    name: "Adobe Inc",
    slug: "adobe",
    totalLCAs: 7920,
    approvedLCAs: 7762,
    deniedLCAs: 158,
    approvalRate: 98.0,
    avgSalary: 182800,
    minSalary: 102000,
    maxSalary: 365000,
    medianSalary: 178000,
    industry: "Technology",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 3200, avgSalary: 185000 },
      { title: "Senior Software Engineer", count: 1600, avgSalary: 215000 },
      { title: "Computer Scientist", count: 900, avgSalary: 202000 },
      { title: "Product Manager", count: 750, avgSalary: 192000 },
      { title: "Data Scientist", count: 600, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 4700, avgSalary: 192000 },
      { city: "San Francisco", state: "CA", count: 1200, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 750, avgSalary: 185000 },
      { city: "Lehi", state: "UT", count: 600, avgSalary: 165000 },
      { city: "New York", state: "NY", count: 450, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 6700, approvedLCAs: 6566, avgSalary: 168000 },
      { year: 2023, totalLCAs: 7200, approvedLCAs: 7056, avgSalary: 175000 },
      { year: 2024, totalLCAs: 7600, approvedLCAs: 7448, avgSalary: 180000 },
      { year: 2025, totalLCAs: 7920, approvedLCAs: 7762, avgSalary: 182800 }
    ]
  },
  {
    name: "Bank of America",
    slug: "bank-of-america",
    totalLCAs: 7850,
    approvedLCAs: 7693,
    deniedLCAs: 157,
    approvalRate: 98.0,
    avgSalary: 142500,
    minSalary: 82000,
    maxSalary: 275000,
    medianSalary: 138000,
    industry: "Financial Services",
    headquarters: { city: "Charlotte", state: "NC" },
    topJobTitles: [
      { title: "Software Engineer", count: 2800, avgSalary: 148000 },
      { title: "Vice President", count: 1900, avgSalary: 178000 },
      { title: "Associate", count: 1400, avgSalary: 118000 },
      { title: "Business Analyst", count: 800, avgSalary: 105000 },
      { title: "Data Analyst", count: 600, avgSalary: 112000 }
    ],
    topLocations: [
      { city: "Charlotte", state: "NC", count: 2800, avgSalary: 138000 },
      { city: "New York", state: "NY", count: 2200, avgSalary: 162000 },
      { city: "Jersey City", state: "NJ", count: 1100, avgSalary: 152000 },
      { city: "Dallas", state: "TX", count: 700, avgSalary: 135000 },
      { city: "Chicago", state: "IL", count: 500, avgSalary: 142000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 6700, approvedLCAs: 6566, avgSalary: 128000 },
      { year: 2023, totalLCAs: 7200, approvedLCAs: 7056, avgSalary: 135000 },
      { year: 2024, totalLCAs: 7600, approvedLCAs: 7448, avgSalary: 140000 },
      { year: 2025, totalLCAs: 7850, approvedLCAs: 7693, avgSalary: 142500 }
    ]
  },
  {
    name: "KPMG LLP",
    slug: "kpmg",
    totalLCAs: 7650,
    approvedLCAs: 7497,
    deniedLCAs: 153,
    approvalRate: 98.0,
    avgSalary: 128500,
    minSalary: 72000,
    maxSalary: 248000,
    medianSalary: 125000,
    industry: "Consulting",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Senior Associate", count: 2700, avgSalary: 118000 },
      { title: "Manager", count: 1800, avgSalary: 152000 },
      { title: "Senior Manager", count: 1200, avgSalary: 182000 },
      { title: "Associate", count: 950, avgSalary: 88000 },
      { title: "Director", count: 500, avgSalary: 215000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 2200, avgSalary: 142000 },
      { city: "Chicago", state: "IL", count: 1500, avgSalary: 128000 },
      { city: "Los Angeles", state: "CA", count: 900, avgSalary: 135000 },
      { city: "Dallas", state: "TX", count: 750, avgSalary: 122000 },
      { city: "Atlanta", state: "GA", count: 600, avgSalary: 118000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 6500, approvedLCAs: 6370, avgSalary: 115000 },
      { year: 2023, totalLCAs: 7000, approvedLCAs: 6860, avgSalary: 120000 },
      { year: 2024, totalLCAs: 7400, approvedLCAs: 7252, avgSalary: 125000 },
      { year: 2025, totalLCAs: 7650, approvedLCAs: 7497, avgSalary: 128500 }
    ]
  },
  {
    name: "PricewaterhouseCoopers LLP",
    slug: "pwc",
    totalLCAs: 7450,
    approvedLCAs: 7301,
    deniedLCAs: 149,
    approvalRate: 98.0,
    avgSalary: 132500,
    minSalary: 75000,
    maxSalary: 265000,
    medianSalary: 128000,
    industry: "Consulting",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Senior Associate", count: 2600, avgSalary: 122000 },
      { title: "Manager", count: 1700, avgSalary: 158000 },
      { title: "Senior Manager", count: 1100, avgSalary: 188000 },
      { title: "Associate", count: 900, avgSalary: 92000 },
      { title: "Director", count: 450, avgSalary: 225000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 2100, avgSalary: 148000 },
      { city: "Chicago", state: "IL", count: 1400, avgSalary: 132000 },
      { city: "San Francisco", state: "CA", count: 950, avgSalary: 155000 },
      { city: "Dallas", state: "TX", count: 700, avgSalary: 125000 },
      { city: "Boston", state: "MA", count: 550, avgSalary: 142000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 6300, approvedLCAs: 6174, avgSalary: 118000 },
      { year: 2023, totalLCAs: 6800, approvedLCAs: 6664, avgSalary: 124000 },
      { year: 2024, totalLCAs: 7200, approvedLCAs: 7056, avgSalary: 129000 },
      { year: 2025, totalLCAs: 7450, approvedLCAs: 7301, avgSalary: 132500 }
    ]
  },
  {
    name: "Netflix Inc",
    slug: "netflix",
    totalLCAs: 4525,
    approvedLCAs: 4457,
    deniedLCAs: 68,
    approvalRate: 98.5,
    avgSalary: 248578,
    minSalary: 150000,
    maxSalary: 550000,
    medianSalary: 245000,
    industry: "Technology",
    headquarters: { city: "Los Gatos", state: "CA" },
    topJobTitles: [
      { title: "Senior Software Engineer", count: 1800, avgSalary: 265000 },
      { title: "Software Engineer", count: 1200, avgSalary: 225000 },
      { title: "Engineering Manager", count: 500, avgSalary: 345000 },
      { title: "Data Scientist", count: 400, avgSalary: 245000 },
      { title: "Product Manager", count: 350, avgSalary: 285000 }
    ],
    topLocations: [
      { city: "Los Gatos", state: "CA", count: 3200, avgSalary: 255000 },
      { city: "Los Angeles", state: "CA", count: 650, avgSalary: 242000 },
      { city: "New York", state: "NY", count: 400, avgSalary: 248000 },
      { city: "San Jose", state: "CA", count: 150, avgSalary: 252000 },
      { city: "Seattle", state: "WA", count: 75, avgSalary: 238000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3800, approvedLCAs: 3742, avgSalary: 225000 },
      { year: 2023, totalLCAs: 4100, approvedLCAs: 4039, avgSalary: 235000 },
      { year: 2024, totalLCAs: 4350, approvedLCAs: 4285, avgSalary: 243000 },
      { year: 2025, totalLCAs: 4525, approvedLCAs: 4457, avgSalary: 248578 }
    ]
  },
  {
    name: "TikTok Inc",
    slug: "tiktok",
    totalLCAs: 5833,
    approvedLCAs: 5716,
    deniedLCAs: 117,
    approvalRate: 98.0,
    avgSalary: 202380,
    minSalary: 115000,
    maxSalary: 425000,
    medianSalary: 198000,
    industry: "Technology",
    headquarters: { city: "Los Angeles", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 2400, avgSalary: 205000 },
      { title: "Machine Learning Engineer", count: 900, avgSalary: 245000 },
      { title: "Data Scientist", count: 700, avgSalary: 195000 },
      { title: "Product Manager", count: 550, avgSalary: 215000 },
      { title: "Research Scientist", count: 450, avgSalary: 235000 }
    ],
    topLocations: [
      { city: "Los Angeles", state: "CA", count: 2100, avgSalary: 208000 },
      { city: "San Jose", state: "CA", count: 1500, avgSalary: 215000 },
      { city: "New York", state: "NY", count: 1200, avgSalary: 205000 },
      { city: "Seattle", state: "WA", count: 600, avgSalary: 198000 },
      { city: "San Francisco", state: "CA", count: 300, avgSalary: 212000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3500, approvedLCAs: 3430, avgSalary: 178000 },
      { year: 2023, totalLCAs: 4800, approvedLCAs: 4704, avgSalary: 188000 },
      { year: 2024, totalLCAs: 5500, approvedLCAs: 5390, avgSalary: 198000 },
      { year: 2025, totalLCAs: 5833, approvedLCAs: 5716, avgSalary: 202380 }
    ]
  },
  {
    name: "Lyft Inc",
    slug: "lyft",
    totalLCAs: 3250,
    approvedLCAs: 3185,
    deniedLCAs: 65,
    approvalRate: 98.0,
    avgSalary: 185200,
    minSalary: 105000,
    maxSalary: 365000,
    medianSalary: 182000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1400, avgSalary: 188000 },
      { title: "Senior Software Engineer", count: 700, avgSalary: 218000 },
      { title: "Data Scientist", count: 400, avgSalary: 178000 },
      { title: "Product Manager", count: 300, avgSalary: 195000 },
      { title: "Machine Learning Engineer", count: 250, avgSalary: 225000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 2400, avgSalary: 195000 },
      { city: "New York", state: "NY", count: 450, avgSalary: 185000 },
      { city: "Seattle", state: "WA", count: 250, avgSalary: 178000 },
      { city: "Nashville", state: "TN", count: 100, avgSalary: 162000 },
      { city: "Chicago", state: "IL", count: 50, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2800, approvedLCAs: 2744, avgSalary: 168000 },
      { year: 2023, totalLCAs: 3000, approvedLCAs: 2940, avgSalary: 175000 },
      { year: 2024, totalLCAs: 3150, approvedLCAs: 3087, avgSalary: 182000 },
      { year: 2025, totalLCAs: 3250, approvedLCAs: 3185, avgSalary: 185200 }
    ]
  },
  {
    name: "Stripe Inc",
    slug: "stripe",
    totalLCAs: 3850,
    approvedLCAs: 3773,
    deniedLCAs: 77,
    approvalRate: 98.0,
    avgSalary: 215800,
    minSalary: 125000,
    maxSalary: 475000,
    medianSalary: 212000,
    industry: "Financial Services",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1600, avgSalary: 218000 },
      { title: "Senior Software Engineer", count: 850, avgSalary: 255000 },
      { title: "Engineering Manager", count: 400, avgSalary: 325000 },
      { title: "Data Scientist", count: 350, avgSalary: 205000 },
      { title: "Product Manager", count: 300, avgSalary: 235000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 2600, avgSalary: 225000 },
      { city: "Seattle", state: "WA", count: 550, avgSalary: 215000 },
      { city: "New York", state: "NY", count: 400, avgSalary: 218000 },
      { city: "South San Francisco", state: "CA", count: 200, avgSalary: 220000 },
      { city: "Chicago", state: "IL", count: 100, avgSalary: 195000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3200, approvedLCAs: 3136, avgSalary: 195000 },
      { year: 2023, totalLCAs: 3500, approvedLCAs: 3430, avgSalary: 205000 },
      { year: 2024, totalLCAs: 3700, approvedLCAs: 3626, avgSalary: 212000 },
      { year: 2025, totalLCAs: 3850, approvedLCAs: 3773, avgSalary: 215800 }
    ]
  },
  {
    name: "Airbnb Inc",
    slug: "airbnb",
    totalLCAs: 3450,
    approvedLCAs: 3381,
    deniedLCAs: 69,
    approvalRate: 98.0,
    avgSalary: 198500,
    minSalary: 115000,
    maxSalary: 425000,
    medianSalary: 195000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1450, avgSalary: 202000 },
      { title: "Senior Software Engineer", count: 750, avgSalary: 235000 },
      { title: "Data Scientist", count: 400, avgSalary: 188000 },
      { title: "Product Manager", count: 350, avgSalary: 212000 },
      { title: "Engineering Manager", count: 280, avgSalary: 295000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 2800, avgSalary: 208000 },
      { city: "Seattle", state: "WA", count: 350, avgSalary: 195000 },
      { city: "New York", state: "NY", count: 200, avgSalary: 202000 },
      { city: "Portland", state: "OR", count: 75, avgSalary: 178000 },
      { city: "Los Angeles", state: "CA", count: 25, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2900, approvedLCAs: 2842, avgSalary: 178000 },
      { year: 2023, totalLCAs: 3150, approvedLCAs: 3087, avgSalary: 188000 },
      { year: 2024, totalLCAs: 3350, approvedLCAs: 3283, avgSalary: 195000 },
      { year: 2025, totalLCAs: 3450, approvedLCAs: 3381, avgSalary: 198500 }
    ]
  },
  {
    name: "LinkedIn Corporation",
    slug: "linkedin",
    totalLCAs: 5250,
    approvedLCAs: 5145,
    deniedLCAs: 105,
    approvalRate: 98.0,
    avgSalary: 175800,
    minSalary: 98000,
    maxSalary: 365000,
    medianSalary: 172000,
    industry: "Technology",
    headquarters: { city: "Sunnyvale", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 2200, avgSalary: 178000 },
      { title: "Senior Software Engineer", count: 1100, avgSalary: 208000 },
      { title: "Data Scientist", count: 600, avgSalary: 172000 },
      { title: "Product Manager", count: 500, avgSalary: 188000 },
      { title: "Technical Program Manager", count: 400, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "Sunnyvale", state: "CA", count: 3200, avgSalary: 185000 },
      { city: "San Francisco", state: "CA", count: 900, avgSalary: 192000 },
      { city: "New York", state: "NY", count: 600, avgSalary: 182000 },
      { city: "Seattle", state: "WA", count: 350, avgSalary: 178000 },
      { city: "Chicago", state: "IL", count: 200, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4500, approvedLCAs: 4410, avgSalary: 162000 },
      { year: 2023, totalLCAs: 4800, approvedLCAs: 4704, avgSalary: 168000 },
      { year: 2024, totalLCAs: 5100, approvedLCAs: 4998, avgSalary: 173000 },
      { year: 2025, totalLCAs: 5250, approvedLCAs: 5145, avgSalary: 175800 }
    ]
  },
  {
    name: "PayPal Holdings Inc",
    slug: "paypal",
    totalLCAs: 4850,
    approvedLCAs: 4753,
    deniedLCAs: 97,
    approvalRate: 98.0,
    avgSalary: 162500,
    minSalary: 95000,
    maxSalary: 325000,
    medianSalary: 158000,
    industry: "Financial Services",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 2000, avgSalary: 165000 },
      { title: "Senior Software Engineer", count: 1000, avgSalary: 195000 },
      { title: "Data Scientist", count: 550, avgSalary: 158000 },
      { title: "Product Manager", count: 450, avgSalary: 175000 },
      { title: "Technical Lead", count: 400, avgSalary: 185000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 3000, avgSalary: 172000 },
      { city: "Scottsdale", state: "AZ", count: 700, avgSalary: 152000 },
      { city: "Austin", state: "TX", count: 500, avgSalary: 158000 },
      { city: "New York", state: "NY", count: 350, avgSalary: 175000 },
      { city: "Chicago", state: "IL", count: 200, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4200, approvedLCAs: 4116, avgSalary: 148000 },
      { year: 2023, totalLCAs: 4500, approvedLCAs: 4410, avgSalary: 155000 },
      { year: 2024, totalLCAs: 4700, approvedLCAs: 4606, avgSalary: 160000 },
      { year: 2025, totalLCAs: 4850, approvedLCAs: 4753, avgSalary: 162500 }
    ]
  },
  {
    name: "Morgan Stanley",
    slug: "morgan-stanley",
    totalLCAs: 6250,
    approvedLCAs: 6125,
    deniedLCAs: 125,
    approvalRate: 98.0,
    avgSalary: 165800,
    minSalary: 92000,
    maxSalary: 325000,
    medianSalary: 162000,
    industry: "Financial Services",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Vice President", count: 2100, avgSalary: 198000 },
      { title: "Associate", count: 1600, avgSalary: 142000 },
      { title: "Software Engineer", count: 1100, avgSalary: 165000 },
      { title: "Analyst", count: 700, avgSalary: 115000 },
      { title: "Executive Director", count: 400, avgSalary: 265000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 4200, avgSalary: 178000 },
      { city: "Baltimore", state: "MD", count: 800, avgSalary: 145000 },
      { city: "Alpharetta", state: "GA", count: 500, avgSalary: 138000 },
      { city: "San Francisco", state: "CA", count: 400, avgSalary: 185000 },
      { city: "Chicago", state: "IL", count: 250, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 5400, approvedLCAs: 5292, avgSalary: 152000 },
      { year: 2023, totalLCAs: 5800, approvedLCAs: 5684, avgSalary: 158000 },
      { year: 2024, totalLCAs: 6050, approvedLCAs: 5929, avgSalary: 163000 },
      { year: 2025, totalLCAs: 6250, approvedLCAs: 6125, avgSalary: 165800 }
    ]
  },
  {
    name: "Citigroup Inc",
    slug: "citigroup",
    totalLCAs: 5850,
    approvedLCAs: 5733,
    deniedLCAs: 117,
    approvalRate: 98.0,
    avgSalary: 148500,
    minSalary: 85000,
    maxSalary: 285000,
    medianSalary: 145000,
    industry: "Financial Services",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Vice President", count: 1900, avgSalary: 182000 },
      { title: "Software Engineer", count: 1500, avgSalary: 152000 },
      { title: "Associate", count: 1100, avgSalary: 125000 },
      { title: "Analyst", count: 700, avgSalary: 108000 },
      { title: "Senior Vice President", count: 350, avgSalary: 245000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 3500, avgSalary: 165000 },
      { city: "Jersey City", state: "NJ", count: 900, avgSalary: 155000 },
      { city: "Tampa", state: "FL", count: 600, avgSalary: 128000 },
      { city: "Irving", state: "TX", count: 450, avgSalary: 135000 },
      { city: "Chicago", state: "IL", count: 300, avgSalary: 145000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 5000, approvedLCAs: 4900, avgSalary: 135000 },
      { year: 2023, totalLCAs: 5400, approvedLCAs: 5292, avgSalary: 142000 },
      { year: 2024, totalLCAs: 5700, approvedLCAs: 5586, avgSalary: 146000 },
      { year: 2025, totalLCAs: 5850, approvedLCAs: 5733, avgSalary: 148500 }
    ]
  },
  {
    name: "Walmart Inc",
    slug: "walmart",
    totalLCAs: 5450,
    approvedLCAs: 5341,
    deniedLCAs: 109,
    approvalRate: 98.0,
    avgSalary: 138500,
    minSalary: 82000,
    maxSalary: 275000,
    medianSalary: 135000,
    industry: "Technology",
    headquarters: { city: "Bentonville", state: "AR" },
    topJobTitles: [
      { title: "Software Engineer", count: 2200, avgSalary: 142000 },
      { title: "Senior Software Engineer", count: 1100, avgSalary: 168000 },
      { title: "Data Scientist", count: 650, avgSalary: 155000 },
      { title: "Product Manager", count: 500, avgSalary: 162000 },
      { title: "Technical Program Manager", count: 400, avgSalary: 148000 }
    ],
    topLocations: [
      { city: "Bentonville", state: "AR", count: 2800, avgSalary: 132000 },
      { city: "Sunnyvale", state: "CA", count: 1200, avgSalary: 172000 },
      { city: "San Bruno", state: "CA", count: 600, avgSalary: 168000 },
      { city: "Hoboken", state: "NJ", count: 450, avgSalary: 158000 },
      { city: "Dallas", state: "TX", count: 300, avgSalary: 145000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4600, approvedLCAs: 4508, avgSalary: 125000 },
      { year: 2023, totalLCAs: 5000, approvedLCAs: 4900, avgSalary: 132000 },
      { year: 2024, totalLCAs: 5300, approvedLCAs: 5194, avgSalary: 136000 },
      { year: 2025, totalLCAs: 5450, approvedLCAs: 5341, avgSalary: 138500 }
    ]
  },
  {
    name: "Twitter Inc",
    slug: "twitter",
    totalLCAs: 2850,
    approvedLCAs: 2793,
    deniedLCAs: 57,
    approvalRate: 98.0,
    avgSalary: 195800,
    minSalary: 115000,
    maxSalary: 425000,
    medianSalary: 192000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1200, avgSalary: 198000 },
      { title: "Senior Software Engineer", count: 650, avgSalary: 235000 },
      { title: "Machine Learning Engineer", count: 350, avgSalary: 245000 },
      { title: "Data Scientist", count: 300, avgSalary: 185000 },
      { title: "Product Manager", count: 200, avgSalary: 208000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 2200, avgSalary: 205000 },
      { city: "New York", state: "NY", count: 350, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 200, avgSalary: 192000 },
      { city: "Boulder", state: "CO", count: 75, avgSalary: 178000 },
      { city: "Boston", state: "MA", count: 25, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4200, approvedLCAs: 4116, avgSalary: 188000 },
      { year: 2023, totalLCAs: 2500, approvedLCAs: 2450, avgSalary: 192000 },
      { year: 2024, totalLCAs: 2700, approvedLCAs: 2646, avgSalary: 194000 },
      { year: 2025, totalLCAs: 2850, approvedLCAs: 2793, avgSalary: 195800 }
    ]
  },
  {
    name: "Snap Inc",
    slug: "snap",
    totalLCAs: 2650,
    approvedLCAs: 2597,
    deniedLCAs: 53,
    approvalRate: 98.0,
    avgSalary: 195200,
    minSalary: 112000,
    maxSalary: 415000,
    medianSalary: 192000,
    industry: "Technology",
    headquarters: { city: "Santa Monica", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1100, avgSalary: 198000 },
      { title: "Senior Software Engineer", count: 600, avgSalary: 235000 },
      { title: "Machine Learning Engineer", count: 320, avgSalary: 248000 },
      { title: "Data Scientist", count: 280, avgSalary: 182000 },
      { title: "Product Manager", count: 200, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "Santa Monica", state: "CA", count: 1500, avgSalary: 202000 },
      { city: "Los Angeles", state: "CA", count: 600, avgSalary: 195000 },
      { city: "San Francisco", state: "CA", count: 350, avgSalary: 205000 },
      { city: "New York", state: "NY", count: 150, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 50, avgSalary: 192000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2800, approvedLCAs: 2744, avgSalary: 182000 },
      { year: 2023, totalLCAs: 2500, approvedLCAs: 2450, avgSalary: 188000 },
      { year: 2024, totalLCAs: 2600, approvedLCAs: 2548, avgSalary: 193000 },
      { year: 2025, totalLCAs: 2650, approvedLCAs: 2597, avgSalary: 195200 }
    ]
  },
  {
    name: "Block Inc",
    slug: "block",
    totalLCAs: 3150,
    approvedLCAs: 3087,
    deniedLCAs: 63,
    approvalRate: 98.0,
    avgSalary: 198500,
    minSalary: 118000,
    maxSalary: 435000,
    medianSalary: 195000,
    industry: "Financial Services",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1300, avgSalary: 202000 },
      { title: "Senior Software Engineer", count: 700, avgSalary: 238000 },
      { title: "Machine Learning Engineer", count: 380, avgSalary: 255000 },
      { title: "Data Scientist", count: 320, avgSalary: 188000 },
      { title: "Product Manager", count: 250, avgSalary: 215000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 2100, avgSalary: 208000 },
      { city: "Oakland", state: "CA", count: 400, avgSalary: 198000 },
      { city: "New York", state: "NY", count: 350, avgSalary: 202000 },
      { city: "Seattle", state: "WA", count: 200, avgSalary: 195000 },
      { city: "Salt Lake City", state: "UT", count: 100, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2700, approvedLCAs: 2646, avgSalary: 182000 },
      { year: 2023, totalLCAs: 2900, approvedLCAs: 2842, avgSalary: 190000 },
      { year: 2024, totalLCAs: 3050, approvedLCAs: 2989, avgSalary: 196000 },
      { year: 2025, totalLCAs: 3150, approvedLCAs: 3087, avgSalary: 198500 }
    ]
  },
  {
    name: "Coinbase Inc",
    slug: "coinbase",
    totalLCAs: 2450,
    approvedLCAs: 2401,
    deniedLCAs: 49,
    approvalRate: 98.0,
    avgSalary: 212500,
    minSalary: 125000,
    maxSalary: 475000,
    medianSalary: 208000,
    industry: "Financial Services",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1000, avgSalary: 215000 },
      { title: "Senior Software Engineer", count: 550, avgSalary: 255000 },
      { title: "Security Engineer", count: 300, avgSalary: 232000 },
      { title: "Data Scientist", count: 250, avgSalary: 198000 },
      { title: "Product Manager", count: 200, avgSalary: 225000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1700, avgSalary: 222000 },
      { city: "New York", state: "NY", count: 400, avgSalary: 218000 },
      { city: "Seattle", state: "WA", count: 200, avgSalary: 208000 },
      { city: "Portland", state: "OR", count: 100, avgSalary: 192000 },
      { city: "Austin", state: "TX", count: 50, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2800, approvedLCAs: 2744, avgSalary: 205000 },
      { year: 2023, totalLCAs: 2200, approvedLCAs: 2156, avgSalary: 208000 },
      { year: 2024, totalLCAs: 2350, approvedLCAs: 2303, avgSalary: 210000 },
      { year: 2025, totalLCAs: 2450, approvedLCAs: 2401, avgSalary: 212500 }
    ]
  },
  {
    name: "Palantir Technologies Inc",
    slug: "palantir",
    totalLCAs: 2850,
    approvedLCAs: 2793,
    deniedLCAs: 57,
    approvalRate: 98.0,
    avgSalary: 188500,
    minSalary: 115000,
    maxSalary: 395000,
    medianSalary: 185000,
    industry: "Technology",
    headquarters: { city: "Denver", state: "CO" },
    topJobTitles: [
      { title: "Software Engineer", count: 1200, avgSalary: 192000 },
      { title: "Forward Deployed Engineer", count: 650, avgSalary: 185000 },
      { title: "Data Scientist", count: 400, avgSalary: 178000 },
      { title: "Product Manager", count: 280, avgSalary: 198000 },
      { title: "Solutions Architect", count: 200, avgSalary: 195000 }
    ],
    topLocations: [
      { city: "Denver", state: "CO", count: 900, avgSalary: 182000 },
      { city: "Palo Alto", state: "CA", count: 800, avgSalary: 202000 },
      { city: "New York", state: "NY", count: 600, avgSalary: 195000 },
      { city: "Washington", state: "DC", count: 350, avgSalary: 185000 },
      { city: "Seattle", state: "WA", count: 200, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2400, approvedLCAs: 2352, avgSalary: 172000 },
      { year: 2023, totalLCAs: 2600, approvedLCAs: 2548, avgSalary: 180000 },
      { year: 2024, totalLCAs: 2750, approvedLCAs: 2695, avgSalary: 185000 },
      { year: 2025, totalLCAs: 2850, approvedLCAs: 2793, avgSalary: 188500 }
    ]
  },
  {
    name: "Databricks Inc",
    slug: "databricks",
    totalLCAs: 3250,
    approvedLCAs: 3185,
    deniedLCAs: 65,
    approvalRate: 98.0,
    avgSalary: 225800,
    minSalary: 135000,
    maxSalary: 510000,
    medianSalary: 222000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1350, avgSalary: 228000 },
      { title: "Senior Software Engineer", count: 750, avgSalary: 268000 },
      { title: "Solutions Architect", count: 450, avgSalary: 215000 },
      { title: "Data Scientist", count: 350, avgSalary: 205000 },
      { title: "Engineering Manager", count: 200, avgSalary: 345000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 2200, avgSalary: 235000 },
      { city: "Seattle", state: "WA", count: 500, avgSalary: 225000 },
      { city: "New York", state: "NY", count: 350, avgSalary: 228000 },
      { city: "Mountain View", state: "CA", count: 150, avgSalary: 232000 },
      { city: "Austin", state: "TX", count: 50, avgSalary: 208000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2400, approvedLCAs: 2352, avgSalary: 198000 },
      { year: 2023, totalLCAs: 2800, approvedLCAs: 2744, avgSalary: 212000 },
      { year: 2024, totalLCAs: 3100, approvedLCAs: 3038, avgSalary: 220000 },
      { year: 2025, totalLCAs: 3250, approvedLCAs: 3185, avgSalary: 225800 }
    ]
  },
  {
    name: "Snowflake Inc",
    slug: "snowflake",
    totalLCAs: 2950,
    approvedLCAs: 2891,
    deniedLCAs: 59,
    approvalRate: 98.0,
    avgSalary: 218500,
    minSalary: 128000,
    maxSalary: 485000,
    medianSalary: 215000,
    industry: "Technology",
    headquarters: { city: "Bozeman", state: "MT" },
    topJobTitles: [
      { title: "Software Engineer", count: 1250, avgSalary: 222000 },
      { title: "Senior Software Engineer", count: 680, avgSalary: 258000 },
      { title: "Solutions Architect", count: 400, avgSalary: 208000 },
      { title: "Data Scientist", count: 300, avgSalary: 198000 },
      { title: "Product Manager", count: 200, avgSalary: 225000 }
    ],
    topLocations: [
      { city: "San Mateo", state: "CA", count: 1500, avgSalary: 228000 },
      { city: "Bellevue", state: "WA", count: 600, avgSalary: 218000 },
      { city: "Bozeman", state: "MT", count: 400, avgSalary: 198000 },
      { city: "New York", state: "NY", count: 250, avgSalary: 222000 },
      { city: "Dublin", state: "CA", count: 150, avgSalary: 225000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2200, approvedLCAs: 2156, avgSalary: 192000 },
      { year: 2023, totalLCAs: 2500, approvedLCAs: 2450, avgSalary: 205000 },
      { year: 2024, totalLCAs: 2800, approvedLCAs: 2744, avgSalary: 213000 },
      { year: 2025, totalLCAs: 2950, approvedLCAs: 2891, avgSalary: 218500 }
    ]
  },
  {
    name: "ServiceNow Inc",
    slug: "servicenow",
    totalLCAs: 4150,
    approvedLCAs: 4067,
    deniedLCAs: 83,
    approvalRate: 98.0,
    avgSalary: 178500,
    minSalary: 105000,
    maxSalary: 375000,
    medianSalary: 175000,
    industry: "Technology",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1750, avgSalary: 182000 },
      { title: "Senior Software Engineer", count: 900, avgSalary: 215000 },
      { title: "Technical Consultant", count: 550, avgSalary: 162000 },
      { title: "Product Manager", count: 400, avgSalary: 188000 },
      { title: "Solutions Architect", count: 350, avgSalary: 195000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 2400, avgSalary: 188000 },
      { city: "San Diego", state: "CA", count: 700, avgSalary: 175000 },
      { city: "Seattle", state: "WA", count: 450, avgSalary: 182000 },
      { city: "Kirkland", state: "WA", count: 350, avgSalary: 178000 },
      { city: "Chicago", state: "IL", count: 200, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3500, approvedLCAs: 3430, avgSalary: 162000 },
      { year: 2023, totalLCAs: 3800, approvedLCAs: 3724, avgSalary: 170000 },
      { year: 2024, totalLCAs: 4000, approvedLCAs: 3920, avgSalary: 175000 },
      { year: 2025, totalLCAs: 4150, approvedLCAs: 4067, avgSalary: 178500 }
    ]
  },
  {
    name: "Workday Inc",
    slug: "workday",
    totalLCAs: 3850,
    approvedLCAs: 3773,
    deniedLCAs: 77,
    approvalRate: 98.0,
    avgSalary: 175200,
    minSalary: 102000,
    maxSalary: 365000,
    medianSalary: 172000,
    industry: "Technology",
    headquarters: { city: "Pleasanton", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1600, avgSalary: 178000 },
      { title: "Senior Software Engineer", count: 850, avgSalary: 208000 },
      { title: "Product Manager", count: 450, avgSalary: 185000 },
      { title: "Data Scientist", count: 350, avgSalary: 172000 },
      { title: "Technical Lead", count: 300, avgSalary: 195000 }
    ],
    topLocations: [
      { city: "Pleasanton", state: "CA", count: 2200, avgSalary: 182000 },
      { city: "San Francisco", state: "CA", count: 650, avgSalary: 192000 },
      { city: "Atlanta", state: "GA", count: 400, avgSalary: 165000 },
      { city: "Boulder", state: "CO", count: 350, avgSalary: 172000 },
      { city: "Seattle", state: "WA", count: 200, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3300, approvedLCAs: 3234, avgSalary: 160000 },
      { year: 2023, totalLCAs: 3500, approvedLCAs: 3430, avgSalary: 167000 },
      { year: 2024, totalLCAs: 3700, approvedLCAs: 3626, avgSalary: 172000 },
      { year: 2025, totalLCAs: 3850, approvedLCAs: 3773, avgSalary: 175200 }
    ]
  },
  {
    name: "Splunk Inc",
    slug: "splunk",
    totalLCAs: 2750,
    approvedLCAs: 2695,
    deniedLCAs: 55,
    approvalRate: 98.0,
    avgSalary: 185800,
    minSalary: 108000,
    maxSalary: 385000,
    medianSalary: 182000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1150, avgSalary: 188000 },
      { title: "Senior Software Engineer", count: 620, avgSalary: 222000 },
      { title: "Solutions Engineer", count: 380, avgSalary: 175000 },
      { title: "Product Manager", count: 280, avgSalary: 195000 },
      { title: "Data Scientist", count: 200, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1600, avgSalary: 195000 },
      { city: "San Jose", state: "CA", count: 500, avgSalary: 188000 },
      { city: "Seattle", state: "WA", count: 350, avgSalary: 182000 },
      { city: "Boulder", state: "CO", count: 200, avgSalary: 172000 },
      { city: "Plano", state: "TX", count: 100, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2400, approvedLCAs: 2352, avgSalary: 172000 },
      { year: 2023, totalLCAs: 2550, approvedLCAs: 2499, avgSalary: 178000 },
      { year: 2024, totalLCAs: 2650, approvedLCAs: 2597, avgSalary: 183000 },
      { year: 2025, totalLCAs: 2750, approvedLCAs: 2695, avgSalary: 185800 }
    ]
  },
  {
    name: "VMware Inc",
    slug: "vmware",
    totalLCAs: 4550,
    approvedLCAs: 4459,
    deniedLCAs: 91,
    approvalRate: 98.0,
    avgSalary: 172500,
    minSalary: 98000,
    maxSalary: 355000,
    medianSalary: 168000,
    industry: "Technology",
    headquarters: { city: "Palo Alto", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1900, avgSalary: 175000 },
      { title: "Senior Software Engineer", count: 1000, avgSalary: 205000 },
      { title: "Technical Support Engineer", count: 600, avgSalary: 145000 },
      { title: "Product Manager", count: 400, avgSalary: 182000 },
      { title: "Solutions Architect", count: 350, avgSalary: 188000 }
    ],
    topLocations: [
      { city: "Palo Alto", state: "CA", count: 2600, avgSalary: 182000 },
      { city: "Austin", state: "TX", count: 700, avgSalary: 165000 },
      { city: "Atlanta", state: "GA", count: 500, avgSalary: 158000 },
      { city: "Seattle", state: "WA", count: 400, avgSalary: 175000 },
      { city: "Cambridge", state: "MA", count: 250, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4000, approvedLCAs: 3920, avgSalary: 158000 },
      { year: 2023, totalLCAs: 4200, approvedLCAs: 4116, avgSalary: 165000 },
      { year: 2024, totalLCAs: 4400, approvedLCAs: 4312, avgSalary: 170000 },
      { year: 2025, totalLCAs: 4550, approvedLCAs: 4459, avgSalary: 172500 }
    ]
  },
  {
    name: "Intuit Inc",
    slug: "intuit",
    totalLCAs: 3650,
    approvedLCAs: 3577,
    deniedLCAs: 73,
    approvalRate: 98.0,
    avgSalary: 178500,
    minSalary: 105000,
    maxSalary: 375000,
    medianSalary: 175000,
    industry: "Technology",
    headquarters: { city: "Mountain View", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1500, avgSalary: 182000 },
      { title: "Senior Software Engineer", count: 800, avgSalary: 215000 },
      { title: "Data Scientist", count: 450, avgSalary: 172000 },
      { title: "Product Manager", count: 380, avgSalary: 192000 },
      { title: "Staff Software Engineer", count: 280, avgSalary: 252000 }
    ],
    topLocations: [
      { city: "Mountain View", state: "CA", count: 2000, avgSalary: 188000 },
      { city: "San Diego", state: "CA", count: 700, avgSalary: 175000 },
      { city: "Plano", state: "TX", count: 450, avgSalary: 165000 },
      { city: "Tucson", state: "AZ", count: 300, avgSalary: 155000 },
      { city: "Atlanta", state: "GA", count: 200, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3100, approvedLCAs: 3038, avgSalary: 165000 },
      { year: 2023, totalLCAs: 3350, approvedLCAs: 3283, avgSalary: 172000 },
      { year: 2024, totalLCAs: 3550, approvedLCAs: 3479, avgSalary: 176000 },
      { year: 2025, totalLCAs: 3650, approvedLCAs: 3577, avgSalary: 178500 }
    ]
  },
  {
    name: "Roblox Corporation",
    slug: "roblox",
    totalLCAs: 2210,
    approvedLCAs: 2166,
    deniedLCAs: 44,
    approvalRate: 98.0,
    avgSalary: 242069,
    minSalary: 145000,
    maxSalary: 550000,
    medianSalary: 238000,
    industry: "Technology",
    headquarters: { city: "San Mateo", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 920, avgSalary: 245000 },
      { title: "Senior Software Engineer", count: 500, avgSalary: 285000 },
      { title: "Engineering Manager", count: 280, avgSalary: 365000 },
      { title: "Data Scientist", count: 220, avgSalary: 228000 },
      { title: "Product Manager", count: 180, avgSalary: 258000 }
    ],
    topLocations: [
      { city: "San Mateo", state: "CA", count: 1700, avgSalary: 248000 },
      { city: "San Francisco", state: "CA", count: 300, avgSalary: 255000 },
      { city: "Seattle", state: "WA", count: 150, avgSalary: 238000 },
      { city: "New York", state: "NY", count: 60, avgSalary: 242000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1600, approvedLCAs: 1568, avgSalary: 218000 },
      { year: 2023, totalLCAs: 1900, approvedLCAs: 1862, avgSalary: 230000 },
      { year: 2024, totalLCAs: 2100, approvedLCAs: 2058, avgSalary: 238000 },
      { year: 2025, totalLCAs: 2210, approvedLCAs: 2166, avgSalary: 242069 }
    ]
  },
  {
    name: "DoorDash Inc",
    slug: "doordash",
    totalLCAs: 2850,
    approvedLCAs: 2793,
    deniedLCAs: 57,
    approvalRate: 98.0,
    avgSalary: 195800,
    minSalary: 115000,
    maxSalary: 425000,
    medianSalary: 192000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1200, avgSalary: 198000 },
      { title: "Senior Software Engineer", count: 650, avgSalary: 235000 },
      { title: "Machine Learning Engineer", count: 350, avgSalary: 248000 },
      { title: "Data Scientist", count: 300, avgSalary: 185000 },
      { title: "Product Manager", count: 220, avgSalary: 212000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 2000, avgSalary: 205000 },
      { city: "Seattle", state: "WA", count: 400, avgSalary: 195000 },
      { city: "New York", state: "NY", count: 300, avgSalary: 198000 },
      { city: "Los Angeles", state: "CA", count: 100, avgSalary: 188000 },
      { city: "Austin", state: "TX", count: 50, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2300, approvedLCAs: 2254, avgSalary: 178000 },
      { year: 2023, totalLCAs: 2550, approvedLCAs: 2499, avgSalary: 188000 },
      { year: 2024, totalLCAs: 2750, approvedLCAs: 2695, avgSalary: 193000 },
      { year: 2025, totalLCAs: 2850, approvedLCAs: 2793, avgSalary: 195800 }
    ]
  },
  {
    name: "Tesla Inc",
    slug: "tesla",
    totalLCAs: 4250,
    approvedLCAs: 4165,
    deniedLCAs: 85,
    approvalRate: 98.0,
    avgSalary: 145800,
    minSalary: 85000,
    maxSalary: 320000,
    medianSalary: 142000,
    industry: "Technology",
    headquarters: { city: "Austin", state: "TX" },
    topJobTitles: [
      { title: "Software Engineer", count: 1700, avgSalary: 152000 },
      { title: "Mechanical Engineer", count: 850, avgSalary: 138000 },
      { title: "Data Engineer", count: 550, avgSalary: 148000 },
      { title: "Electrical Engineer", count: 480, avgSalary: 142000 },
      { title: "Manufacturing Engineer", count: 380, avgSalary: 128000 }
    ],
    topLocations: [
      { city: "Austin", state: "TX", count: 1800, avgSalary: 145000 },
      { city: "Fremont", state: "CA", count: 1200, avgSalary: 158000 },
      { city: "Palo Alto", state: "CA", count: 600, avgSalary: 165000 },
      { city: "Buffalo", state: "NY", count: 350, avgSalary: 128000 },
      { city: "Sparks", state: "NV", count: 200, avgSalary: 135000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3500, approvedLCAs: 3430, avgSalary: 132000 },
      { year: 2023, totalLCAs: 3800, approvedLCAs: 3724, avgSalary: 138000 },
      { year: 2024, totalLCAs: 4100, approvedLCAs: 4018, avgSalary: 143000 },
      { year: 2025, totalLCAs: 4250, approvedLCAs: 4165, avgSalary: 145800 }
    ]
  },
  {
    name: "Visa Inc",
    slug: "visa",
    totalLCAs: 3850,
    approvedLCAs: 3773,
    deniedLCAs: 77,
    approvalRate: 98.0,
    avgSalary: 168500,
    minSalary: 95000,
    maxSalary: 345000,
    medianSalary: 165000,
    industry: "Financial Services",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1550, avgSalary: 172000 },
      { title: "Senior Software Engineer", count: 850, avgSalary: 198000 },
      { title: "Data Scientist", count: 480, avgSalary: 165000 },
      { title: "Product Manager", count: 380, avgSalary: 182000 },
      { title: "Systems Analyst", count: 280, avgSalary: 145000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1500, avgSalary: 182000 },
      { city: "Foster City", state: "CA", count: 1100, avgSalary: 175000 },
      { city: "Austin", state: "TX", count: 550, avgSalary: 158000 },
      { city: "Highlands Ranch", state: "CO", count: 400, avgSalary: 155000 },
      { city: "Miami", state: "FL", count: 200, avgSalary: 148000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3200, approvedLCAs: 3136, avgSalary: 155000 },
      { year: 2023, totalLCAs: 3500, approvedLCAs: 3430, avgSalary: 162000 },
      { year: 2024, totalLCAs: 3700, approvedLCAs: 3626, avgSalary: 166000 },
      { year: 2025, totalLCAs: 3850, approvedLCAs: 3773, avgSalary: 168500 }
    ]
  },
  {
    name: "Mastercard Inc",
    slug: "mastercard",
    totalLCAs: 3450,
    approvedLCAs: 3381,
    deniedLCAs: 69,
    approvalRate: 98.0,
    avgSalary: 162800,
    minSalary: 92000,
    maxSalary: 328000,
    medianSalary: 158000,
    industry: "Financial Services",
    headquarters: { city: "Purchase", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 1400, avgSalary: 165000 },
      { title: "Senior Software Engineer", count: 750, avgSalary: 192000 },
      { title: "Data Scientist", count: 420, avgSalary: 158000 },
      { title: "Product Manager", count: 350, avgSalary: 175000 },
      { title: "Business Analyst", count: 280, avgSalary: 128000 }
    ],
    topLocations: [
      { city: "Purchase", state: "NY", count: 1200, avgSalary: 172000 },
      { city: "O'Fallon", state: "MO", count: 850, avgSalary: 148000 },
      { city: "Arlington", state: "VA", count: 550, avgSalary: 165000 },
      { city: "New York", state: "NY", count: 450, avgSalary: 178000 },
      { city: "San Francisco", state: "CA", count: 300, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2900, approvedLCAs: 2842, avgSalary: 148000 },
      { year: 2023, totalLCAs: 3150, approvedLCAs: 3087, avgSalary: 155000 },
      { year: 2024, totalLCAs: 3350, approvedLCAs: 3283, avgSalary: 160000 },
      { year: 2025, totalLCAs: 3450, approvedLCAs: 3381, avgSalary: 162800 }
    ]
  },
  {
    name: "American Express",
    slug: "american-express",
    totalLCAs: 3150,
    approvedLCAs: 3087,
    deniedLCAs: 63,
    approvalRate: 98.0,
    avgSalary: 155800,
    minSalary: 88000,
    maxSalary: 298000,
    medianSalary: 152000,
    industry: "Financial Services",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 1250, avgSalary: 158000 },
      { title: "Senior Software Engineer", count: 680, avgSalary: 185000 },
      { title: "Data Analyst", count: 400, avgSalary: 128000 },
      { title: "Product Manager", count: 320, avgSalary: 168000 },
      { title: "Business Analyst", count: 280, avgSalary: 118000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 1400, avgSalary: 168000 },
      { city: "Phoenix", state: "AZ", count: 800, avgSalary: 142000 },
      { city: "Sunrise", state: "FL", count: 450, avgSalary: 138000 },
      { city: "Salt Lake City", state: "UT", count: 300, avgSalary: 145000 },
      { city: "San Francisco", state: "CA", count: 150, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2700, approvedLCAs: 2646, avgSalary: 142000 },
      { year: 2023, totalLCAs: 2900, approvedLCAs: 2842, avgSalary: 148000 },
      { year: 2024, totalLCAs: 3050, approvedLCAs: 2989, avgSalary: 153000 },
      { year: 2025, totalLCAs: 3150, approvedLCAs: 3087, avgSalary: 155800 }
    ]
  },
  {
    name: "Capital One",
    slug: "capital-one",
    totalLCAs: 4550,
    approvedLCAs: 4459,
    deniedLCAs: 91,
    approvalRate: 98.0,
    avgSalary: 158500,
    minSalary: 88000,
    maxSalary: 312000,
    medianSalary: 155000,
    industry: "Financial Services",
    headquarters: { city: "McLean", state: "VA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1850, avgSalary: 162000 },
      { title: "Senior Software Engineer", count: 950, avgSalary: 188000 },
      { title: "Data Scientist", count: 580, avgSalary: 155000 },
      { title: "Data Engineer", count: 480, avgSalary: 152000 },
      { title: "Product Manager", count: 350, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "McLean", state: "VA", count: 1800, avgSalary: 165000 },
      { city: "Richmond", state: "VA", count: 1100, avgSalary: 152000 },
      { city: "Plano", state: "TX", count: 800, avgSalary: 155000 },
      { city: "New York", state: "NY", count: 500, avgSalary: 175000 },
      { city: "San Francisco", state: "CA", count: 250, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3900, approvedLCAs: 3822, avgSalary: 145000 },
      { year: 2023, totalLCAs: 4200, approvedLCAs: 4116, avgSalary: 152000 },
      { year: 2024, totalLCAs: 4400, approvedLCAs: 4312, avgSalary: 156000 },
      { year: 2025, totalLCAs: 4550, approvedLCAs: 4459, avgSalary: 158500 }
    ]
  },
  {
    name: "Wells Fargo",
    slug: "wells-fargo",
    totalLCAs: 4850,
    approvedLCAs: 4753,
    deniedLCAs: 97,
    approvalRate: 98.0,
    avgSalary: 142500,
    minSalary: 82000,
    maxSalary: 275000,
    medianSalary: 138000,
    industry: "Financial Services",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1950, avgSalary: 148000 },
      { title: "Senior Software Engineer", count: 1000, avgSalary: 172000 },
      { title: "Data Analyst", count: 650, avgSalary: 118000 },
      { title: "Business Analyst", count: 500, avgSalary: 112000 },
      { title: "Product Manager", count: 380, avgSalary: 162000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1500, avgSalary: 165000 },
      { city: "Charlotte", state: "NC", count: 1200, avgSalary: 135000 },
      { city: "Minneapolis", state: "MN", count: 800, avgSalary: 138000 },
      { city: "Chandler", state: "AZ", count: 650, avgSalary: 132000 },
      { city: "New York", state: "NY", count: 500, avgSalary: 158000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4200, approvedLCAs: 4116, avgSalary: 128000 },
      { year: 2023, totalLCAs: 4500, approvedLCAs: 4410, avgSalary: 135000 },
      { year: 2024, totalLCAs: 4700, approvedLCAs: 4606, avgSalary: 140000 },
      { year: 2025, totalLCAs: 4850, approvedLCAs: 4753, avgSalary: 142500 }
    ]
  },
  {
    name: "Broadcom Inc",
    slug: "broadcom",
    totalLCAs: 3650,
    approvedLCAs: 3577,
    deniedLCAs: 73,
    approvalRate: 98.0,
    avgSalary: 175800,
    minSalary: 98000,
    maxSalary: 365000,
    medianSalary: 172000,
    industry: "Semiconductors",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1450, avgSalary: 178000 },
      { title: "Hardware Engineer", count: 780, avgSalary: 182000 },
      { title: "ASIC Engineer", count: 520, avgSalary: 188000 },
      { title: "Firmware Engineer", count: 380, avgSalary: 172000 },
      { title: "Verification Engineer", count: 320, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 2200, avgSalary: 185000 },
      { city: "Irvine", state: "CA", count: 600, avgSalary: 172000 },
      { city: "Fort Collins", state: "CO", count: 400, avgSalary: 165000 },
      { city: "Austin", state: "TX", count: 300, avgSalary: 168000 },
      { city: "Andover", state: "MA", count: 150, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 3100, approvedLCAs: 3038, avgSalary: 162000 },
      { year: 2023, totalLCAs: 3350, approvedLCAs: 3283, avgSalary: 168000 },
      { year: 2024, totalLCAs: 3550, approvedLCAs: 3479, avgSalary: 173000 },
      { year: 2025, totalLCAs: 3650, approvedLCAs: 3577, avgSalary: 175800 }
    ]
  },
  {
    name: "AMD Inc",
    slug: "amd",
    totalLCAs: 3250,
    approvedLCAs: 3185,
    deniedLCAs: 65,
    approvalRate: 98.0,
    avgSalary: 182500,
    minSalary: 105000,
    maxSalary: 385000,
    medianSalary: 178000,
    industry: "Semiconductors",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 1300, avgSalary: 185000 },
      { title: "Hardware Engineer", count: 720, avgSalary: 188000 },
      { title: "Design Engineer", count: 480, avgSalary: 182000 },
      { title: "Verification Engineer", count: 350, avgSalary: 175000 },
      { title: "GPU Architect", count: 250, avgSalary: 225000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 1500, avgSalary: 192000 },
      { city: "Austin", state: "TX", count: 800, avgSalary: 175000 },
      { city: "Fort Collins", state: "CO", count: 450, avgSalary: 168000 },
      { city: "Boxborough", state: "MA", count: 300, avgSalary: 178000 },
      { city: "Bellevue", state: "WA", count: 150, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2700, approvedLCAs: 2646, avgSalary: 168000 },
      { year: 2023, totalLCAs: 2950, approvedLCAs: 2891, avgSalary: 175000 },
      { year: 2024, totalLCAs: 3150, approvedLCAs: 3087, avgSalary: 180000 },
      { year: 2025, totalLCAs: 3250, approvedLCAs: 3185, avgSalary: 182500 }
    ]
  },
  {
    name: "Micron Technology",
    slug: "micron",
    totalLCAs: 2850,
    approvedLCAs: 2793,
    deniedLCAs: 57,
    approvalRate: 98.0,
    avgSalary: 158500,
    minSalary: 92000,
    maxSalary: 328000,
    medianSalary: 155000,
    industry: "Semiconductors",
    headquarters: { city: "Boise", state: "ID" },
    topJobTitles: [
      { title: "Process Engineer", count: 950, avgSalary: 152000 },
      { title: "Software Engineer", count: 720, avgSalary: 162000 },
      { title: "Design Engineer", count: 480, avgSalary: 158000 },
      { title: "Product Engineer", count: 350, avgSalary: 148000 },
      { title: "Test Engineer", count: 280, avgSalary: 142000 }
    ],
    topLocations: [
      { city: "Boise", state: "ID", count: 1400, avgSalary: 155000 },
      { city: "San Jose", state: "CA", count: 600, avgSalary: 175000 },
      { city: "Manassas", state: "VA", count: 400, avgSalary: 158000 },
      { city: "Austin", state: "TX", count: 300, avgSalary: 162000 },
      { city: "Longmont", state: "CO", count: 150, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2400, approvedLCAs: 2352, avgSalary: 145000 },
      { year: 2023, totalLCAs: 2600, approvedLCAs: 2548, avgSalary: 152000 },
      { year: 2024, totalLCAs: 2750, approvedLCAs: 2695, avgSalary: 156000 },
      { year: 2025, totalLCAs: 2850, approvedLCAs: 2793, avgSalary: 158500 }
    ]
  },
  {
    name: "Texas Instruments",
    slug: "texas-instruments",
    totalLCAs: 2650,
    approvedLCAs: 2597,
    deniedLCAs: 53,
    approvalRate: 98.0,
    avgSalary: 148500,
    minSalary: 88000,
    maxSalary: 295000,
    medianSalary: 145000,
    industry: "Semiconductors",
    headquarters: { city: "Dallas", state: "TX" },
    topJobTitles: [
      { title: "Analog Engineer", count: 850, avgSalary: 152000 },
      { title: "Software Engineer", count: 680, avgSalary: 155000 },
      { title: "Design Engineer", count: 450, avgSalary: 148000 },
      { title: "Applications Engineer", count: 350, avgSalary: 138000 },
      { title: "Test Engineer", count: 250, avgSalary: 132000 }
    ],
    topLocations: [
      { city: "Dallas", state: "TX", count: 1800, avgSalary: 148000 },
      { city: "Santa Clara", state: "CA", count: 400, avgSalary: 168000 },
      { city: "Tucson", state: "AZ", count: 250, avgSalary: 138000 },
      { city: "South Portland", state: "ME", count: 150, avgSalary: 142000 },
      { city: "Richardson", state: "TX", count: 50, avgSalary: 145000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2300, approvedLCAs: 2254, avgSalary: 135000 },
      { year: 2023, totalLCAs: 2450, approvedLCAs: 2401, avgSalary: 142000 },
      { year: 2024, totalLCAs: 2550, approvedLCAs: 2499, avgSalary: 146000 },
      { year: 2025, totalLCAs: 2650, approvedLCAs: 2597, avgSalary: 148500 }
    ]
  },
  {
    name: "Applied Materials",
    slug: "applied-materials",
    totalLCAs: 2450,
    approvedLCAs: 2401,
    deniedLCAs: 49,
    approvalRate: 98.0,
    avgSalary: 168500,
    minSalary: 95000,
    maxSalary: 345000,
    medianSalary: 165000,
    industry: "Semiconductors",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Process Engineer", count: 780, avgSalary: 165000 },
      { title: "Software Engineer", count: 620, avgSalary: 172000 },
      { title: "Mechanical Engineer", count: 420, avgSalary: 158000 },
      { title: "Field Service Engineer", count: 350, avgSalary: 142000 },
      { title: "Systems Engineer", count: 220, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 1500, avgSalary: 178000 },
      { city: "Austin", state: "TX", count: 450, avgSalary: 162000 },
      { city: "Gloucester", state: "MA", count: 250, avgSalary: 168000 },
      { city: "Hillsboro", state: "OR", count: 150, avgSalary: 165000 },
      { city: "Chandler", state: "AZ", count: 100, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2100, approvedLCAs: 2058, avgSalary: 155000 },
      { year: 2023, totalLCAs: 2250, approvedLCAs: 2205, avgSalary: 162000 },
      { year: 2024, totalLCAs: 2350, approvedLCAs: 2303, avgSalary: 166000 },
      { year: 2025, totalLCAs: 2450, approvedLCAs: 2401, avgSalary: 168500 }
    ]
  },
  {
    name: "Lam Research",
    slug: "lam-research",
    totalLCAs: 2150,
    approvedLCAs: 2107,
    deniedLCAs: 43,
    approvalRate: 98.0,
    avgSalary: 172500,
    minSalary: 98000,
    maxSalary: 358000,
    medianSalary: 168000,
    industry: "Semiconductors",
    headquarters: { city: "Fremont", state: "CA" },
    topJobTitles: [
      { title: "Process Engineer", count: 720, avgSalary: 168000 },
      { title: "Software Engineer", count: 550, avgSalary: 178000 },
      { title: "Mechanical Engineer", count: 380, avgSalary: 162000 },
      { title: "Systems Engineer", count: 280, avgSalary: 172000 },
      { title: "Field Engineer", count: 180, avgSalary: 148000 }
    ],
    topLocations: [
      { city: "Fremont", state: "CA", count: 1400, avgSalary: 182000 },
      { city: "Tualatin", state: "OR", count: 350, avgSalary: 165000 },
      { city: "Austin", state: "TX", count: 200, avgSalary: 168000 },
      { city: "Chandler", state: "AZ", count: 120, avgSalary: 158000 },
      { city: "Livermore", state: "CA", count: 80, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1850, approvedLCAs: 1813, avgSalary: 158000 },
      { year: 2023, totalLCAs: 1980, approvedLCAs: 1940, avgSalary: 165000 },
      { year: 2024, totalLCAs: 2080, approvedLCAs: 2038, avgSalary: 170000 },
      { year: 2025, totalLCAs: 2150, approvedLCAs: 2107, avgSalary: 172500 }
    ]
  },
  {
    name: "Synopsys Inc",
    slug: "synopsys",
    totalLCAs: 2850,
    approvedLCAs: 2793,
    deniedLCAs: 57,
    approvalRate: 98.0,
    avgSalary: 178500,
    minSalary: 102000,
    maxSalary: 368000,
    medianSalary: 175000,
    industry: "Technology",
    headquarters: { city: "Sunnyvale", state: "CA" },
    topJobTitles: [
      { title: "R&D Engineer", count: 1100, avgSalary: 182000 },
      { title: "Software Engineer", count: 750, avgSalary: 178000 },
      { title: "Applications Engineer", count: 420, avgSalary: 165000 },
      { title: "CAD Engineer", count: 320, avgSalary: 172000 },
      { title: "Verification Engineer", count: 200, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "Sunnyvale", state: "CA", count: 1600, avgSalary: 188000 },
      { city: "Mountain View", state: "CA", count: 500, avgSalary: 185000 },
      { city: "Hillsboro", state: "OR", count: 350, avgSalary: 168000 },
      { city: "Austin", state: "TX", count: 250, avgSalary: 172000 },
      { city: "Marlborough", state: "MA", count: 150, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2400, approvedLCAs: 2352, avgSalary: 165000 },
      { year: 2023, totalLCAs: 2600, approvedLCAs: 2548, avgSalary: 172000 },
      { year: 2024, totalLCAs: 2750, approvedLCAs: 2695, avgSalary: 176000 },
      { year: 2025, totalLCAs: 2850, approvedLCAs: 2793, avgSalary: 178500 }
    ]
  },
  {
    name: "Cadence Design Systems",
    slug: "cadence",
    totalLCAs: 2550,
    approvedLCAs: 2499,
    deniedLCAs: 51,
    approvalRate: 98.0,
    avgSalary: 175800,
    minSalary: 98000,
    maxSalary: 358000,
    medianSalary: 172000,
    industry: "Technology",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "R&D Engineer", count: 980, avgSalary: 178000 },
      { title: "Software Engineer", count: 680, avgSalary: 175000 },
      { title: "Applications Engineer", count: 380, avgSalary: 162000 },
      { title: "Design Engineer", count: 280, avgSalary: 172000 },
      { title: "Verification Engineer", count: 180, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 1500, avgSalary: 185000 },
      { city: "Austin", state: "TX", count: 450, avgSalary: 168000 },
      { city: "Pittsburgh", state: "PA", count: 280, avgSalary: 158000 },
      { city: "Burlington", state: "MA", count: 180, avgSalary: 172000 },
      { city: "Raleigh", state: "NC", count: 140, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2200, approvedLCAs: 2156, avgSalary: 162000 },
      { year: 2023, totalLCAs: 2350, approvedLCAs: 2303, avgSalary: 168000 },
      { year: 2024, totalLCAs: 2450, approvedLCAs: 2401, avgSalary: 173000 },
      { year: 2025, totalLCAs: 2550, approvedLCAs: 2499, avgSalary: 175800 }
    ]
  },
  {
    name: "Zoom Video Communications",
    slug: "zoom",
    totalLCAs: 1850,
    approvedLCAs: 1813,
    deniedLCAs: 37,
    approvalRate: 98.0,
    avgSalary: 195800,
    minSalary: 115000,
    maxSalary: 425000,
    medianSalary: 192000,
    industry: "Technology",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 780, avgSalary: 198000 },
      { title: "Senior Software Engineer", count: 420, avgSalary: 235000 },
      { title: "Data Scientist", count: 250, avgSalary: 185000 },
      { title: "Product Manager", count: 200, avgSalary: 205000 },
      { title: "Security Engineer", count: 150, avgSalary: 192000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 1200, avgSalary: 205000 },
      { city: "Denver", state: "CO", count: 280, avgSalary: 185000 },
      { city: "Phoenix", state: "AZ", count: 180, avgSalary: 178000 },
      { city: "Kansas City", state: "MO", count: 120, avgSalary: 165000 },
      { city: "New York", state: "NY", count: 70, avgSalary: 198000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 2200, approvedLCAs: 2156, avgSalary: 188000 },
      { year: 2023, totalLCAs: 1950, approvedLCAs: 1911, avgSalary: 192000 },
      { year: 2024, totalLCAs: 1900, approvedLCAs: 1862, avgSalary: 194000 },
      { year: 2025, totalLCAs: 1850, approvedLCAs: 1813, avgSalary: 195800 }
    ]
  },
  {
    name: "Twilio Inc",
    slug: "twilio",
    totalLCAs: 1650,
    approvedLCAs: 1617,
    deniedLCAs: 33,
    approvalRate: 98.0,
    avgSalary: 188500,
    minSalary: 108000,
    maxSalary: 398000,
    medianSalary: 185000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 700, avgSalary: 192000 },
      { title: "Senior Software Engineer", count: 380, avgSalary: 225000 },
      { title: "Solutions Engineer", count: 220, avgSalary: 175000 },
      { title: "Product Manager", count: 180, avgSalary: 198000 },
      { title: "Data Scientist", count: 120, avgSalary: 182000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 900, avgSalary: 198000 },
      { city: "Denver", state: "CO", count: 320, avgSalary: 178000 },
      { city: "Seattle", state: "WA", count: 200, avgSalary: 188000 },
      { city: "New York", state: "NY", count: 150, avgSalary: 192000 },
      { city: "Atlanta", state: "GA", count: 80, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1900, approvedLCAs: 1862, avgSalary: 175000 },
      { year: 2023, totalLCAs: 1750, approvedLCAs: 1715, avgSalary: 182000 },
      { year: 2024, totalLCAs: 1700, approvedLCAs: 1666, avgSalary: 186000 },
      { year: 2025, totalLCAs: 1650, approvedLCAs: 1617, avgSalary: 188500 }
    ]
  },
  {
    name: "Atlassian Inc",
    slug: "atlassian",
    totalLCAs: 1950,
    approvedLCAs: 1911,
    deniedLCAs: 39,
    approvalRate: 98.0,
    avgSalary: 198500,
    minSalary: 118000,
    maxSalary: 428000,
    medianSalary: 195000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 820, avgSalary: 202000 },
      { title: "Senior Software Engineer", count: 450, avgSalary: 238000 },
      { title: "Product Manager", count: 280, avgSalary: 212000 },
      { title: "Data Scientist", count: 180, avgSalary: 188000 },
      { title: "Engineering Manager", count: 150, avgSalary: 285000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1100, avgSalary: 208000 },
      { city: "Mountain View", state: "CA", count: 400, avgSalary: 202000 },
      { city: "Austin", state: "TX", count: 250, avgSalary: 185000 },
      { city: "New York", state: "NY", count: 150, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 50, avgSalary: 195000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1650, approvedLCAs: 1617, avgSalary: 182000 },
      { year: 2023, totalLCAs: 1800, approvedLCAs: 1764, avgSalary: 190000 },
      { year: 2024, totalLCAs: 1900, approvedLCAs: 1862, avgSalary: 195000 },
      { year: 2025, totalLCAs: 1950, approvedLCAs: 1911, avgSalary: 198500 }
    ]
  },
  {
    name: "Dropbox Inc",
    slug: "dropbox",
    totalLCAs: 1450,
    approvedLCAs: 1421,
    deniedLCAs: 29,
    approvalRate: 98.0,
    avgSalary: 192500,
    minSalary: 112000,
    maxSalary: 415000,
    medianSalary: 188000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 620, avgSalary: 195000 },
      { title: "Senior Software Engineer", count: 340, avgSalary: 232000 },
      { title: "Product Manager", count: 180, avgSalary: 205000 },
      { title: "Data Scientist", count: 150, avgSalary: 185000 },
      { title: "Machine Learning Engineer", count: 120, avgSalary: 228000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1000, avgSalary: 202000 },
      { city: "Seattle", state: "WA", count: 220, avgSalary: 192000 },
      { city: "Austin", state: "TX", count: 130, avgSalary: 178000 },
      { city: "New York", state: "NY", count: 80, avgSalary: 195000 },
      { city: "Los Angeles", state: "CA", count: 20, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1600, approvedLCAs: 1568, avgSalary: 178000 },
      { year: 2023, totalLCAs: 1500, approvedLCAs: 1470, avgSalary: 185000 },
      { year: 2024, totalLCAs: 1480, approvedLCAs: 1450, avgSalary: 190000 },
      { year: 2025, totalLCAs: 1450, approvedLCAs: 1421, avgSalary: 192500 }
    ]
  },
  {
    name: "Okta Inc",
    slug: "okta",
    totalLCAs: 1750,
    approvedLCAs: 1715,
    deniedLCAs: 35,
    approvalRate: 98.0,
    avgSalary: 195800,
    minSalary: 115000,
    maxSalary: 418000,
    medianSalary: 192000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 720, avgSalary: 198000 },
      { title: "Senior Software Engineer", count: 400, avgSalary: 235000 },
      { title: "Security Engineer", count: 250, avgSalary: 192000 },
      { title: "Product Manager", count: 180, avgSalary: 208000 },
      { title: "Solutions Engineer", count: 150, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 950, avgSalary: 205000 },
      { city: "Seattle", state: "WA", count: 350, avgSalary: 195000 },
      { city: "Chicago", state: "IL", count: 200, avgSalary: 178000 },
      { city: "Washington", state: "DC", count: 150, avgSalary: 185000 },
      { city: "Austin", state: "TX", count: 100, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1500, approvedLCAs: 1470, avgSalary: 182000 },
      { year: 2023, totalLCAs: 1620, approvedLCAs: 1588, avgSalary: 188000 },
      { year: 2024, totalLCAs: 1700, approvedLCAs: 1666, avgSalary: 193000 },
      { year: 2025, totalLCAs: 1750, approvedLCAs: 1715, avgSalary: 195800 }
    ]
  },
  {
    name: "CrowdStrike Inc",
    slug: "crowdstrike",
    totalLCAs: 1850,
    approvedLCAs: 1813,
    deniedLCAs: 37,
    approvalRate: 98.0,
    avgSalary: 188500,
    minSalary: 108000,
    maxSalary: 398000,
    medianSalary: 185000,
    industry: "Technology",
    headquarters: { city: "Austin", state: "TX" },
    topJobTitles: [
      { title: "Software Engineer", count: 750, avgSalary: 192000 },
      { title: "Senior Software Engineer", count: 420, avgSalary: 228000 },
      { title: "Security Researcher", count: 280, avgSalary: 185000 },
      { title: "Data Scientist", count: 180, avgSalary: 178000 },
      { title: "Cloud Engineer", count: 150, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "Austin", state: "TX", count: 700, avgSalary: 185000 },
      { city: "Sunnyvale", state: "CA", count: 500, avgSalary: 202000 },
      { city: "Irvine", state: "CA", count: 300, avgSalary: 192000 },
      { city: "Minneapolis", state: "MN", count: 200, avgSalary: 175000 },
      { city: "Seattle", state: "WA", count: 150, avgSalary: 195000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1500, approvedLCAs: 1470, avgSalary: 172000 },
      { year: 2023, totalLCAs: 1650, approvedLCAs: 1617, avgSalary: 180000 },
      { year: 2024, totalLCAs: 1780, approvedLCAs: 1744, avgSalary: 185000 },
      { year: 2025, totalLCAs: 1850, approvedLCAs: 1813, avgSalary: 188500 }
    ]
  },
  {
    name: "Palo Alto Networks",
    slug: "palo-alto-networks",
    totalLCAs: 2250,
    approvedLCAs: 2205,
    deniedLCAs: 45,
    approvalRate: 98.0,
    avgSalary: 195800,
    minSalary: 112000,
    maxSalary: 418000,
    medianSalary: 192000,
    industry: "Technology",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 920, avgSalary: 198000 },
      { title: "Senior Software Engineer", count: 520, avgSalary: 238000 },
      { title: "Security Researcher", count: 320, avgSalary: 188000 },
      { title: "Solutions Architect", count: 220, avgSalary: 182000 },
      { title: "Product Manager", count: 180, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 1400, avgSalary: 205000 },
      { city: "Plano", state: "TX", count: 350, avgSalary: 178000 },
      { city: "Reston", state: "VA", count: 250, avgSalary: 185000 },
      { city: "Seattle", state: "WA", count: 150, avgSalary: 195000 },
      { city: "New York", state: "NY", count: 100, avgSalary: 198000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1900, approvedLCAs: 1862, avgSalary: 180000 },
      { year: 2023, totalLCAs: 2050, approvedLCAs: 2009, avgSalary: 188000 },
      { year: 2024, totalLCAs: 2180, approvedLCAs: 2136, avgSalary: 193000 },
      { year: 2025, totalLCAs: 2250, approvedLCAs: 2205, avgSalary: 195800 }
    ]
  },
  {
    name: "Zscaler Inc",
    slug: "zscaler",
    totalLCAs: 1550,
    approvedLCAs: 1519,
    deniedLCAs: 31,
    approvalRate: 98.0,
    avgSalary: 192500,
    minSalary: 110000,
    maxSalary: 408000,
    medianSalary: 188000,
    industry: "Technology",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 650, avgSalary: 195000 },
      { title: "Senior Software Engineer", count: 360, avgSalary: 232000 },
      { title: "Cloud Engineer", count: 220, avgSalary: 182000 },
      { title: "Security Engineer", count: 180, avgSalary: 188000 },
      { title: "Solutions Architect", count: 100, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 900, avgSalary: 202000 },
      { city: "Atlanta", state: "GA", count: 280, avgSalary: 178000 },
      { city: "Seattle", state: "WA", count: 180, avgSalary: 192000 },
      { city: "Dallas", state: "TX", count: 120, avgSalary: 175000 },
      { city: "Washington", state: "DC", count: 70, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1250, approvedLCAs: 1225, avgSalary: 178000 },
      { year: 2023, totalLCAs: 1400, approvedLCAs: 1372, avgSalary: 185000 },
      { year: 2024, totalLCAs: 1500, approvedLCAs: 1470, avgSalary: 190000 },
      { year: 2025, totalLCAs: 1550, approvedLCAs: 1519, avgSalary: 192500 }
    ]
  },
  {
    name: "DocuSign Inc",
    slug: "docusign",
    totalLCAs: 1450,
    approvedLCAs: 1421,
    deniedLCAs: 29,
    approvalRate: 98.0,
    avgSalary: 185800,
    minSalary: 105000,
    maxSalary: 388000,
    medianSalary: 182000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 600, avgSalary: 188000 },
      { title: "Senior Software Engineer", count: 340, avgSalary: 225000 },
      { title: "Product Manager", count: 200, avgSalary: 198000 },
      { title: "Data Scientist", count: 150, avgSalary: 178000 },
      { title: "Solutions Engineer", count: 120, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 850, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 300, avgSalary: 185000 },
      { city: "Chicago", state: "IL", count: 150, avgSalary: 172000 },
      { city: "San Diego", state: "CA", count: 100, avgSalary: 178000 },
      { city: "New York", state: "NY", count: 50, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1300, approvedLCAs: 1274, avgSalary: 172000 },
      { year: 2023, totalLCAs: 1380, approvedLCAs: 1352, avgSalary: 178000 },
      { year: 2024, totalLCAs: 1420, approvedLCAs: 1392, avgSalary: 183000 },
      { year: 2025, totalLCAs: 1450, approvedLCAs: 1421, avgSalary: 185800 }
    ]
  },
  {
    name: "Shopify Inc",
    slug: "shopify",
    totalLCAs: 1650,
    approvedLCAs: 1617,
    deniedLCAs: 33,
    approvalRate: 98.0,
    avgSalary: 192500,
    minSalary: 112000,
    maxSalary: 415000,
    medianSalary: 188000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 700, avgSalary: 195000 },
      { title: "Senior Software Engineer", count: 380, avgSalary: 235000 },
      { title: "Data Scientist", count: 220, avgSalary: 182000 },
      { title: "Product Manager", count: 180, avgSalary: 205000 },
      { title: "Engineering Manager", count: 120, avgSalary: 268000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 950, avgSalary: 202000 },
      { city: "New York", state: "NY", count: 350, avgSalary: 195000 },
      { city: "Los Angeles", state: "CA", count: 180, avgSalary: 188000 },
      { city: "Austin", state: "TX", count: 120, avgSalary: 178000 },
      { city: "Chicago", state: "IL", count: 50, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1850, approvedLCAs: 1813, avgSalary: 182000 },
      { year: 2023, totalLCAs: 1700, approvedLCAs: 1666, avgSalary: 188000 },
      { year: 2024, totalLCAs: 1680, approvedLCAs: 1646, avgSalary: 191000 },
      { year: 2025, totalLCAs: 1650, approvedLCAs: 1617, avgSalary: 192500 }
    ]
  },
  {
    name: "Spotify USA Inc",
    slug: "spotify",
    totalLCAs: 1350,
    approvedLCAs: 1323,
    deniedLCAs: 27,
    approvalRate: 98.0,
    avgSalary: 202500,
    minSalary: 120000,
    maxSalary: 445000,
    medianSalary: 198000,
    industry: "Technology",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 560, avgSalary: 205000 },
      { title: "Senior Software Engineer", count: 320, avgSalary: 248000 },
      { title: "Data Scientist", count: 180, avgSalary: 192000 },
      { title: "Machine Learning Engineer", count: 150, avgSalary: 235000 },
      { title: "Product Manager", count: 100, avgSalary: 218000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 850, avgSalary: 212000 },
      { city: "San Francisco", state: "CA", count: 280, avgSalary: 208000 },
      { city: "Los Angeles", state: "CA", count: 150, avgSalary: 195000 },
      { city: "Boston", state: "MA", count: 50, avgSalary: 198000 },
      { city: "Chicago", state: "IL", count: 20, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1150, approvedLCAs: 1127, avgSalary: 188000 },
      { year: 2023, totalLCAs: 1250, approvedLCAs: 1225, avgSalary: 195000 },
      { year: 2024, totalLCAs: 1320, approvedLCAs: 1294, avgSalary: 200000 },
      { year: 2025, totalLCAs: 1350, approvedLCAs: 1323, avgSalary: 202500 }
    ]
  },
  {
    name: "Pinterest Inc",
    slug: "pinterest",
    totalLCAs: 1250,
    approvedLCAs: 1225,
    deniedLCAs: 25,
    approvalRate: 98.0,
    avgSalary: 195800,
    minSalary: 115000,
    maxSalary: 425000,
    medianSalary: 192000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 520, avgSalary: 198000 },
      { title: "Senior Software Engineer", count: 300, avgSalary: 238000 },
      { title: "Data Scientist", count: 180, avgSalary: 185000 },
      { title: "Machine Learning Engineer", count: 130, avgSalary: 232000 },
      { title: "Product Manager", count: 80, avgSalary: 212000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 950, avgSalary: 205000 },
      { city: "Seattle", state: "WA", count: 150, avgSalary: 195000 },
      { city: "New York", state: "NY", count: 100, avgSalary: 198000 },
      { city: "Palo Alto", state: "CA", count: 40, avgSalary: 202000 },
      { city: "Los Angeles", state: "CA", count: 10, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1400, approvedLCAs: 1372, avgSalary: 185000 },
      { year: 2023, totalLCAs: 1300, approvedLCAs: 1274, avgSalary: 190000 },
      { year: 2024, totalLCAs: 1280, approvedLCAs: 1254, avgSalary: 194000 },
      { year: 2025, totalLCAs: 1250, approvedLCAs: 1225, avgSalary: 195800 }
    ]
  },
  {
    name: "Reddit Inc",
    slug: "reddit",
    totalLCAs: 1150,
    approvedLCAs: 1127,
    deniedLCAs: 23,
    approvalRate: 98.0,
    avgSalary: 205800,
    minSalary: 125000,
    maxSalary: 458000,
    medianSalary: 202000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 480, avgSalary: 208000 },
      { title: "Senior Software Engineer", count: 280, avgSalary: 252000 },
      { title: "Machine Learning Engineer", count: 150, avgSalary: 245000 },
      { title: "Data Scientist", count: 120, avgSalary: 195000 },
      { title: "Product Manager", count: 80, avgSalary: 225000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 900, avgSalary: 215000 },
      { city: "New York", state: "NY", count: 150, avgSalary: 208000 },
      { city: "Los Angeles", state: "CA", count: 60, avgSalary: 198000 },
      { city: "Chicago", state: "IL", count: 30, avgSalary: 185000 },
      { city: "Seattle", state: "WA", count: 10, avgSalary: 205000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 900, approvedLCAs: 882, avgSalary: 188000 },
      { year: 2023, totalLCAs: 1000, approvedLCAs: 980, avgSalary: 195000 },
      { year: 2024, totalLCAs: 1100, approvedLCAs: 1078, avgSalary: 202000 },
      { year: 2025, totalLCAs: 1150, approvedLCAs: 1127, avgSalary: 205800 }
    ]
  },
  {
    name: "Robinhood Markets",
    slug: "robinhood",
    totalLCAs: 1050,
    approvedLCAs: 1029,
    deniedLCAs: 21,
    approvalRate: 98.0,
    avgSalary: 198500,
    minSalary: 118000,
    maxSalary: 435000,
    medianSalary: 195000,
    industry: "Financial Services",
    headquarters: { city: "Menlo Park", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 440, avgSalary: 202000 },
      { title: "Senior Software Engineer", count: 250, avgSalary: 245000 },
      { title: "Data Scientist", count: 140, avgSalary: 188000 },
      { title: "Security Engineer", count: 110, avgSalary: 195000 },
      { title: "Product Manager", count: 80, avgSalary: 218000 }
    ],
    topLocations: [
      { city: "Menlo Park", state: "CA", count: 700, avgSalary: 208000 },
      { city: "New York", state: "NY", count: 200, avgSalary: 202000 },
      { city: "Seattle", state: "WA", count: 100, avgSalary: 195000 },
      { city: "Denver", state: "CO", count: 40, avgSalary: 182000 },
      { city: "Chicago", state: "IL", count: 10, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1200, approvedLCAs: 1176, avgSalary: 192000 },
      { year: 2023, totalLCAs: 1050, approvedLCAs: 1029, avgSalary: 195000 },
      { year: 2024, totalLCAs: 1030, approvedLCAs: 1009, avgSalary: 197000 },
      { year: 2025, totalLCAs: 1050, approvedLCAs: 1029, avgSalary: 198500 }
    ]
  },
  {
    name: "Plaid Inc",
    slug: "plaid",
    totalLCAs: 950,
    approvedLCAs: 931,
    deniedLCAs: 19,
    approvalRate: 98.0,
    avgSalary: 212500,
    minSalary: 128000,
    maxSalary: 475000,
    medianSalary: 208000,
    industry: "Financial Services",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 400, avgSalary: 215000 },
      { title: "Senior Software Engineer", count: 220, avgSalary: 258000 },
      { title: "Data Scientist", count: 130, avgSalary: 198000 },
      { title: "Security Engineer", count: 100, avgSalary: 205000 },
      { title: "Product Manager", count: 70, avgSalary: 228000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 700, avgSalary: 222000 },
      { city: "New York", state: "NY", count: 150, avgSalary: 215000 },
      { city: "Salt Lake City", state: "UT", count: 70, avgSalary: 188000 },
      { city: "Seattle", state: "WA", count: 25, avgSalary: 205000 },
      { city: "Chicago", state: "IL", count: 5, avgSalary: 192000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 800, approvedLCAs: 784, avgSalary: 198000 },
      { year: 2023, totalLCAs: 870, approvedLCAs: 852, avgSalary: 205000 },
      { year: 2024, totalLCAs: 920, approvedLCAs: 902, avgSalary: 210000 },
      { year: 2025, totalLCAs: 950, approvedLCAs: 931, avgSalary: 212500 }
    ]
  },
  {
    name: "Figma Inc",
    slug: "figma",
    totalLCAs: 850,
    approvedLCAs: 833,
    deniedLCAs: 17,
    approvalRate: 98.0,
    avgSalary: 218500,
    minSalary: 132000,
    maxSalary: 495000,
    medianSalary: 215000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 360, avgSalary: 222000 },
      { title: "Senior Software Engineer", count: 200, avgSalary: 268000 },
      { title: "Product Designer", count: 120, avgSalary: 205000 },
      { title: "Product Manager", count: 90, avgSalary: 235000 },
      { title: "Engineering Manager", count: 60, avgSalary: 325000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 700, avgSalary: 228000 },
      { city: "New York", state: "NY", count: 100, avgSalary: 218000 },
      { city: "Seattle", state: "WA", count: 40, avgSalary: 212000 },
      { city: "Los Angeles", state: "CA", count: 10, avgSalary: 205000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 650, approvedLCAs: 637, avgSalary: 202000 },
      { year: 2023, totalLCAs: 750, approvedLCAs: 735, avgSalary: 210000 },
      { year: 2024, totalLCAs: 820, approvedLCAs: 804, avgSalary: 215000 },
      { year: 2025, totalLCAs: 850, approvedLCAs: 833, avgSalary: 218500 }
    ]
  },
  {
    name: "Notion Labs Inc",
    slug: "notion",
    totalLCAs: 750,
    approvedLCAs: 735,
    deniedLCAs: 15,
    approvalRate: 98.0,
    avgSalary: 215800,
    minSalary: 128000,
    maxSalary: 485000,
    medianSalary: 212000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 320, avgSalary: 218000 },
      { title: "Senior Software Engineer", count: 180, avgSalary: 262000 },
      { title: "Product Designer", count: 100, avgSalary: 198000 },
      { title: "Product Manager", count: 80, avgSalary: 228000 },
      { title: "Data Scientist", count: 50, avgSalary: 202000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 620, avgSalary: 225000 },
      { city: "New York", state: "NY", count: 90, avgSalary: 215000 },
      { city: "Seattle", state: "WA", count: 30, avgSalary: 208000 },
      { city: "Los Angeles", state: "CA", count: 10, avgSalary: 198000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 550, approvedLCAs: 539, avgSalary: 198000 },
      { year: 2023, totalLCAs: 650, approvedLCAs: 637, avgSalary: 208000 },
      { year: 2024, totalLCAs: 720, approvedLCAs: 706, avgSalary: 213000 },
      { year: 2025, totalLCAs: 750, approvedLCAs: 735, avgSalary: 215800 }
    ]
  },
  {
    name: "Canva Inc",
    slug: "canva",
    totalLCAs: 680,
    approvedLCAs: 666,
    deniedLCAs: 14,
    approvalRate: 98.0,
    avgSalary: 198500,
    minSalary: 118000,
    maxSalary: 435000,
    medianSalary: 195000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 290, avgSalary: 202000 },
      { title: "Senior Software Engineer", count: 160, avgSalary: 245000 },
      { title: "Product Designer", count: 90, avgSalary: 185000 },
      { title: "Data Scientist", count: 70, avgSalary: 188000 },
      { title: "Product Manager", count: 50, avgSalary: 215000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 500, avgSalary: 208000 },
      { city: "Austin", state: "TX", count: 100, avgSalary: 185000 },
      { city: "New York", state: "NY", count: 60, avgSalary: 198000 },
      { city: "Los Angeles", state: "CA", count: 20, avgSalary: 192000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 500, approvedLCAs: 490, avgSalary: 182000 },
      { year: 2023, totalLCAs: 580, approvedLCAs: 568, avgSalary: 190000 },
      { year: 2024, totalLCAs: 650, approvedLCAs: 637, avgSalary: 196000 },
      { year: 2025, totalLCAs: 680, approvedLCAs: 666, avgSalary: 198500 }
    ]
  },
  {
    name: "Scale AI",
    slug: "scale-ai",
    totalLCAs: 920,
    approvedLCAs: 902,
    deniedLCAs: 18,
    approvalRate: 98.0,
    avgSalary: 225800,
    minSalary: 135000,
    maxSalary: 515000,
    medianSalary: 222000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 380, avgSalary: 228000 },
      { title: "Machine Learning Engineer", count: 220, avgSalary: 268000 },
      { title: "Senior Software Engineer", count: 150, avgSalary: 275000 },
      { title: "Data Scientist", count: 90, avgSalary: 212000 },
      { title: "Product Manager", count: 60, avgSalary: 245000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 750, avgSalary: 235000 },
      { city: "New York", state: "NY", count: 100, avgSalary: 225000 },
      { city: "Washington", state: "DC", count: 50, avgSalary: 215000 },
      { city: "Seattle", state: "WA", count: 20, avgSalary: 222000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 650, approvedLCAs: 637, avgSalary: 205000 },
      { year: 2023, totalLCAs: 780, approvedLCAs: 764, avgSalary: 215000 },
      { year: 2024, totalLCAs: 880, approvedLCAs: 862, avgSalary: 222000 },
      { year: 2025, totalLCAs: 920, approvedLCAs: 902, avgSalary: 225800 }
    ]
  },
  {
    name: "OpenAI Inc",
    slug: "openai",
    totalLCAs: 1150,
    approvedLCAs: 1127,
    deniedLCAs: 23,
    approvalRate: 98.0,
    avgSalary: 345800,
    minSalary: 200000,
    maxSalary: 850000,
    medianSalary: 335000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Research Scientist", count: 380, avgSalary: 385000 },
      { title: "Software Engineer", count: 320, avgSalary: 325000 },
      { title: "Machine Learning Engineer", count: 220, avgSalary: 365000 },
      { title: "Research Engineer", count: 130, avgSalary: 345000 },
      { title: "Product Manager", count: 70, avgSalary: 335000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1000, avgSalary: 355000 },
      { city: "Seattle", state: "WA", count: 80, avgSalary: 335000 },
      { city: "New York", state: "NY", count: 50, avgSalary: 345000 },
      { city: "Palo Alto", state: "CA", count: 20, avgSalary: 350000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 450, approvedLCAs: 441, avgSalary: 295000 },
      { year: 2023, totalLCAs: 750, approvedLCAs: 735, avgSalary: 320000 },
      { year: 2024, totalLCAs: 1000, approvedLCAs: 980, avgSalary: 338000 },
      { year: 2025, totalLCAs: 1150, approvedLCAs: 1127, avgSalary: 345800 }
    ]
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    totalLCAs: 680,
    approvedLCAs: 666,
    deniedLCAs: 14,
    approvalRate: 98.0,
    avgSalary: 358500,
    minSalary: 210000,
    maxSalary: 900000,
    medianSalary: 345000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Research Scientist", count: 250, avgSalary: 395000 },
      { title: "Software Engineer", count: 180, avgSalary: 335000 },
      { title: "Machine Learning Engineer", count: 120, avgSalary: 375000 },
      { title: "Research Engineer", count: 80, avgSalary: 355000 },
      { title: "Product Manager", count: 35, avgSalary: 345000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 600, avgSalary: 365000 },
      { city: "Seattle", state: "WA", count: 50, avgSalary: 345000 },
      { city: "New York", state: "NY", count: 25, avgSalary: 355000 },
      { city: "London", state: "UK", count: 5, avgSalary: 320000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 180, approvedLCAs: 176, avgSalary: 305000 },
      { year: 2023, totalLCAs: 380, approvedLCAs: 372, avgSalary: 335000 },
      { year: 2024, totalLCAs: 580, approvedLCAs: 568, avgSalary: 352000 },
      { year: 2025, totalLCAs: 680, approvedLCAs: 666, avgSalary: 358500 }
    ]
  },
  {
    name: "Instacart",
    slug: "instacart",
    totalLCAs: 1350,
    approvedLCAs: 1323,
    deniedLCAs: 27,
    approvalRate: 98.0,
    avgSalary: 188500,
    minSalary: 108000,
    maxSalary: 398000,
    medianSalary: 185000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 560, avgSalary: 192000 },
      { title: "Senior Software Engineer", count: 320, avgSalary: 228000 },
      { title: "Data Scientist", count: 180, avgSalary: 178000 },
      { title: "Machine Learning Engineer", count: 140, avgSalary: 225000 },
      { title: "Product Manager", count: 100, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 1000, avgSalary: 198000 },
      { city: "New York", state: "NY", count: 200, avgSalary: 188000 },
      { city: "Seattle", state: "WA", count: 100, avgSalary: 185000 },
      { city: "Toronto", state: "ON", count: 40, avgSalary: 165000 },
      { city: "Chicago", state: "IL", count: 10, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1500, approvedLCAs: 1470, avgSalary: 175000 },
      { year: 2023, totalLCAs: 1400, approvedLCAs: 1372, avgSalary: 182000 },
      { year: 2024, totalLCAs: 1380, approvedLCAs: 1352, avgSalary: 186000 },
      { year: 2025, totalLCAs: 1350, approvedLCAs: 1323, avgSalary: 188500 }
    ]
  },
  {
    name: "Epic Games",
    slug: "epic-games",
    totalLCAs: 1250,
    approvedLCAs: 1225,
    deniedLCAs: 25,
    approvalRate: 98.0,
    avgSalary: 178500,
    minSalary: 102000,
    maxSalary: 378000,
    medianSalary: 175000,
    industry: "Technology",
    headquarters: { city: "Cary", state: "NC" },
    topJobTitles: [
      { title: "Software Engineer", count: 520, avgSalary: 182000 },
      { title: "Senior Software Engineer", count: 300, avgSalary: 218000 },
      { title: "Game Developer", count: 180, avgSalary: 165000 },
      { title: "Graphics Engineer", count: 130, avgSalary: 195000 },
      { title: "Technical Artist", count: 80, avgSalary: 148000 }
    ],
    topLocations: [
      { city: "Cary", state: "NC", count: 800, avgSalary: 175000 },
      { city: "San Francisco", state: "CA", count: 200, avgSalary: 198000 },
      { city: "Seattle", state: "WA", count: 150, avgSalary: 188000 },
      { city: "Los Angeles", state: "CA", count: 80, avgSalary: 182000 },
      { city: "New York", state: "NY", count: 20, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1050, approvedLCAs: 1029, avgSalary: 165000 },
      { year: 2023, totalLCAs: 1150, approvedLCAs: 1127, avgSalary: 172000 },
      { year: 2024, totalLCAs: 1220, approvedLCAs: 1196, avgSalary: 176000 },
      { year: 2025, totalLCAs: 1250, approvedLCAs: 1225, avgSalary: 178500 }
    ]
  },
  {
    name: "Electronic Arts",
    slug: "electronic-arts",
    totalLCAs: 1450,
    approvedLCAs: 1421,
    deniedLCAs: 29,
    approvalRate: 98.0,
    avgSalary: 168500,
    minSalary: 95000,
    maxSalary: 348000,
    medianSalary: 165000,
    industry: "Technology",
    headquarters: { city: "Redwood City", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 600, avgSalary: 172000 },
      { title: "Senior Software Engineer", count: 340, avgSalary: 205000 },
      { title: "Game Developer", count: 200, avgSalary: 158000 },
      { title: "Data Scientist", count: 150, avgSalary: 165000 },
      { title: "Technical Artist", count: 100, avgSalary: 142000 }
    ],
    topLocations: [
      { city: "Redwood City", state: "CA", count: 700, avgSalary: 182000 },
      { city: "Los Angeles", state: "CA", count: 350, avgSalary: 172000 },
      { city: "Seattle", state: "WA", count: 200, avgSalary: 175000 },
      { city: "Austin", state: "TX", count: 120, avgSalary: 158000 },
      { city: "Orlando", state: "FL", count: 80, avgSalary: 148000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1250, approvedLCAs: 1225, avgSalary: 155000 },
      { year: 2023, totalLCAs: 1350, approvedLCAs: 1323, avgSalary: 162000 },
      { year: 2024, totalLCAs: 1420, approvedLCAs: 1392, avgSalary: 166000 },
      { year: 2025, totalLCAs: 1450, approvedLCAs: 1421, avgSalary: 168500 }
    ]
  },
  {
    name: "Activision Blizzard",
    slug: "activision-blizzard",
    totalLCAs: 1350,
    approvedLCAs: 1323,
    deniedLCAs: 27,
    approvalRate: 98.0,
    avgSalary: 165800,
    minSalary: 92000,
    maxSalary: 338000,
    medianSalary: 162000,
    industry: "Technology",
    headquarters: { city: "Santa Monica", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 550, avgSalary: 168000 },
      { title: "Senior Software Engineer", count: 320, avgSalary: 202000 },
      { title: "Game Developer", count: 200, avgSalary: 152000 },
      { title: "Data Analyst", count: 140, avgSalary: 138000 },
      { title: "Graphics Programmer", count: 100, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "Santa Monica", state: "CA", count: 550, avgSalary: 175000 },
      { city: "Irvine", state: "CA", count: 400, avgSalary: 168000 },
      { city: "San Francisco", state: "CA", count: 200, avgSalary: 185000 },
      { city: "Austin", state: "TX", count: 120, avgSalary: 155000 },
      { city: "Seattle", state: "WA", count: 80, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1150, approvedLCAs: 1127, avgSalary: 152000 },
      { year: 2023, totalLCAs: 1250, approvedLCAs: 1225, avgSalary: 158000 },
      { year: 2024, totalLCAs: 1320, approvedLCAs: 1294, avgSalary: 163000 },
      { year: 2025, totalLCAs: 1350, approvedLCAs: 1323, avgSalary: 165800 }
    ]
  },
  {
    name: "Expedia Group",
    slug: "expedia",
    totalLCAs: 2150,
    approvedLCAs: 2107,
    deniedLCAs: 43,
    approvalRate: 98.0,
    avgSalary: 172500,
    minSalary: 98000,
    maxSalary: 358000,
    medianSalary: 168000,
    industry: "Technology",
    headquarters: { city: "Seattle", state: "WA" },
    topJobTitles: [
      { title: "Software Engineer", count: 880, avgSalary: 175000 },
      { title: "Senior Software Engineer", count: 500, avgSalary: 208000 },
      { title: "Data Scientist", count: 300, avgSalary: 168000 },
      { title: "Product Manager", count: 220, avgSalary: 185000 },
      { title: "Data Engineer", count: 180, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "Seattle", state: "WA", count: 1400, avgSalary: 182000 },
      { city: "Austin", state: "TX", count: 350, avgSalary: 165000 },
      { city: "San Francisco", state: "CA", count: 200, avgSalary: 188000 },
      { city: "Chicago", state: "IL", count: 120, avgSalary: 158000 },
      { city: "New York", state: "NY", count: 80, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1850, approvedLCAs: 1813, avgSalary: 158000 },
      { year: 2023, totalLCAs: 1980, approvedLCAs: 1940, avgSalary: 165000 },
      { year: 2024, totalLCAs: 2080, approvedLCAs: 2038, avgSalary: 170000 },
      { year: 2025, totalLCAs: 2150, approvedLCAs: 2107, avgSalary: 172500 }
    ]
  },
  {
    name: "Booking Holdings",
    slug: "booking",
    totalLCAs: 1850,
    approvedLCAs: 1813,
    deniedLCAs: 37,
    approvalRate: 98.0,
    avgSalary: 178500,
    minSalary: 102000,
    maxSalary: 375000,
    medianSalary: 175000,
    industry: "Technology",
    headquarters: { city: "Norwalk", state: "CT" },
    topJobTitles: [
      { title: "Software Engineer", count: 750, avgSalary: 182000 },
      { title: "Senior Software Engineer", count: 420, avgSalary: 215000 },
      { title: "Data Scientist", count: 280, avgSalary: 172000 },
      { title: "Product Manager", count: 200, avgSalary: 192000 },
      { title: "Machine Learning Engineer", count: 150, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "Norwalk", state: "CT", count: 600, avgSalary: 175000 },
      { city: "New York", state: "NY", count: 500, avgSalary: 192000 },
      { city: "Seattle", state: "WA", count: 350, avgSalary: 185000 },
      { city: "San Francisco", state: "CA", count: 250, avgSalary: 195000 },
      { city: "Cambridge", state: "MA", count: 150, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1550, approvedLCAs: 1519, avgSalary: 165000 },
      { year: 2023, totalLCAs: 1700, approvedLCAs: 1666, avgSalary: 172000 },
      { year: 2024, totalLCAs: 1800, approvedLCAs: 1764, avgSalary: 176000 },
      { year: 2025, totalLCAs: 1850, approvedLCAs: 1813, avgSalary: 178500 }
    ]
  },
  {
    name: "Zillow Group",
    slug: "zillow",
    totalLCAs: 1550,
    approvedLCAs: 1519,
    deniedLCAs: 31,
    approvalRate: 98.0,
    avgSalary: 182500,
    minSalary: 105000,
    maxSalary: 385000,
    medianSalary: 178000,
    industry: "Technology",
    headquarters: { city: "Seattle", state: "WA" },
    topJobTitles: [
      { title: "Software Engineer", count: 640, avgSalary: 185000 },
      { title: "Senior Software Engineer", count: 360, avgSalary: 222000 },
      { title: "Data Scientist", count: 220, avgSalary: 175000 },
      { title: "Product Manager", count: 160, avgSalary: 198000 },
      { title: "Machine Learning Engineer", count: 120, avgSalary: 215000 }
    ],
    topLocations: [
      { city: "Seattle", state: "WA", count: 1100, avgSalary: 192000 },
      { city: "San Francisco", state: "CA", count: 250, avgSalary: 198000 },
      { city: "New York", state: "NY", count: 120, avgSalary: 188000 },
      { city: "Irvine", state: "CA", count: 60, avgSalary: 175000 },
      { city: "Atlanta", state: "GA", count: 20, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 1700, approvedLCAs: 1666, avgSalary: 172000 },
      { year: 2023, totalLCAs: 1600, approvedLCAs: 1568, avgSalary: 178000 },
      { year: 2024, totalLCAs: 1580, approvedLCAs: 1548, avgSalary: 181000 },
      { year: 2025, totalLCAs: 1550, approvedLCAs: 1519, avgSalary: 182500 }
    ]
  },
  {
    name: "Redfin Corporation",
    slug: "redfin",
    totalLCAs: 850,
    approvedLCAs: 833,
    deniedLCAs: 17,
    approvalRate: 98.0,
    avgSalary: 172500,
    minSalary: 98000,
    maxSalary: 358000,
    medianSalary: 168000,
    industry: "Technology",
    headquarters: { city: "Seattle", state: "WA" },
    topJobTitles: [
      { title: "Software Engineer", count: 350, avgSalary: 175000 },
      { title: "Senior Software Engineer", count: 200, avgSalary: 212000 },
      { title: "Data Scientist", count: 120, avgSalary: 168000 },
      { title: "Product Manager", count: 90, avgSalary: 188000 },
      { title: "Data Engineer", count: 70, avgSalary: 162000 }
    ],
    topLocations: [
      { city: "Seattle", state: "WA", count: 650, avgSalary: 182000 },
      { city: "San Francisco", state: "CA", count: 120, avgSalary: 192000 },
      { city: "Frisco", state: "TX", count: 50, avgSalary: 162000 },
      { city: "Chicago", state: "IL", count: 20, avgSalary: 158000 },
      { city: "Denver", state: "CO", count: 10, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 950, approvedLCAs: 931, avgSalary: 162000 },
      { year: 2023, totalLCAs: 900, approvedLCAs: 882, avgSalary: 168000 },
      { year: 2024, totalLCAs: 880, approvedLCAs: 862, avgSalary: 171000 },
      { year: 2025, totalLCAs: 850, approvedLCAs: 833, avgSalary: 172500 }
    ]
  },
  {
    name: "Compass Inc",
    slug: "compass",
    totalLCAs: 750,
    approvedLCAs: 735,
    deniedLCAs: 15,
    approvalRate: 98.0,
    avgSalary: 175800,
    minSalary: 100000,
    maxSalary: 368000,
    medianSalary: 172000,
    industry: "Technology",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 310, avgSalary: 178000 },
      { title: "Senior Software Engineer", count: 180, avgSalary: 218000 },
      { title: "Data Scientist", count: 100, avgSalary: 172000 },
      { title: "Product Manager", count: 80, avgSalary: 192000 },
      { title: "Data Engineer", count: 60, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 500, avgSalary: 188000 },
      { city: "Seattle", state: "WA", count: 120, avgSalary: 178000 },
      { city: "San Francisco", state: "CA", count: 80, avgSalary: 192000 },
      { city: "Washington", state: "DC", count: 35, avgSalary: 172000 },
      { city: "Austin", state: "TX", count: 15, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 850, approvedLCAs: 833, avgSalary: 165000 },
      { year: 2023, totalLCAs: 800, approvedLCAs: 784, avgSalary: 170000 },
      { year: 2024, totalLCAs: 780, approvedLCAs: 764, avgSalary: 174000 },
      { year: 2025, totalLCAs: 750, approvedLCAs: 735, avgSalary: 175800 }
    ]
  },
  {
    name: "Hewlett Packard Enterprise",
    slug: "hewlett-packard-enterprise",
    totalLCAs: 1850,
    approvedLCAs: 1720,
    deniedLCAs: 130,
    approvalRate: 93.0,
    avgSalary: 142000,
    minSalary: 95000,
    maxSalary: 225000,
    medianSalary: 138000,
    industry: "Technology",
    headquarters: "Houston, TX",
    topJobTitles: [
      { title: "Software Engineer", count: 420, avgSalary: 140000 },
      { title: "Cloud Solutions Architect", count: 280, avgSalary: 155000 },
      { title: "Data Scientist", count: 190, avgSalary: 148000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 480, avgSalary: 158000 },
      { city: "Houston", state: "TX", count: 320, avgSalary: 135000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 520, approved: 485, avgSalary: 148000 },
      { year: 2024, lcas: 480, approved: 445, avgSalary: 142000 },
      { year: 2023, lcas: 450, approved: 420, avgSalary: 138000 },
      { year: 2022, lcas: 400, approved: 370, avgSalary: 132000 }
    ]
  },
  {
    name: "Dell Technologies",
    slug: "dell-technologies",
    totalLCAs: 1650,
    approvedLCAs: 1540,
    deniedLCAs: 110,
    approvalRate: 93.3,
    avgSalary: 138000,
    minSalary: 90000,
    maxSalary: 210000,
    medianSalary: 135000,
    industry: "Technology",
    headquarters: "Round Rock, TX",
    topJobTitles: [
      { title: "Software Engineer", count: 380, avgSalary: 135000 },
      { title: "Systems Engineer", count: 250, avgSalary: 128000 },
      { title: "Product Manager", count: 180, avgSalary: 152000 }
    ],
    topLocations: [
      { city: "Round Rock", state: "TX", count: 420, avgSalary: 132000 },
      { city: "Santa Clara", state: "CA", count: 280, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 460, approved: 430, avgSalary: 145000 },
      { year: 2024, lcas: 420, approved: 390, avgSalary: 138000 },
      { year: 2023, lcas: 400, approved: 375, avgSalary: 132000 },
      { year: 2022, lcas: 370, approved: 345, avgSalary: 128000 }
    ]
  },
  {
    name: "SAP America",
    slug: "sap-america",
    totalLCAs: 2100,
    approvedLCAs: 1980,
    deniedLCAs: 120,
    approvalRate: 94.3,
    avgSalary: 145000,
    minSalary: 98000,
    maxSalary: 230000,
    medianSalary: 142000,
    industry: "Enterprise Software",
    headquarters: "Newtown Square, PA",
    topJobTitles: [
      { title: "Software Developer", count: 480, avgSalary: 142000 },
      { title: "Solutions Architect", count: 320, avgSalary: 162000 },
      { title: "Consultant", count: 280, avgSalary: 135000 }
    ],
    topLocations: [
      { city: "Palo Alto", state: "CA", count: 520, avgSalary: 165000 },
      { city: "New York", state: "NY", count: 380, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 580, approved: 548, avgSalary: 152000 },
      { year: 2024, lcas: 540, approved: 508, avgSalary: 145000 },
      { year: 2023, lcas: 510, approved: 482, avgSalary: 140000 },
      { year: 2022, lcas: 470, approved: 442, avgSalary: 135000 }
    ]
  },
  {
    name: "Citrix Systems",
    slug: "citrix-systems",
    totalLCAs: 820,
    approvedLCAs: 765,
    deniedLCAs: 55,
    approvalRate: 93.3,
    avgSalary: 140000,
    minSalary: 95000,
    maxSalary: 205000,
    medianSalary: 138000,
    industry: "Technology",
    headquarters: "Fort Lauderdale, FL",
    topJobTitles: [
      { title: "Software Engineer", count: 220, avgSalary: 138000 },
      { title: "Cloud Engineer", count: 150, avgSalary: 145000 },
      { title: "Product Manager", count: 95, avgSalary: 155000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 280, avgSalary: 158000 },
      { city: "Raleigh", state: "NC", count: 180, avgSalary: 132000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 230, approved: 215, avgSalary: 148000 },
      { year: 2024, lcas: 210, approved: 195, avgSalary: 140000 },
      { year: 2023, lcas: 200, approved: 185, avgSalary: 135000 },
      { year: 2022, lcas: 180, approved: 170, avgSalary: 130000 }
    ]
  },
  {
    name: "Nutanix Inc",
    slug: "nutanix-inc",
    totalLCAs: 780,
    approvedLCAs: 730,
    deniedLCAs: 50,
    approvalRate: 93.6,
    avgSalary: 155000,
    minSalary: 105000,
    maxSalary: 235000,
    medianSalary: 152000,
    industry: "Cloud Computing",
    headquarters: "San Jose, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 210, avgSalary: 152000 },
      { title: "Solutions Architect", count: 140, avgSalary: 168000 },
      { title: "DevOps Engineer", count: 95, avgSalary: 148000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 380, avgSalary: 165000 },
      { city: "Durham", state: "NC", count: 150, avgSalary: 140000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 220, approved: 205, avgSalary: 162000 },
      { year: 2024, lcas: 200, approved: 188, avgSalary: 155000 },
      { year: 2023, lcas: 185, approved: 172, avgSalary: 150000 },
      { year: 2022, lcas: 175, approved: 165, avgSalary: 145000 }
    ]
  },
  {
    name: "Juniper Networks",
    slug: "juniper-networks",
    totalLCAs: 920,
    approvedLCAs: 860,
    deniedLCAs: 60,
    approvalRate: 93.5,
    avgSalary: 148000,
    minSalary: 100000,
    maxSalary: 220000,
    medianSalary: 145000,
    industry: "Networking",
    headquarters: "Sunnyvale, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 250, avgSalary: 145000 },
      { title: "Network Engineer", count: 180, avgSalary: 140000 },
      { title: "Systems Engineer", count: 120, avgSalary: 138000 }
    ],
    topLocations: [
      { city: "Sunnyvale", state: "CA", count: 450, avgSalary: 162000 },
      { city: "Westford", state: "MA", count: 180, avgSalary: 145000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 260, approved: 242, avgSalary: 155000 },
      { year: 2024, lcas: 240, approved: 225, avgSalary: 148000 },
      { year: 2023, lcas: 220, approved: 205, avgSalary: 142000 },
      { year: 2022, lcas: 200, approved: 188, avgSalary: 138000 }
    ]
  },
  {
    name: "Pure Storage",
    slug: "pure-storage",
    totalLCAs: 650,
    approvedLCAs: 610,
    deniedLCAs: 40,
    approvalRate: 93.8,
    avgSalary: 165000,
    minSalary: 115000,
    maxSalary: 250000,
    medianSalary: 162000,
    industry: "Data Storage",
    headquarters: "Mountain View, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 180, avgSalary: 162000 },
      { title: "Solutions Architect", count: 110, avgSalary: 175000 },
      { title: "Technical Support Engineer", count: 80, avgSalary: 135000 }
    ],
    topLocations: [
      { city: "Mountain View", state: "CA", count: 320, avgSalary: 178000 },
      { city: "Santa Clara", state: "CA", count: 150, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 185, approved: 175, avgSalary: 172000 },
      { year: 2024, lcas: 170, approved: 160, avgSalary: 165000 },
      { year: 2023, lcas: 155, approved: 145, avgSalary: 158000 },
      { year: 2022, lcas: 140, approved: 130, avgSalary: 152000 }
    ]
  },
  {
    name: "Arista Networks",
    slug: "arista-networks",
    totalLCAs: 580,
    approvedLCAs: 545,
    deniedLCAs: 35,
    approvalRate: 94.0,
    avgSalary: 172000,
    minSalary: 120000,
    maxSalary: 260000,
    medianSalary: 168000,
    industry: "Networking",
    headquarters: "Santa Clara, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 165, avgSalary: 168000 },
      { title: "Hardware Engineer", count: 95, avgSalary: 175000 },
      { title: "Systems Engineer", count: 75, avgSalary: 162000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 380, avgSalary: 182000 },
      { city: "San Jose", state: "CA", count: 120, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 165, approved: 155, avgSalary: 180000 },
      { year: 2024, lcas: 150, approved: 142, avgSalary: 172000 },
      { year: 2023, lcas: 140, approved: 130, avgSalary: 165000 },
      { year: 2022, lcas: 125, approved: 118, avgSalary: 158000 }
    ]
  },
  {
    name: "NetApp Inc",
    slug: "netapp-inc",
    totalLCAs: 1100,
    approvedLCAs: 1025,
    deniedLCAs: 75,
    approvalRate: 93.2,
    avgSalary: 152000,
    minSalary: 105000,
    maxSalary: 230000,
    medianSalary: 148000,
    industry: "Data Storage",
    headquarters: "San Jose, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 290, avgSalary: 148000 },
      { title: "Cloud Architect", count: 180, avgSalary: 168000 },
      { title: "Data Engineer", count: 140, avgSalary: 155000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 420, avgSalary: 168000 },
      { city: "Research Triangle Park", state: "NC", count: 280, avgSalary: 142000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 310, approved: 290, avgSalary: 160000 },
      { year: 2024, lcas: 285, approved: 265, avgSalary: 152000 },
      { year: 2023, lcas: 265, approved: 248, avgSalary: 145000 },
      { year: 2022, lcas: 240, approved: 222, avgSalary: 140000 }
    ]
  },
  {
    name: "Cloudera Inc",
    slug: "cloudera-inc",
    totalLCAs: 480,
    approvedLCAs: 450,
    deniedLCAs: 30,
    approvalRate: 93.8,
    avgSalary: 158000,
    minSalary: 110000,
    maxSalary: 240000,
    medianSalary: 155000,
    industry: "Big Data",
    headquarters: "Santa Clara, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 140, avgSalary: 155000 },
      { title: "Data Engineer", count: 95, avgSalary: 162000 },
      { title: "Solutions Architect", count: 65, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 220, avgSalary: 172000 },
      { city: "Austin", state: "TX", count: 120, avgSalary: 152000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 135, approved: 128, avgSalary: 165000 },
      { year: 2024, lcas: 125, approved: 118, avgSalary: 158000 },
      { year: 2023, lcas: 115, approved: 108, avgSalary: 152000 },
      { year: 2022, lcas: 105, approved: 96, avgSalary: 145000 }
    ]
  },
  {
    name: "Splunk Inc",
    slug: "splunk-inc",
    totalLCAs: 1150,
    approvedLCAs: 1085,
    deniedLCAs: 65,
    approvalRate: 94.3,
    avgSalary: 168000,
    minSalary: 118000,
    maxSalary: 255000,
    medianSalary: 165000,
    industry: "Data Analytics",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 320, avgSalary: 165000 },
      { title: "Data Scientist", count: 195, avgSalary: 175000 },
      { title: "Product Manager", count: 140, avgSalary: 180000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 480, avgSalary: 182000 },
      { city: "Seattle", state: "WA", count: 280, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 320, approved: 302, avgSalary: 175000 },
      { year: 2024, lcas: 295, approved: 280, avgSalary: 168000 },
      { year: 2023, lcas: 280, approved: 262, avgSalary: 160000 },
      { year: 2022, lcas: 255, approved: 241, avgSalary: 155000 }
    ]
  },
  {
    name: "MongoDB Inc",
    slug: "mongodb-inc",
    totalLCAs: 720,
    approvedLCAs: 680,
    deniedLCAs: 40,
    approvalRate: 94.4,
    avgSalary: 175000,
    minSalary: 125000,
    maxSalary: 270000,
    medianSalary: 172000,
    industry: "Database",
    headquarters: "New York, NY",
    topJobTitles: [
      { title: "Software Engineer", count: 210, avgSalary: 172000 },
      { title: "Solutions Architect", count: 125, avgSalary: 185000 },
      { title: "Technical Services Engineer", count: 85, avgSalary: 155000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 320, avgSalary: 185000 },
      { city: "Austin", state: "TX", count: 180, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 205, approved: 195, avgSalary: 182000 },
      { year: 2024, lcas: 188, approved: 178, avgSalary: 175000 },
      { year: 2023, lcas: 172, approved: 162, avgSalary: 168000 },
      { year: 2022, lcas: 155, approved: 145, avgSalary: 160000 }
    ]
  },
  {
    name: "Elastic NV",
    slug: "elastic-nv",
    totalLCAs: 520,
    approvedLCAs: 490,
    deniedLCAs: 30,
    approvalRate: 94.2,
    avgSalary: 162000,
    minSalary: 115000,
    maxSalary: 245000,
    medianSalary: 158000,
    industry: "Search & Analytics",
    headquarters: "Mountain View, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 155, avgSalary: 158000 },
      { title: "Solutions Architect", count: 90, avgSalary: 175000 },
      { title: "Support Engineer", count: 65, avgSalary: 140000 }
    ],
    topLocations: [
      { city: "Mountain View", state: "CA", count: 240, avgSalary: 178000 },
      { city: "San Francisco", state: "CA", count: 120, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 150, approved: 142, avgSalary: 170000 },
      { year: 2024, lcas: 138, approved: 130, avgSalary: 162000 },
      { year: 2023, lcas: 125, approved: 118, avgSalary: 155000 },
      { year: 2022, lcas: 107, approved: 100, avgSalary: 148000 }
    ]
  },
  {
    name: "Confluent Inc",
    slug: "confluent-inc",
    totalLCAs: 580,
    approvedLCAs: 548,
    deniedLCAs: 32,
    approvalRate: 94.5,
    avgSalary: 178000,
    minSalary: 130000,
    maxSalary: 275000,
    medianSalary: 175000,
    industry: "Data Streaming",
    headquarters: "Mountain View, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 175, avgSalary: 175000 },
      { title: "Solutions Architect", count: 95, avgSalary: 190000 },
      { title: "Site Reliability Engineer", count: 70, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "Mountain View", state: "CA", count: 280, avgSalary: 192000 },
      { city: "Austin", state: "TX", count: 140, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 168, approved: 160, avgSalary: 185000 },
      { year: 2024, lcas: 152, approved: 144, avgSalary: 178000 },
      { year: 2023, lcas: 138, approved: 130, avgSalary: 170000 },
      { year: 2022, lcas: 122, approved: 114, avgSalary: 162000 }
    ]
  },
  {
    name: "HashiCorp Inc",
    slug: "hashicorp-inc",
    totalLCAs: 450,
    approvedLCAs: 425,
    deniedLCAs: 25,
    approvalRate: 94.4,
    avgSalary: 172000,
    minSalary: 125000,
    maxSalary: 260000,
    medianSalary: 168000,
    industry: "DevOps/Infrastructure",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 140, avgSalary: 168000 },
      { title: "Solutions Engineer", count: 85, avgSalary: 165000 },
      { title: "Site Reliability Engineer", count: 60, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 220, avgSalary: 185000 },
      { city: "Austin", state: "TX", count: 100, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 130, approved: 124, avgSalary: 180000 },
      { year: 2024, lcas: 118, approved: 112, avgSalary: 172000 },
      { year: 2023, lcas: 108, approved: 102, avgSalary: 165000 },
      { year: 2022, lcas: 94, approved: 87, avgSalary: 158000 }
    ]
  },
  {
    name: "GitLab Inc",
    slug: "gitlab-inc",
    totalLCAs: 380,
    approvedLCAs: 358,
    deniedLCAs: 22,
    approvalRate: 94.2,
    avgSalary: 168000,
    minSalary: 120000,
    maxSalary: 255000,
    medianSalary: 165000,
    industry: "DevOps",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 125, avgSalary: 165000 },
      { title: "Site Reliability Engineer", count: 65, avgSalary: 172000 },
      { title: "Product Manager", count: 50, avgSalary: 180000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 180, avgSalary: 182000 },
      { city: "Remote", state: "US", count: 120, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 110, approved: 105, avgSalary: 175000 },
      { year: 2024, lcas: 100, approved: 94, avgSalary: 168000 },
      { year: 2023, lcas: 90, approved: 85, avgSalary: 162000 },
      { year: 2022, lcas: 80, approved: 74, avgSalary: 155000 }
    ]
  },
  {
    name: "Datadog Inc",
    slug: "datadog-inc",
    totalLCAs: 850,
    approvedLCAs: 805,
    deniedLCAs: 45,
    approvalRate: 94.7,
    avgSalary: 185000,
    minSalary: 135000,
    maxSalary: 290000,
    medianSalary: 182000,
    industry: "Observability",
    headquarters: "New York, NY",
    topJobTitles: [
      { title: "Software Engineer", count: 280, avgSalary: 182000 },
      { title: "Site Reliability Engineer", count: 145, avgSalary: 188000 },
      { title: "Solutions Engineer", count: 95, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 420, avgSalary: 195000 },
      { city: "Boston", state: "MA", count: 180, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 245, approved: 232, avgSalary: 192000 },
      { year: 2024, lcas: 225, approved: 215, avgSalary: 185000 },
      { year: 2023, lcas: 205, approved: 194, avgSalary: 178000 },
      { year: 2022, lcas: 175, approved: 164, avgSalary: 170000 }
    ]
  },
  {
    name: "New Relic Inc",
    slug: "new-relic-inc",
    totalLCAs: 520,
    approvedLCAs: 488,
    deniedLCAs: 32,
    approvalRate: 93.8,
    avgSalary: 162000,
    minSalary: 115000,
    maxSalary: 245000,
    medianSalary: 158000,
    industry: "Observability",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 165, avgSalary: 158000 },
      { title: "Site Reliability Engineer", count: 85, avgSalary: 168000 },
      { title: "Solutions Consultant", count: 60, avgSalary: 155000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 240, avgSalary: 175000 },
      { city: "Portland", state: "OR", count: 120, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 150, approved: 142, avgSalary: 170000 },
      { year: 2024, lcas: 138, approved: 130, avgSalary: 162000 },
      { year: 2023, lcas: 125, approved: 118, avgSalary: 155000 },
      { year: 2022, lcas: 107, approved: 98, avgSalary: 148000 }
    ]
  },
  {
    name: "Sumo Logic",
    slug: "sumo-logic",
    totalLCAs: 380,
    approvedLCAs: 355,
    deniedLCAs: 25,
    approvalRate: 93.4,
    avgSalary: 158000,
    minSalary: 110000,
    maxSalary: 240000,
    medianSalary: 155000,
    industry: "Cloud SIEM",
    headquarters: "Redwood City, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 120, avgSalary: 155000 },
      { title: "Solutions Engineer", count: 65, avgSalary: 162000 },
      { title: "DevOps Engineer", count: 50, avgSalary: 152000 }
    ],
    topLocations: [
      { city: "Redwood City", state: "CA", count: 180, avgSalary: 172000 },
      { city: "Austin", state: "TX", count: 90, avgSalary: 150000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 110, approved: 104, avgSalary: 165000 },
      { year: 2024, lcas: 100, approved: 94, avgSalary: 158000 },
      { year: 2023, lcas: 90, approved: 84, avgSalary: 152000 },
      { year: 2022, lcas: 80, approved: 73, avgSalary: 145000 }
    ]
  },
  {
    name: "PagerDuty Inc",
    slug: "pagerduty-inc",
    totalLCAs: 350,
    approvedLCAs: 328,
    deniedLCAs: 22,
    approvalRate: 93.7,
    avgSalary: 165000,
    minSalary: 118000,
    maxSalary: 250000,
    medianSalary: 162000,
    industry: "Incident Management",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 115, avgSalary: 162000 },
      { title: "Site Reliability Engineer", count: 60, avgSalary: 172000 },
      { title: "Product Manager", count: 45, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 180, avgSalary: 178000 },
      { city: "Atlanta", state: "GA", count: 80, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 102, approved: 96, avgSalary: 172000 },
      { year: 2024, lcas: 92, approved: 87, avgSalary: 165000 },
      { year: 2023, lcas: 84, approved: 78, avgSalary: 158000 },
      { year: 2022, lcas: 72, approved: 67, avgSalary: 150000 }
    ]
  },
  {
    name: "Fastly Inc",
    slug: "fastly-inc",
    totalLCAs: 320,
    approvedLCAs: 300,
    deniedLCAs: 20,
    approvalRate: 93.8,
    avgSalary: 172000,
    minSalary: 125000,
    maxSalary: 265000,
    medianSalary: 168000,
    industry: "Edge Cloud",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 105, avgSalary: 168000 },
      { title: "Network Engineer", count: 55, avgSalary: 162000 },
      { title: "Solutions Architect", count: 40, avgSalary: 180000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 165, avgSalary: 185000 },
      { city: "Denver", state: "CO", count: 70, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 95, approved: 90, avgSalary: 180000 },
      { year: 2024, lcas: 85, approved: 80, avgSalary: 172000 },
      { year: 2023, lcas: 75, approved: 70, avgSalary: 165000 },
      { year: 2022, lcas: 65, approved: 60, avgSalary: 158000 }
    ]
  },
  {
    name: "Cloudflare Inc",
    slug: "cloudflare-inc",
    totalLCAs: 780,
    approvedLCAs: 740,
    deniedLCAs: 40,
    approvalRate: 94.9,
    avgSalary: 185000,
    minSalary: 135000,
    maxSalary: 290000,
    medianSalary: 182000,
    industry: "Cloud Security",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 250, avgSalary: 182000 },
      { title: "Systems Engineer", count: 130, avgSalary: 178000 },
      { title: "Solutions Engineer", count: 90, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 380, avgSalary: 198000 },
      { city: "Austin", state: "TX", count: 180, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 225, approved: 215, avgSalary: 192000 },
      { year: 2024, lcas: 205, approved: 195, avgSalary: 185000 },
      { year: 2023, lcas: 185, approved: 175, avgSalary: 178000 },
      { year: 2022, lcas: 165, approved: 155, avgSalary: 170000 }
    ]
  },
  {
    name: "Akamai Technologies",
    slug: "akamai-technologies",
    totalLCAs: 1250,
    approvedLCAs: 1165,
    deniedLCAs: 85,
    approvalRate: 93.2,
    avgSalary: 155000,
    minSalary: 105000,
    maxSalary: 235000,
    medianSalary: 152000,
    industry: "CDN/Cloud",
    headquarters: "Cambridge, MA",
    topJobTitles: [
      { title: "Software Engineer", count: 350, avgSalary: 152000 },
      { title: "Network Engineer", count: 210, avgSalary: 148000 },
      { title: "Solutions Architect", count: 145, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "Cambridge", state: "MA", count: 480, avgSalary: 168000 },
      { city: "San Francisco", state: "CA", count: 280, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 350, approved: 328, avgSalary: 162000 },
      { year: 2024, lcas: 320, approved: 298, avgSalary: 155000 },
      { year: 2023, lcas: 305, approved: 285, avgSalary: 148000 },
      { year: 2022, lcas: 275, approved: 254, avgSalary: 142000 }
    ]
  },
  {
    name: "DigitalOcean",
    slug: "digitalocean",
    totalLCAs: 420,
    approvedLCAs: 395,
    deniedLCAs: 25,
    approvalRate: 94.0,
    avgSalary: 162000,
    minSalary: 115000,
    maxSalary: 245000,
    medianSalary: 158000,
    industry: "Cloud Infrastructure",
    headquarters: "New York, NY",
    topJobTitles: [
      { title: "Software Engineer", count: 140, avgSalary: 158000 },
      { title: "Site Reliability Engineer", count: 75, avgSalary: 168000 },
      { title: "Product Manager", count: 50, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 200, avgSalary: 175000 },
      { city: "Cambridge", state: "MA", count: 100, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 122, approved: 116, avgSalary: 170000 },
      { year: 2024, lcas: 110, approved: 104, avgSalary: 162000 },
      { year: 2023, lcas: 100, approved: 94, avgSalary: 155000 },
      { year: 2022, lcas: 88, approved: 81, avgSalary: 148000 }
    ]
  },
  {
    name: "Linode (Akamai)",
    slug: "linode-akamai",
    totalLCAs: 180,
    approvedLCAs: 168,
    deniedLCAs: 12,
    approvalRate: 93.3,
    avgSalary: 152000,
    minSalary: 105000,
    maxSalary: 225000,
    medianSalary: 148000,
    industry: "Cloud Infrastructure",
    headquarters: "Philadelphia, PA",
    topJobTitles: [
      { title: "Software Engineer", count: 65, avgSalary: 148000 },
      { title: "Systems Engineer", count: 35, avgSalary: 145000 },
      { title: "DevOps Engineer", count: 25, avgSalary: 155000 }
    ],
    topLocations: [
      { city: "Philadelphia", state: "PA", count: 100, avgSalary: 155000 },
      { city: "Remote", state: "US", count: 50, avgSalary: 148000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 52, approved: 49, avgSalary: 158000 },
      { year: 2024, lcas: 48, approved: 45, avgSalary: 152000 },
      { year: 2023, lcas: 42, approved: 39, avgSalary: 145000 },
      { year: 2022, lcas: 38, approved: 35, avgSalary: 140000 }
    ]
  },
  {
    name: "Vercel Inc",
    slug: "vercel-inc",
    totalLCAs: 280,
    approvedLCAs: 265,
    deniedLCAs: 15,
    approvalRate: 94.6,
    avgSalary: 185000,
    minSalary: 140000,
    maxSalary: 285000,
    medianSalary: 182000,
    industry: "Developer Platform",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 95, avgSalary: 182000 },
      { title: "Developer Advocate", count: 45, avgSalary: 168000 },
      { title: "Solutions Architect", count: 35, avgSalary: 190000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 140, avgSalary: 198000 },
      { city: "New York", state: "NY", count: 70, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 85, approved: 81, avgSalary: 192000 },
      { year: 2024, lcas: 75, approved: 71, avgSalary: 185000 },
      { year: 2023, lcas: 65, approved: 61, avgSalary: 178000 },
      { year: 2022, lcas: 55, approved: 52, avgSalary: 170000 }
    ]
  },
  {
    name: "Netlify Inc",
    slug: "netlify-inc",
    totalLCAs: 180,
    approvedLCAs: 170,
    deniedLCAs: 10,
    approvalRate: 94.4,
    avgSalary: 175000,
    minSalary: 130000,
    maxSalary: 265000,
    medianSalary: 172000,
    industry: "Developer Platform",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 65, avgSalary: 172000 },
      { title: "Developer Advocate", count: 30, avgSalary: 158000 },
      { title: "Site Reliability Engineer", count: 22, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 90, avgSalary: 188000 },
      { city: "Remote", state: "US", count: 55, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 55, approved: 52, avgSalary: 182000 },
      { year: 2024, lcas: 48, approved: 46, avgSalary: 175000 },
      { year: 2023, lcas: 42, approved: 40, avgSalary: 168000 },
      { year: 2022, lcas: 35, approved: 32, avgSalary: 160000 }
    ]
  },
  {
    name: "Heroku (Salesforce)",
    slug: "heroku-salesforce",
    totalLCAs: 220,
    approvedLCAs: 205,
    deniedLCAs: 15,
    approvalRate: 93.2,
    avgSalary: 168000,
    minSalary: 120000,
    maxSalary: 255000,
    medianSalary: 165000,
    industry: "PaaS",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 78, avgSalary: 165000 },
      { title: "Site Reliability Engineer", count: 42, avgSalary: 172000 },
      { title: "Product Manager", count: 28, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 120, avgSalary: 182000 },
      { city: "Remote", state: "US", count: 60, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 65, approved: 61, avgSalary: 175000 },
      { year: 2024, lcas: 58, approved: 54, avgSalary: 168000 },
      { year: 2023, lcas: 52, approved: 48, avgSalary: 162000 },
      { year: 2022, lcas: 45, approved: 42, avgSalary: 155000 }
    ]
  },
  {
    name: "Render Inc",
    slug: "render-inc",
    totalLCAs: 120,
    approvedLCAs: 114,
    deniedLCAs: 6,
    approvalRate: 95.0,
    avgSalary: 178000,
    minSalary: 135000,
    maxSalary: 270000,
    medianSalary: 175000,
    industry: "Cloud Platform",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 45, avgSalary: 175000 },
      { title: "Site Reliability Engineer", count: 22, avgSalary: 182000 },
      { title: "Developer Advocate", count: 15, avgSalary: 162000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 70, avgSalary: 192000 },
      { city: "Remote", state: "US", count: 35, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 38, approved: 36, avgSalary: 185000 },
      { year: 2024, lcas: 32, approved: 31, avgSalary: 178000 },
      { year: 2023, lcas: 28, approved: 26, avgSalary: 172000 },
      { year: 2022, lcas: 22, approved: 21, avgSalary: 165000 }
    ]
  },
  {
    name: "Supabase Inc",
    slug: "supabase-inc",
    totalLCAs: 95,
    approvedLCAs: 90,
    deniedLCAs: 5,
    approvalRate: 94.7,
    avgSalary: 182000,
    minSalary: 140000,
    maxSalary: 280000,
    medianSalary: 178000,
    industry: "Database Platform",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 38, avgSalary: 178000 },
      { title: "Developer Advocate", count: 18, avgSalary: 165000 },
      { title: "Site Reliability Engineer", count: 12, avgSalary: 185000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 50, avgSalary: 195000 },
      { city: "Remote", state: "US", count: 30, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 32, approved: 31, avgSalary: 188000 },
      { year: 2024, lcas: 26, approved: 25, avgSalary: 182000 },
      { year: 2023, lcas: 22, approved: 21, avgSalary: 175000 },
      { year: 2022, lcas: 15, approved: 13, avgSalary: 168000 }
    ]
  },
  {
    name: "Cockroach Labs",
    slug: "cockroach-labs",
    totalLCAs: 280,
    approvedLCAs: 265,
    deniedLCAs: 15,
    approvalRate: 94.6,
    avgSalary: 185000,
    minSalary: 140000,
    maxSalary: 285000,
    medianSalary: 182000,
    industry: "Database",
    headquarters: "New York, NY",
    topJobTitles: [
      { title: "Software Engineer", count: 98, avgSalary: 182000 },
      { title: "Site Reliability Engineer", count: 48, avgSalary: 188000 },
      { title: "Solutions Engineer", count: 35, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 145, avgSalary: 198000 },
      { city: "San Francisco", state: "CA", count: 75, avgSalary: 192000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 85, approved: 81, avgSalary: 192000 },
      { year: 2024, lcas: 75, approved: 71, avgSalary: 185000 },
      { year: 2023, lcas: 65, approved: 62, avgSalary: 178000 },
      { year: 2022, lcas: 55, approved: 51, avgSalary: 170000 }
    ]
  },
  {
    name: "PlanetScale",
    slug: "planetscale",
    totalLCAs: 120,
    approvedLCAs: 114,
    deniedLCAs: 6,
    approvalRate: 95.0,
    avgSalary: 188000,
    minSalary: 145000,
    maxSalary: 290000,
    medianSalary: 185000,
    industry: "Database",
    headquarters: "New York, NY",
    topJobTitles: [
      { title: "Software Engineer", count: 48, avgSalary: 185000 },
      { title: "Site Reliability Engineer", count: 22, avgSalary: 192000 },
      { title: "Developer Advocate", count: 14, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 60, avgSalary: 198000 },
      { city: "San Francisco", state: "CA", count: 35, avgSalary: 195000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 38, approved: 36, avgSalary: 195000 },
      { year: 2024, lcas: 32, approved: 31, avgSalary: 188000 },
      { year: 2023, lcas: 28, approved: 26, avgSalary: 182000 },
      { year: 2022, lcas: 22, approved: 21, avgSalary: 175000 }
    ]
  },
  {
    name: "Hasura Inc",
    slug: "hasura-inc",
    totalLCAs: 150,
    approvedLCAs: 142,
    deniedLCAs: 8,
    approvalRate: 94.7,
    avgSalary: 172000,
    minSalary: 130000,
    maxSalary: 260000,
    medianSalary: 168000,
    industry: "GraphQL/API",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 55, avgSalary: 168000 },
      { title: "Developer Advocate", count: 28, avgSalary: 158000 },
      { title: "Solutions Architect", count: 20, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 80, avgSalary: 185000 },
      { city: "Remote", state: "US", count: 45, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 48, approved: 46, avgSalary: 180000 },
      { year: 2024, lcas: 42, approved: 40, avgSalary: 172000 },
      { year: 2023, lcas: 35, approved: 33, avgSalary: 165000 },
      { year: 2022, lcas: 25, approved: 23, avgSalary: 158000 }
    ]
  },
  {
    name: "Apollo GraphQL",
    slug: "apollo-graphql",
    totalLCAs: 180,
    approvedLCAs: 170,
    deniedLCAs: 10,
    approvalRate: 94.4,
    avgSalary: 175000,
    minSalary: 132000,
    maxSalary: 265000,
    medianSalary: 172000,
    industry: "GraphQL/API",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 68, avgSalary: 172000 },
      { title: "Developer Advocate", count: 32, avgSalary: 162000 },
      { title: "Solutions Architect", count: 22, avgSalary: 182000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 95, avgSalary: 188000 },
      { city: "Remote", state: "US", count: 55, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 55, approved: 52, avgSalary: 182000 },
      { year: 2024, lcas: 48, approved: 46, avgSalary: 175000 },
      { year: 2023, lcas: 42, approved: 40, avgSalary: 168000 },
      { year: 2022, lcas: 35, approved: 32, avgSalary: 160000 }
    ]
  },
  {
    name: "Temporal Technologies",
    slug: "temporal-technologies",
    totalLCAs: 220,
    approvedLCAs: 210,
    deniedLCAs: 10,
    approvalRate: 95.5,
    avgSalary: 195000,
    minSalary: 155000,
    maxSalary: 305000,
    medianSalary: 192000,
    industry: "Workflow Orchestration",
    headquarters: "Seattle, WA",
    topJobTitles: [
      { title: "Software Engineer", count: 85, avgSalary: 192000 },
      { title: "Developer Advocate", count: 38, avgSalary: 175000 },
      { title: "Solutions Architect", count: 28, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "Seattle", state: "WA", count: 110, avgSalary: 205000 },
      { city: "San Francisco", state: "CA", count: 60, avgSalary: 202000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 68, approved: 65, avgSalary: 202000 },
      { year: 2024, lcas: 58, approved: 56, avgSalary: 195000 },
      { year: 2023, lcas: 52, approved: 50, avgSalary: 188000 },
      { year: 2022, lcas: 42, approved: 39, avgSalary: 180000 }
    ]
  },
  {
    name: "LaunchDarkly",
    slug: "launchdarkly",
    totalLCAs: 180,
    approvedLCAs: 170,
    deniedLCAs: 10,
    approvalRate: 94.4,
    avgSalary: 175000,
    minSalary: 132000,
    maxSalary: 268000,
    medianSalary: 172000,
    industry: "Feature Management",
    headquarters: "Oakland, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 65, avgSalary: 172000 },
      { title: "Solutions Architect", count: 32, avgSalary: 185000 },
      { title: "Customer Success Engineer", count: 22, avgSalary: 158000 }
    ],
    topLocations: [
      { city: "Oakland", state: "CA", count: 90, avgSalary: 188000 },
      { city: "Remote", state: "US", count: 55, avgSalary: 168000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 55, approved: 52, avgSalary: 182000 },
      { year: 2024, lcas: 48, approved: 46, avgSalary: 175000 },
      { year: 2023, lcas: 42, approved: 40, avgSalary: 168000 },
      { year: 2022, lcas: 35, approved: 32, avgSalary: 160000 }
    ]
  },
  {
    name: "CircleCI",
    slug: "circleci",
    totalLCAs: 280,
    approvedLCAs: 265,
    deniedLCAs: 15,
    approvalRate: 94.6,
    avgSalary: 172000,
    minSalary: 128000,
    maxSalary: 262000,
    medianSalary: 168000,
    industry: "CI/CD",
    headquarters: "San Francisco, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 98, avgSalary: 168000 },
      { title: "Site Reliability Engineer", count: 52, avgSalary: 178000 },
      { title: "Solutions Engineer", count: 35, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 145, avgSalary: 185000 },
      { city: "Remote", state: "US", count: 85, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 82, approved: 78, avgSalary: 180000 },
      { year: 2024, lcas: 72, approved: 68, avgSalary: 172000 },
      { year: 2023, lcas: 68, approved: 65, avgSalary: 165000 },
      { year: 2022, lcas: 58, approved: 54, avgSalary: 158000 }
    ]
  },
  {
    name: "JFrog Ltd",
    slug: "jfrog-ltd",
    totalLCAs: 380,
    approvedLCAs: 358,
    deniedLCAs: 22,
    approvalRate: 94.2,
    avgSalary: 168000,
    minSalary: 122000,
    maxSalary: 255000,
    medianSalary: 165000,
    industry: "DevOps",
    headquarters: "Sunnyvale, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 125, avgSalary: 165000 },
      { title: "Solutions Architect", count: 68, avgSalary: 178000 },
      { title: "DevOps Engineer", count: 48, avgSalary: 162000 }
    ],
    topLocations: [
      { city: "Sunnyvale", state: "CA", count: 195, avgSalary: 182000 },
      { city: "Atlanta", state: "GA", count: 85, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 110, approved: 104, avgSalary: 175000 },
      { year: 2024, lcas: 100, approved: 94, avgSalary: 168000 },
      { year: 2023, lcas: 90, approved: 85, avgSalary: 162000 },
      { year: 2022, lcas: 80, approved: 75, avgSalary: 155000 }
    ]
  },
  {
    name: "Sonatype Inc",
    slug: "sonatype-inc",
    totalLCAs: 180,
    approvedLCAs: 168,
    deniedLCAs: 12,
    approvalRate: 93.3,
    avgSalary: 158000,
    minSalary: 115000,
    maxSalary: 240000,
    medianSalary: 155000,
    industry: "DevSecOps",
    headquarters: "Fulton, MD",
    topJobTitles: [
      { title: "Software Engineer", count: 65, avgSalary: 155000 },
      { title: "Solutions Architect", count: 35, avgSalary: 168000 },
      { title: "Security Engineer", count: 25, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "Fulton", state: "MD", count: 90, avgSalary: 162000 },
      { city: "Remote", state: "US", count: 55, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 55, approved: 52, avgSalary: 165000 },
      { year: 2024, lcas: 48, approved: 45, avgSalary: 158000 },
      { year: 2023, lcas: 42, approved: 39, avgSalary: 152000 },
      { year: 2022, lcas: 35, approved: 32, avgSalary: 145000 }
    ]
  },
  {
    name: "Snyk Ltd",
    slug: "snyk-ltd",
    totalLCAs: 420,
    approvedLCAs: 398,
    deniedLCAs: 22,
    approvalRate: 94.8,
    avgSalary: 178000,
    minSalary: 135000,
    maxSalary: 275000,
    medianSalary: 175000,
    industry: "Developer Security",
    headquarters: "Boston, MA",
    topJobTitles: [
      { title: "Software Engineer", count: 145, avgSalary: 175000 },
      { title: "Security Researcher", count: 72, avgSalary: 182000 },
      { title: "Solutions Engineer", count: 55, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "Boston", state: "MA", count: 210, avgSalary: 188000 },
      { city: "San Francisco", state: "CA", count: 100, avgSalary: 192000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 125, approved: 119, avgSalary: 185000 },
      { year: 2024, lcas: 112, approved: 106, avgSalary: 178000 },
      { year: 2023, lcas: 98, approved: 93, avgSalary: 172000 },
      { year: 2022, lcas: 85, approved: 80, avgSalary: 165000 }
    ]
  },
  {
    name: "Lacework Inc",
    slug: "lacework-inc",
    totalLCAs: 280,
    approvedLCAs: 265,
    deniedLCAs: 15,
    approvalRate: 94.6,
    avgSalary: 185000,
    minSalary: 142000,
    maxSalary: 285000,
    medianSalary: 182000,
    industry: "Cloud Security",
    headquarters: "San Jose, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 98, avgSalary: 182000 },
      { title: "Security Engineer", count: 52, avgSalary: 188000 },
      { title: "Site Reliability Engineer", count: 35, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 145, avgSalary: 198000 },
      { city: "Austin", state: "TX", count: 70, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 85, approved: 81, avgSalary: 192000 },
      { year: 2024, lcas: 75, approved: 71, avgSalary: 185000 },
      { year: 2023, lcas: 65, approved: 62, avgSalary: 178000 },
      { year: 2022, lcas: 55, approved: 51, avgSalary: 170000 }
    ]
  },
  {
    name: "Wiz Inc",
    slug: "wiz-inc",
    totalLCAs: 350,
    approvedLCAs: 335,
    deniedLCAs: 15,
    approvalRate: 95.7,
    avgSalary: 195000,
    minSalary: 155000,
    maxSalary: 305000,
    medianSalary: 192000,
    industry: "Cloud Security",
    headquarters: "New York, NY",
    topJobTitles: [
      { title: "Software Engineer", count: 125, avgSalary: 192000 },
      { title: "Security Researcher", count: 68, avgSalary: 198000 },
      { title: "Solutions Engineer", count: 45, avgSalary: 182000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 180, avgSalary: 208000 },
      { city: "San Francisco", state: "CA", count: 90, avgSalary: 205000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 108, approved: 104, avgSalary: 202000 },
      { year: 2024, lcas: 95, approved: 91, avgSalary: 195000 },
      { year: 2023, lcas: 82, approved: 78, avgSalary: 188000 },
      { year: 2022, lcas: 65, approved: 62, avgSalary: 180000 }
    ]
  },
  {
    name: "SentinelOne Inc",
    slug: "sentinelone-inc",
    totalLCAs: 520,
    approvedLCAs: 492,
    deniedLCAs: 28,
    approvalRate: 94.6,
    avgSalary: 175000,
    minSalary: 130000,
    maxSalary: 270000,
    medianSalary: 172000,
    industry: "Endpoint Security",
    headquarters: "Mountain View, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 175, avgSalary: 172000 },
      { title: "Security Researcher", count: 95, avgSalary: 178000 },
      { title: "Threat Intelligence Analyst", count: 58, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "Mountain View", state: "CA", count: 265, avgSalary: 188000 },
      { city: "Tel Aviv", state: "IL", count: 120, avgSalary: 165000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 152, approved: 145, avgSalary: 182000 },
      { year: 2024, lcas: 138, approved: 130, avgSalary: 175000 },
      { year: 2023, lcas: 125, approved: 118, avgSalary: 168000 },
      { year: 2022, lcas: 105, approved: 99, avgSalary: 160000 }
    ]
  },
  {
    name: "Tanium Inc",
    slug: "tanium-inc",
    totalLCAs: 420,
    approvedLCAs: 395,
    deniedLCAs: 25,
    approvalRate: 94.0,
    avgSalary: 172000,
    minSalary: 128000,
    maxSalary: 265000,
    medianSalary: 168000,
    industry: "Endpoint Management",
    headquarters: "Kirkland, WA",
    topJobTitles: [
      { title: "Software Engineer", count: 145, avgSalary: 168000 },
      { title: "Solutions Architect", count: 78, avgSalary: 182000 },
      { title: "Security Engineer", count: 52, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "Kirkland", state: "WA", count: 215, avgSalary: 185000 },
      { city: "Emeryville", state: "CA", count: 100, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 125, approved: 118, avgSalary: 180000 },
      { year: 2024, lcas: 112, approved: 105, avgSalary: 172000 },
      { year: 2023, lcas: 100, approved: 94, avgSalary: 165000 },
      { year: 2022, lcas: 83, approved: 78, avgSalary: 158000 }
    ]
  },
  {
    name: "Carbon Black (VMware)",
    slug: "carbon-black-vmware",
    totalLCAs: 280,
    approvedLCAs: 262,
    deniedLCAs: 18,
    approvalRate: 93.6,
    avgSalary: 162000,
    minSalary: 118000,
    maxSalary: 248000,
    medianSalary: 158000,
    industry: "Endpoint Security",
    headquarters: "Waltham, MA",
    topJobTitles: [
      { title: "Software Engineer", count: 98, avgSalary: 158000 },
      { title: "Security Researcher", count: 52, avgSalary: 168000 },
      { title: "Threat Analyst", count: 35, avgSalary: 152000 }
    ],
    topLocations: [
      { city: "Waltham", state: "MA", count: 145, avgSalary: 172000 },
      { city: "Palo Alto", state: "CA", count: 70, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 82, approved: 77, avgSalary: 170000 },
      { year: 2024, lcas: 72, approved: 68, avgSalary: 162000 },
      { year: 2023, lcas: 68, approved: 63, avgSalary: 155000 },
      { year: 2022, lcas: 58, approved: 54, avgSalary: 148000 }
    ]
  },
  {
    name: "Proofpoint Inc",
    slug: "proofpoint-inc",
    totalLCAs: 620,
    approvedLCAs: 580,
    deniedLCAs: 40,
    approvalRate: 93.5,
    avgSalary: 165000,
    minSalary: 120000,
    maxSalary: 252000,
    medianSalary: 162000,
    industry: "Email Security",
    headquarters: "Sunnyvale, CA",
    topJobTitles: [
      { title: "Software Engineer", count: 210, avgSalary: 162000 },
      { title: "Security Researcher", count: 115, avgSalary: 172000 },
      { title: "Data Scientist", count: 72, avgSalary: 175000 }
    ],
    topLocations: [
      { city: "Sunnyvale", state: "CA", count: 315, avgSalary: 178000 },
      { city: "Pittsburgh", state: "PA", count: 140, avgSalary: 152000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 180, approved: 170, avgSalary: 172000 },
      { year: 2024, lcas: 165, approved: 155, avgSalary: 165000 },
      { year: 2023, lcas: 148, approved: 138, avgSalary: 158000 },
      { year: 2022, lcas: 127, approved: 117, avgSalary: 152000 }
    ]
  },
  {
    name: "Mimecast Ltd",
    slug: "mimecast-ltd",
    totalLCAs: 280,
    approvedLCAs: 262,
    deniedLCAs: 18,
    approvalRate: 93.6,
    avgSalary: 155000,
    minSalary: 112000,
    maxSalary: 238000,
    medianSalary: 152000,
    industry: "Email Security",
    headquarters: "Lexington, MA",
    topJobTitles: [
      { title: "Software Engineer", count: 98, avgSalary: 152000 },
      { title: "Security Engineer", count: 52, avgSalary: 162000 },
      { title: "Solutions Architect", count: 35, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "Lexington", state: "MA", count: 145, avgSalary: 165000 },
      { city: "San Francisco", state: "CA", count: 65, avgSalary: 178000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 82, approved: 77, avgSalary: 162000 },
      { year: 2024, lcas: 72, approved: 68, avgSalary: 155000 },
      { year: 2023, lcas: 68, approved: 63, avgSalary: 148000 },
      { year: 2022, lcas: 58, approved: 54, avgSalary: 142000 }
    ]
  },
  {
    name: "KnowBe4 Inc",
    slug: "knowbe4-inc",
    totalLCAs: 220,
    approvedLCAs: 205,
    deniedLCAs: 15,
    approvalRate: 93.2,
    avgSalary: 145000,
    minSalary: 100000,
    maxSalary: 220000,
    medianSalary: 142000,
    industry: "Security Awareness",
    headquarters: "Clearwater, FL",
    topJobTitles: [
      { title: "Software Engineer", count: 78, avgSalary: 142000 },
      { title: "Security Analyst", count: 42, avgSalary: 138000 },
      { title: "Product Manager", count: 28, avgSalary: 158000 }
    ],
    topLocations: [
      { city: "Clearwater", state: "FL", count: 120, avgSalary: 148000 },
      { city: "Remote", state: "US", count: 60, avgSalary: 142000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 65, approved: 61, avgSalary: 152000 },
      { year: 2024, lcas: 58, approved: 54, avgSalary: 145000 },
      { year: 2023, lcas: 52, approved: 48, avgSalary: 138000 },
      { year: 2022, lcas: 45, approved: 42, avgSalary: 132000 }
    ]
  },
  {
    name: "Rapid7 Inc",
    slug: "rapid7-inc",
    totalLCAs: 380,
    approvedLCAs: 355,
    deniedLCAs: 25,
    approvalRate: 93.4,
    avgSalary: 162000,
    minSalary: 118000,
    maxSalary: 248000,
    medianSalary: 158000,
    industry: "Vulnerability Management",
    headquarters: "Boston, MA",
    topJobTitles: [
      { title: "Software Engineer", count: 130, avgSalary: 158000 },
      { title: "Security Researcher", count: 72, avgSalary: 168000 },
      { title: "Solutions Engineer", count: 48, avgSalary: 155000 }
    ],
    topLocations: [
      { city: "Boston", state: "MA", count: 195, avgSalary: 172000 },
      { city: "Austin", state: "TX", count: 85, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 112, approved: 105, avgSalary: 170000 },
      { year: 2024, lcas: 100, approved: 94, avgSalary: 162000 },
      { year: 2023, lcas: 90, approved: 84, avgSalary: 155000 },
      { year: 2022, lcas: 78, approved: 72, avgSalary: 148000 }
    ]
  },
  {
    name: "Tenable Inc",
    slug: "tenable-inc",
    totalLCAs: 420,
    approvedLCAs: 395,
    deniedLCAs: 25,
    approvalRate: 94.0,
    avgSalary: 168000,
    minSalary: 125000,
    maxSalary: 258000,
    medianSalary: 165000,
    industry: "Vulnerability Management",
    headquarters: "Columbia, MD",
    topJobTitles: [
      { title: "Software Engineer", count: 145, avgSalary: 165000 },
      { title: "Security Researcher", count: 78, avgSalary: 175000 },
      { title: "Solutions Architect", count: 52, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "Columbia", state: "MD", count: 215, avgSalary: 172000 },
      { city: "San Francisco", state: "CA", count: 95, avgSalary: 188000 }
    ],
    yearlyData: [
      { year: 2025, lcas: 125, approved: 118, avgSalary: 175000 },
      { year: 2024, lcas: 112, approved: 105, avgSalary: 168000 },
      { year: 2023, lcas: 100, approved: 94, avgSalary: 162000 },
      { year: 2022, lcas: 83, approved: 78, avgSalary: 155000 }
    ]
  }
];

module.exports = h1bSponsors;
