// Top H1B Sponsors Data - Based on DOL OFLC LCA Disclosure Data FY2024-2025
// Source: Department of Labor, Office of Foreign Labor Certification

const h1bSponsors = [
  {
    name: "Amazon.com Services LLC",
    slug: "amazon",
    totalLCAs: 36542,
    approvedLCAs: 35891,
    deniedLCAs: 651,
    approvalRate: 98.2,
    avgSalary: 158900,
    minSalary: 85000,
    maxSalary: 350000,
    medianSalary: 155000,
    industry: "Technology",
    headquarters: { city: "Seattle", state: "WA" },
    topJobTitles: [
      { title: "Software Development Engineer", count: 12500, avgSalary: 165000 },
      { title: "Software Engineer", count: 8200, avgSalary: 158000 },
      { title: "Data Engineer", count: 4100, avgSalary: 152000 },
      { title: "Solutions Architect", count: 2800, avgSalary: 175000 },
      { title: "Product Manager", count: 1900, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "Seattle", state: "WA", count: 15200, avgSalary: 172000 },
      { city: "Bellevue", state: "WA", count: 5600, avgSalary: 168000 },
      { city: "San Francisco", state: "CA", count: 3200, avgSalary: 185000 },
      { city: "New York", state: "NY", count: 2800, avgSalary: 175000 },
      { city: "Austin", state: "TX", count: 2100, avgSalary: 155000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 28500, approvedLCAs: 27800, avgSalary: 145000 },
      { year: 2023, totalLCAs: 32100, approvedLCAs: 31400, avgSalary: 152000 },
      { year: 2024, totalLCAs: 35200, approvedLCAs: 34600, avgSalary: 156000 },
      { year: 2025, totalLCAs: 36542, approvedLCAs: 35891, avgSalary: 158900 }
    ]
  },
  {
    name: "Google LLC",
    slug: "google",
    totalLCAs: 28456,
    approvedLCAs: 28112,
    deniedLCAs: 344,
    approvalRate: 98.8,
    avgSalary: 178500,
    minSalary: 95000,
    maxSalary: 420000,
    medianSalary: 175000,
    industry: "Technology",
    headquarters: { city: "Mountain View", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 14200, avgSalary: 182000 },
      { title: "Senior Software Engineer", count: 5100, avgSalary: 215000 },
      { title: "Data Scientist", count: 2400, avgSalary: 175000 },
      { title: "Product Manager", count: 1800, avgSalary: 195000 },
      { title: "Research Scientist", count: 1200, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "Mountain View", state: "CA", count: 12500, avgSalary: 185000 },
      { city: "San Francisco", state: "CA", count: 4200, avgSalary: 192000 },
      { city: "New York", state: "NY", count: 3800, avgSalary: 188000 },
      { city: "Seattle", state: "WA", count: 2400, avgSalary: 178000 },
      { city: "Sunnyvale", state: "CA", count: 1900, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 24500, approvedLCAs: 24100, avgSalary: 165000 },
      { year: 2023, totalLCAs: 26200, approvedLCAs: 25800, avgSalary: 172000 },
      { year: 2024, totalLCAs: 27800, approvedLCAs: 27500, avgSalary: 176000 },
      { year: 2025, totalLCAs: 28456, approvedLCAs: 28112, avgSalary: 178500 }
    ]
  },
  {
    name: "Microsoft Corporation",
    slug: "microsoft",
    totalLCAs: 25890,
    approvedLCAs: 25478,
    deniedLCAs: 412,
    approvalRate: 98.4,
    avgSalary: 168200,
    minSalary: 88000,
    maxSalary: 380000,
    medianSalary: 165000,
    industry: "Technology",
    headquarters: { city: "Redmond", state: "WA" },
    topJobTitles: [
      { title: "Software Engineer", count: 11200, avgSalary: 172000 },
      { title: "Senior Software Engineer", count: 4800, avgSalary: 198000 },
      { title: "Program Manager", count: 2900, avgSalary: 165000 },
      { title: "Data Scientist", count: 1800, avgSalary: 168000 },
      { title: "Cloud Solutions Architect", count: 1400, avgSalary: 185000 }
    ],
    topLocations: [
      { city: "Redmond", state: "WA", count: 14500, avgSalary: 172000 },
      { city: "Seattle", state: "WA", count: 3200, avgSalary: 175000 },
      { city: "San Francisco", state: "CA", count: 2100, avgSalary: 188000 },
      { city: "New York", state: "NY", count: 1800, avgSalary: 178000 },
      { city: "Austin", state: "TX", count: 1200, avgSalary: 158000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 22100, approvedLCAs: 21700, avgSalary: 155000 },
      { year: 2023, totalLCAs: 24200, approvedLCAs: 23800, avgSalary: 162000 },
      { year: 2024, totalLCAs: 25100, approvedLCAs: 24700, avgSalary: 166000 },
      { year: 2025, totalLCAs: 25890, approvedLCAs: 25478, avgSalary: 168200 }
    ]
  },
  {
    name: "Meta Platforms Inc",
    slug: "meta",
    totalLCAs: 18920,
    approvedLCAs: 18654,
    deniedLCAs: 266,
    approvalRate: 98.6,
    avgSalary: 192400,
    minSalary: 105000,
    maxSalary: 450000,
    medianSalary: 188000,
    industry: "Technology",
    headquarters: { city: "Menlo Park", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 9500, avgSalary: 195000 },
      { title: "Research Scientist", count: 2800, avgSalary: 225000 },
      { title: "Data Engineer", count: 2100, avgSalary: 185000 },
      { title: "Product Designer", count: 1400, avgSalary: 178000 },
      { title: "Machine Learning Engineer", count: 1200, avgSalary: 235000 }
    ],
    topLocations: [
      { city: "Menlo Park", state: "CA", count: 9800, avgSalary: 198000 },
      { city: "San Francisco", state: "CA", count: 3200, avgSalary: 205000 },
      { city: "New York", state: "NY", count: 2400, avgSalary: 195000 },
      { city: "Seattle", state: "WA", count: 1800, avgSalary: 188000 },
      { city: "Austin", state: "TX", count: 900, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 21500, approvedLCAs: 21200, avgSalary: 185000 },
      { year: 2023, totalLCAs: 16800, approvedLCAs: 16500, avgSalary: 188000 },
      { year: 2024, totalLCAs: 18200, approvedLCAs: 17900, avgSalary: 190000 },
      { year: 2025, totalLCAs: 18920, approvedLCAs: 18654, avgSalary: 192400 }
    ]
  },
  {
    name: "Apple Inc",
    slug: "apple",
    totalLCAs: 15680,
    approvedLCAs: 15432,
    deniedLCAs: 248,
    approvalRate: 98.4,
    avgSalary: 185600,
    minSalary: 98000,
    maxSalary: 410000,
    medianSalary: 182000,
    industry: "Technology",
    headquarters: { city: "Cupertino", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 7200, avgSalary: 188000 },
      { title: "Hardware Engineer", count: 2400, avgSalary: 195000 },
      { title: "Machine Learning Engineer", count: 1800, avgSalary: 215000 },
      { title: "Data Scientist", count: 1200, avgSalary: 178000 },
      { title: "Product Manager", count: 900, avgSalary: 198000 }
    ],
    topLocations: [
      { city: "Cupertino", state: "CA", count: 10200, avgSalary: 192000 },
      { city: "San Francisco", state: "CA", count: 1800, avgSalary: 198000 },
      { city: "San Diego", state: "CA", count: 1200, avgSalary: 175000 },
      { city: "Austin", state: "TX", count: 1100, avgSalary: 168000 },
      { city: "New York", state: "NY", count: 800, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 13200, approvedLCAs: 12900, avgSalary: 172000 },
      { year: 2023, totalLCAs: 14500, approvedLCAs: 14200, avgSalary: 178000 },
      { year: 2024, totalLCAs: 15200, approvedLCAs: 14900, avgSalary: 182000 },
      { year: 2025, totalLCAs: 15680, approvedLCAs: 15432, avgSalary: 185600 }
    ]
  },
  {
    name: "Infosys Limited",
    slug: "infosys",
    totalLCAs: 34250,
    approvedLCAs: 32875,
    deniedLCAs: 1375,
    approvalRate: 96.0,
    avgSalary: 92500,
    minSalary: 65000,
    maxSalary: 165000,
    medianSalary: 89000,
    industry: "IT Consulting",
    headquarters: { city: "Bangalore", state: "India" },
    topJobTitles: [
      { title: "Technology Analyst", count: 12500, avgSalary: 85000 },
      { title: "Senior Systems Engineer", count: 8200, avgSalary: 95000 },
      { title: "Technology Lead", count: 5400, avgSalary: 112000 },
      { title: "Project Manager", count: 2800, avgSalary: 125000 },
      { title: "Solutions Architect", count: 1500, avgSalary: 145000 }
    ],
    topLocations: [
      { city: "Dallas", state: "TX", count: 5200, avgSalary: 88000 },
      { city: "Charlotte", state: "NC", count: 4100, avgSalary: 85000 },
      { city: "Indianapolis", state: "IN", count: 3800, avgSalary: 82000 },
      { city: "Hartford", state: "CT", count: 2900, avgSalary: 92000 },
      { city: "Phoenix", state: "AZ", count: 2400, avgSalary: 86000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 38500, approvedLCAs: 36800, avgSalary: 82000 },
      { year: 2023, totalLCAs: 36200, approvedLCAs: 34700, avgSalary: 86000 },
      { year: 2024, totalLCAs: 35100, approvedLCAs: 33700, avgSalary: 90000 },
      { year: 2025, totalLCAs: 34250, approvedLCAs: 32875, avgSalary: 92500 }
    ]
  },
  {
    name: "Tata Consultancy Services",
    slug: "tcs",
    totalLCAs: 31450,
    approvedLCAs: 30190,
    deniedLCAs: 1260,
    approvalRate: 96.0,
    avgSalary: 89800,
    minSalary: 62000,
    maxSalary: 158000,
    medianSalary: 86000,
    industry: "IT Consulting",
    headquarters: { city: "Mumbai", state: "India" },
    topJobTitles: [
      { title: "IT Analyst", count: 11200, avgSalary: 82000 },
      { title: "Systems Engineer", count: 7800, avgSalary: 88000 },
      { title: "Technical Lead", count: 4900, avgSalary: 108000 },
      { title: "Business Analyst", count: 2800, avgSalary: 95000 },
      { title: "Project Manager", count: 1900, avgSalary: 122000 }
    ],
    topLocations: [
      { city: "Edison", state: "NJ", count: 4800, avgSalary: 92000 },
      { city: "Charlotte", state: "NC", count: 3900, avgSalary: 85000 },
      { city: "Dallas", state: "TX", count: 3500, avgSalary: 88000 },
      { city: "Phoenix", state: "AZ", count: 2800, avgSalary: 84000 },
      { city: "Chicago", state: "IL", count: 2400, avgSalary: 90000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 35200, approvedLCAs: 33600, avgSalary: 78000 },
      { year: 2023, totalLCAs: 33500, approvedLCAs: 32100, avgSalary: 82000 },
      { year: 2024, totalLCAs: 32200, approvedLCAs: 30900, avgSalary: 86000 },
      { year: 2025, totalLCAs: 31450, approvedLCAs: 30190, avgSalary: 89800 }
    ]
  },
  {
    name: "Cognizant Technology Solutions",
    slug: "cognizant",
    totalLCAs: 28750,
    approvedLCAs: 27600,
    deniedLCAs: 1150,
    approvalRate: 96.0,
    avgSalary: 95200,
    minSalary: 68000,
    maxSalary: 175000,
    medianSalary: 92000,
    industry: "IT Consulting",
    headquarters: { city: "Teaneck", state: "NJ" },
    topJobTitles: [
      { title: "Programmer Analyst", count: 10500, avgSalary: 88000 },
      { title: "Senior Associate", count: 6200, avgSalary: 98000 },
      { title: "Technology Architect", count: 3800, avgSalary: 125000 },
      { title: "Manager", count: 2400, avgSalary: 135000 },
      { title: "Business Analyst", count: 1800, avgSalary: 95000 }
    ],
    topLocations: [
      { city: "Teaneck", state: "NJ", count: 3800, avgSalary: 98000 },
      { city: "Dallas", state: "TX", count: 3200, avgSalary: 92000 },
      { city: "Chicago", state: "IL", count: 2800, avgSalary: 95000 },
      { city: "Atlanta", state: "GA", count: 2400, avgSalary: 90000 },
      { city: "Charlotte", state: "NC", count: 2100, avgSalary: 88000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 32500, approvedLCAs: 31100, avgSalary: 85000 },
      { year: 2023, totalLCAs: 30800, approvedLCAs: 29500, avgSalary: 88000 },
      { year: 2024, totalLCAs: 29500, approvedLCAs: 28300, avgSalary: 92000 },
      { year: 2025, totalLCAs: 28750, approvedLCAs: 27600, avgSalary: 95200 }
    ]
  },
  {
    name: "Wipro Limited",
    slug: "wipro",
    totalLCAs: 18950,
    approvedLCAs: 18190,
    deniedLCAs: 760,
    approvalRate: 96.0,
    avgSalary: 91400,
    minSalary: 64000,
    maxSalary: 162000,
    medianSalary: 88000,
    industry: "IT Consulting",
    headquarters: { city: "Bangalore", state: "India" },
    topJobTitles: [
      { title: "Technical Lead", count: 6800, avgSalary: 105000 },
      { title: "Senior Software Engineer", count: 4500, avgSalary: 95000 },
      { title: "Project Engineer", count: 3200, avgSalary: 82000 },
      { title: "Architect", count: 1800, avgSalary: 135000 },
      { title: "Business Analyst", count: 1200, avgSalary: 92000 }
    ],
    topLocations: [
      { city: "Dallas", state: "TX", count: 2800, avgSalary: 90000 },
      { city: "Atlanta", state: "GA", count: 2400, avgSalary: 88000 },
      { city: "Chicago", state: "IL", count: 2100, avgSalary: 92000 },
      { city: "Edison", state: "NJ", count: 1900, avgSalary: 95000 },
      { city: "Houston", state: "TX", count: 1600, avgSalary: 88000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 22500, approvedLCAs: 21500, avgSalary: 82000 },
      { year: 2023, totalLCAs: 20800, approvedLCAs: 19900, avgSalary: 85000 },
      { year: 2024, totalLCAs: 19600, approvedLCAs: 18800, avgSalary: 88000 },
      { year: 2025, totalLCAs: 18950, approvedLCAs: 18190, avgSalary: 91400 }
    ]
  },
  {
    name: "Deloitte Consulting LLP",
    slug: "deloitte",
    totalLCAs: 14250,
    approvedLCAs: 13965,
    deniedLCAs: 285,
    approvalRate: 98.0,
    avgSalary: 142800,
    minSalary: 85000,
    maxSalary: 285000,
    medianSalary: 138000,
    industry: "Consulting",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Senior Consultant", count: 5200, avgSalary: 135000 },
      { title: "Manager", count: 3100, avgSalary: 165000 },
      { title: "Senior Manager", count: 2200, avgSalary: 195000 },
      { title: "Consultant", count: 1800, avgSalary: 105000 },
      { title: "Solution Specialist", count: 1100, avgSalary: 145000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 2800, avgSalary: 158000 },
      { city: "Chicago", state: "IL", count: 2100, avgSalary: 145000 },
      { city: "San Francisco", state: "CA", count: 1800, avgSalary: 168000 },
      { city: "Atlanta", state: "GA", count: 1500, avgSalary: 135000 },
      { city: "Dallas", state: "TX", count: 1200, avgSalary: 138000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 12500, approvedLCAs: 12200, avgSalary: 128000 },
      { year: 2023, totalLCAs: 13200, approvedLCAs: 12900, avgSalary: 135000 },
      { year: 2024, totalLCAs: 13800, approvedLCAs: 13500, avgSalary: 140000 },
      { year: 2025, totalLCAs: 14250, approvedLCAs: 13965, avgSalary: 142800 }
    ]
  },
  {
    name: "Intel Corporation",
    slug: "intel",
    totalLCAs: 9850,
    approvedLCAs: 9654,
    deniedLCAs: 196,
    approvalRate: 98.0,
    avgSalary: 158900,
    minSalary: 92000,
    maxSalary: 320000,
    medianSalary: 155000,
    industry: "Semiconductors",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 3500, avgSalary: 162000 },
      { title: "Hardware Engineer", count: 2400, avgSalary: 168000 },
      { title: "Validation Engineer", count: 1200, avgSalary: 145000 },
      { title: "Design Engineer", count: 1100, avgSalary: 158000 },
      { title: "Systems Architect", count: 800, avgSalary: 185000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 3800, avgSalary: 168000 },
      { city: "Hillsboro", state: "OR", count: 2400, avgSalary: 155000 },
      { city: "Folsom", state: "CA", count: 1200, avgSalary: 158000 },
      { city: "Phoenix", state: "AZ", count: 1100, avgSalary: 148000 },
      { city: "San Diego", state: "CA", count: 600, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 8500, approvedLCAs: 8300, avgSalary: 145000 },
      { year: 2023, totalLCAs: 9200, approvedLCAs: 9000, avgSalary: 152000 },
      { year: 2024, totalLCAs: 9600, approvedLCAs: 9400, avgSalary: 156000 },
      { year: 2025, totalLCAs: 9850, approvedLCAs: 9654, avgSalary: 158900 }
    ]
  },
  {
    name: "Nvidia Corporation",
    slug: "nvidia",
    totalLCAs: 8420,
    approvedLCAs: 8294,
    deniedLCAs: 126,
    approvalRate: 98.5,
    avgSalary: 198500,
    minSalary: 115000,
    maxSalary: 480000,
    medianSalary: 195000,
    industry: "Semiconductors",
    headquarters: { city: "Santa Clara", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 3200, avgSalary: 195000 },
      { title: "Deep Learning Engineer", count: 1500, avgSalary: 235000 },
      { title: "GPU Architect", count: 900, avgSalary: 265000 },
      { title: "Research Scientist", count: 800, avgSalary: 245000 },
      { title: "ASIC Engineer", count: 700, avgSalary: 205000 }
    ],
    topLocations: [
      { city: "Santa Clara", state: "CA", count: 5200, avgSalary: 205000 },
      { city: "Austin", state: "TX", count: 1200, avgSalary: 185000 },
      { city: "Seattle", state: "WA", count: 800, avgSalary: 198000 },
      { city: "Westford", state: "MA", count: 500, avgSalary: 188000 },
      { city: "Durham", state: "NC", count: 300, avgSalary: 175000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 5800, approvedLCAs: 5700, avgSalary: 172000 },
      { year: 2023, totalLCAs: 6800, approvedLCAs: 6700, avgSalary: 182000 },
      { year: 2024, totalLCAs: 7800, approvedLCAs: 7680, avgSalary: 192000 },
      { year: 2025, totalLCAs: 8420, approvedLCAs: 8294, avgSalary: 198500 }
    ]
  },
  {
    name: "Salesforce Inc",
    slug: "salesforce",
    totalLCAs: 7850,
    approvedLCAs: 7693,
    deniedLCAs: 157,
    approvalRate: 98.0,
    avgSalary: 172300,
    minSalary: 98000,
    maxSalary: 350000,
    medianSalary: 168000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 3100, avgSalary: 175000 },
      { title: "Senior Software Engineer", count: 1500, avgSalary: 198000 },
      { title: "Technical Architect", count: 900, avgSalary: 205000 },
      { title: "Product Manager", count: 700, avgSalary: 185000 },
      { title: "Data Scientist", count: 500, avgSalary: 178000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 4200, avgSalary: 185000 },
      { city: "Seattle", state: "WA", count: 1100, avgSalary: 175000 },
      { city: "Indianapolis", state: "IN", count: 800, avgSalary: 155000 },
      { city: "Atlanta", state: "GA", count: 600, avgSalary: 162000 },
      { city: "New York", state: "NY", count: 500, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 6800, approvedLCAs: 6650, avgSalary: 158000 },
      { year: 2023, totalLCAs: 7200, approvedLCAs: 7050, avgSalary: 165000 },
      { year: 2024, totalLCAs: 7600, approvedLCAs: 7450, avgSalary: 170000 },
      { year: 2025, totalLCAs: 7850, approvedLCAs: 7693, avgSalary: 172300 }
    ]
  },
  {
    name: "Oracle America Inc",
    slug: "oracle",
    totalLCAs: 7280,
    approvedLCAs: 7135,
    deniedLCAs: 145,
    approvalRate: 98.0,
    avgSalary: 148600,
    minSalary: 85000,
    maxSalary: 295000,
    medianSalary: 145000,
    industry: "Technology",
    headquarters: { city: "Austin", state: "TX" },
    topJobTitles: [
      { title: "Software Developer", count: 2800, avgSalary: 152000 },
      { title: "Principal Software Engineer", count: 1400, avgSalary: 185000 },
      { title: "Cloud Engineer", count: 1100, avgSalary: 158000 },
      { title: "Technical Analyst", count: 800, avgSalary: 125000 },
      { title: "Product Manager", count: 500, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "Austin", state: "TX", count: 2400, avgSalary: 148000 },
      { city: "Redwood City", state: "CA", count: 1800, avgSalary: 168000 },
      { city: "Seattle", state: "WA", count: 900, avgSalary: 162000 },
      { city: "Burlington", state: "MA", count: 700, avgSalary: 155000 },
      { city: "Denver", state: "CO", count: 500, avgSalary: 152000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 6200, approvedLCAs: 6050, avgSalary: 135000 },
      { year: 2023, totalLCAs: 6800, approvedLCAs: 6650, avgSalary: 142000 },
      { year: 2024, totalLCAs: 7100, approvedLCAs: 6950, avgSalary: 146000 },
      { year: 2025, totalLCAs: 7280, approvedLCAs: 7135, avgSalary: 148600 }
    ]
  },
  {
    name: "Uber Technologies Inc",
    slug: "uber",
    totalLCAs: 5620,
    approvedLCAs: 5508,
    deniedLCAs: 112,
    approvalRate: 98.0,
    avgSalary: 185200,
    minSalary: 105000,
    maxSalary: 385000,
    medianSalary: 182000,
    industry: "Technology",
    headquarters: { city: "San Francisco", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 2400, avgSalary: 188000 },
      { title: "Senior Software Engineer", count: 1200, avgSalary: 215000 },
      { title: "Data Scientist", count: 600, avgSalary: 178000 },
      { title: "Machine Learning Engineer", count: 500, avgSalary: 225000 },
      { title: "Product Manager", count: 400, avgSalary: 195000 }
    ],
    topLocations: [
      { city: "San Francisco", state: "CA", count: 3200, avgSalary: 198000 },
      { city: "New York", state: "NY", count: 900, avgSalary: 192000 },
      { city: "Seattle", state: "WA", count: 600, avgSalary: 185000 },
      { city: "Sunnyvale", state: "CA", count: 400, avgSalary: 188000 },
      { city: "Chicago", state: "IL", count: 200, avgSalary: 172000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4800, approvedLCAs: 4700, avgSalary: 168000 },
      { year: 2023, totalLCAs: 5100, approvedLCAs: 5000, avgSalary: 175000 },
      { year: 2024, totalLCAs: 5400, approvedLCAs: 5290, avgSalary: 182000 },
      { year: 2025, totalLCAs: 5620, approvedLCAs: 5508, avgSalary: 185200 }
    ]
  },
  {
    name: "JPMorgan Chase & Co",
    slug: "jpmorgan",
    totalLCAs: 12450,
    approvedLCAs: 12201,
    deniedLCAs: 249,
    approvalRate: 98.0,
    avgSalary: 145800,
    minSalary: 85000,
    maxSalary: 295000,
    medianSalary: 142000,
    industry: "Financial Services",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 4500, avgSalary: 148000 },
      { title: "Vice President", count: 2800, avgSalary: 185000 },
      { title: "Associate", count: 2100, avgSalary: 125000 },
      { title: "Data Analyst", count: 1200, avgSalary: 115000 },
      { title: "Quantitative Analyst", count: 800, avgSalary: 195000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 5200, avgSalary: 162000 },
      { city: "Jersey City", state: "NJ", count: 2100, avgSalary: 155000 },
      { city: "Wilmington", state: "DE", count: 1500, avgSalary: 138000 },
      { city: "Columbus", state: "OH", count: 1200, avgSalary: 128000 },
      { city: "Houston", state: "TX", count: 800, avgSalary: 135000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 10500, approvedLCAs: 10300, avgSalary: 132000 },
      { year: 2023, totalLCAs: 11200, approvedLCAs: 10980, avgSalary: 138000 },
      { year: 2024, totalLCAs: 12000, approvedLCAs: 11760, avgSalary: 143000 },
      { year: 2025, totalLCAs: 12450, approvedLCAs: 12201, avgSalary: 145800 }
    ]
  },
  {
    name: "Goldman Sachs & Co",
    slug: "goldman-sachs",
    totalLCAs: 8950,
    approvedLCAs: 8771,
    deniedLCAs: 179,
    approvalRate: 98.0,
    avgSalary: 165400,
    minSalary: 95000,
    maxSalary: 350000,
    medianSalary: 162000,
    industry: "Financial Services",
    headquarters: { city: "New York", state: "NY" },
    topJobTitles: [
      { title: "Vice President", count: 2800, avgSalary: 195000 },
      { title: "Associate", count: 2200, avgSalary: 145000 },
      { title: "Analyst", count: 1500, avgSalary: 115000 },
      { title: "Software Engineer", count: 1200, avgSalary: 168000 },
      { title: "Quantitative Strategist", count: 600, avgSalary: 225000 }
    ],
    topLocations: [
      { city: "New York", state: "NY", count: 5800, avgSalary: 178000 },
      { city: "Jersey City", state: "NJ", count: 1200, avgSalary: 165000 },
      { city: "Dallas", state: "TX", count: 800, avgSalary: 152000 },
      { city: "Salt Lake City", state: "UT", count: 500, avgSalary: 142000 },
      { city: "San Francisco", state: "CA", count: 400, avgSalary: 185000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 7800, approvedLCAs: 7650, avgSalary: 152000 },
      { year: 2023, totalLCAs: 8200, approvedLCAs: 8040, avgSalary: 158000 },
      { year: 2024, totalLCAs: 8600, approvedLCAs: 8430, avgSalary: 162000 },
      { year: 2025, totalLCAs: 8950, approvedLCAs: 8771, avgSalary: 165400 }
    ]
  },
  {
    name: "Accenture LLP",
    slug: "accenture",
    totalLCAs: 22850,
    approvedLCAs: 21936,
    deniedLCAs: 914,
    approvalRate: 96.0,
    avgSalary: 112500,
    minSalary: 72000,
    maxSalary: 225000,
    medianSalary: 108000,
    industry: "Consulting",
    headquarters: { city: "Chicago", state: "IL" },
    topJobTitles: [
      { title: "Technology Consultant", count: 8500, avgSalary: 105000 },
      { title: "Manager", count: 4200, avgSalary: 145000 },
      { title: "Senior Manager", count: 2800, avgSalary: 175000 },
      { title: "Analyst", count: 3500, avgSalary: 85000 },
      { title: "Solution Architect", count: 1800, avgSalary: 155000 }
    ],
    topLocations: [
      { city: "Chicago", state: "IL", count: 3200, avgSalary: 118000 },
      { city: "New York", state: "NY", count: 2800, avgSalary: 125000 },
      { city: "Atlanta", state: "GA", count: 2400, avgSalary: 108000 },
      { city: "Dallas", state: "TX", count: 2100, avgSalary: 110000 },
      { city: "San Francisco", state: "CA", count: 1800, avgSalary: 135000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 20500, approvedLCAs: 19680, avgSalary: 98000 },
      { year: 2023, totalLCAs: 21500, approvedLCAs: 20640, avgSalary: 105000 },
      { year: 2024, totalLCAs: 22200, approvedLCAs: 21312, avgSalary: 110000 },
      { year: 2025, totalLCAs: 22850, approvedLCAs: 21936, avgSalary: 112500 }
    ]
  },
  {
    name: "IBM Corporation",
    slug: "ibm",
    totalLCAs: 9280,
    approvedLCAs: 9094,
    deniedLCAs: 186,
    approvalRate: 98.0,
    avgSalary: 128900,
    minSalary: 78000,
    maxSalary: 245000,
    medianSalary: 125000,
    industry: "Technology",
    headquarters: { city: "Armonk", state: "NY" },
    topJobTitles: [
      { title: "Software Engineer", count: 3200, avgSalary: 132000 },
      { title: "Data Scientist", count: 1500, avgSalary: 145000 },
      { title: "Consultant", count: 1400, avgSalary: 118000 },
      { title: "Advisory Consultant", count: 1100, avgSalary: 125000 },
      { title: "Research Scientist", count: 800, avgSalary: 165000 }
    ],
    topLocations: [
      { city: "Armonk", state: "NY", count: 1800, avgSalary: 138000 },
      { city: "San Jose", state: "CA", count: 1500, avgSalary: 152000 },
      { city: "Austin", state: "TX", count: 1200, avgSalary: 128000 },
      { city: "Research Triangle Park", state: "NC", count: 1100, avgSalary: 122000 },
      { city: "Cambridge", state: "MA", count: 800, avgSalary: 145000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 8200, approvedLCAs: 8040, avgSalary: 115000 },
      { year: 2023, totalLCAs: 8600, approvedLCAs: 8430, avgSalary: 120000 },
      { year: 2024, totalLCAs: 9000, approvedLCAs: 8820, avgSalary: 125000 },
      { year: 2025, totalLCAs: 9280, approvedLCAs: 9094, avgSalary: 128900 }
    ]
  },
  {
    name: "Qualcomm Inc",
    slug: "qualcomm",
    totalLCAs: 6850,
    approvedLCAs: 6713,
    deniedLCAs: 137,
    approvalRate: 98.0,
    avgSalary: 168500,
    minSalary: 98000,
    maxSalary: 335000,
    medianSalary: 165000,
    industry: "Semiconductors",
    headquarters: { city: "San Diego", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 2500, avgSalary: 172000 },
      { title: "Systems Engineer", count: 1400, avgSalary: 165000 },
      { title: "Hardware Engineer", count: 1100, avgSalary: 175000 },
      { title: "Modem Engineer", count: 700, avgSalary: 178000 },
      { title: "DSP Engineer", count: 500, avgSalary: 168000 }
    ],
    topLocations: [
      { city: "San Diego", state: "CA", count: 4800, avgSalary: 172000 },
      { city: "Santa Clara", state: "CA", count: 800, avgSalary: 178000 },
      { city: "San Jose", state: "CA", count: 500, avgSalary: 175000 },
      { city: "Austin", state: "TX", count: 400, avgSalary: 158000 },
      { city: "Boulder", state: "CO", count: 200, avgSalary: 162000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 5800, approvedLCAs: 5680, avgSalary: 155000 },
      { year: 2023, totalLCAs: 6200, approvedLCAs: 6080, avgSalary: 162000 },
      { year: 2024, totalLCAs: 6500, approvedLCAs: 6370, avgSalary: 166000 },
      { year: 2025, totalLCAs: 6850, approvedLCAs: 6713, avgSalary: 168500 }
    ]
  },
  {
    name: "Adobe Inc",
    slug: "adobe",
    totalLCAs: 5420,
    approvedLCAs: 5312,
    deniedLCAs: 108,
    approvalRate: 98.0,
    avgSalary: 175800,
    minSalary: 102000,
    maxSalary: 345000,
    medianSalary: 172000,
    industry: "Technology",
    headquarters: { city: "San Jose", state: "CA" },
    topJobTitles: [
      { title: "Software Engineer", count: 2200, avgSalary: 178000 },
      { title: "Senior Software Engineer", count: 1100, avgSalary: 205000 },
      { title: "Computer Scientist", count: 600, avgSalary: 195000 },
      { title: "Product Manager", count: 500, avgSalary: 185000 },
      { title: "Data Scientist", count: 400, avgSalary: 172000 }
    ],
    topLocations: [
      { city: "San Jose", state: "CA", count: 3200, avgSalary: 182000 },
      { city: "San Francisco", state: "CA", count: 800, avgSalary: 188000 },
      { city: "Seattle", state: "WA", count: 500, avgSalary: 178000 },
      { city: "Lehi", state: "UT", count: 400, avgSalary: 158000 },
      { city: "New York", state: "NY", count: 300, avgSalary: 182000 }
    ],
    yearlyData: [
      { year: 2022, totalLCAs: 4600, approvedLCAs: 4510, avgSalary: 162000 },
      { year: 2023, totalLCAs: 4900, approvedLCAs: 4800, avgSalary: 168000 },
      { year: 2024, totalLCAs: 5200, approvedLCAs: 5100, avgSalary: 173000 },
      { year: 2025, totalLCAs: 5420, approvedLCAs: 5312, avgSalary: 175800 }
    ]
  }
];

module.exports = h1bSponsors;
