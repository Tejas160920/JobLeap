// Comprehensive dummy job data for all companies and industries
export const dummyJobs = [
  // Google Jobs
  {
    _id: "google-1",
    title: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$180,000 - $250,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Join Google's core engineering team to build products used by billions of users worldwide. Work on large-scale distributed systems and cutting-edge technologies.",
    requirements: ["5+ years of software development experience", "Proficiency in Java, Python, or C++", "Experience with distributed systems", "Bachelor's degree in Computer Science"],
    benefits: ["Competitive salary and equity", "20% time for personal projects", "Free meals and snacks", "Comprehensive health benefits"]
  },
  {
    _id: "google-2", 
    title: "Product Manager - AI/ML",
    company: "Google",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$160,000 - $220,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Lead product strategy for Google's AI and machine learning initiatives. Work with world-class engineers and researchers to bring AI products to market.",
    requirements: ["3+ years of product management experience", "Experience with AI/ML products", "Strong analytical skills", "MBA preferred"],
    benefits: ["Stock options", "Flexible work arrangements", "Learning and development budget", "Wellness programs"]
  },

  // Microsoft Jobs
  {
    _id: "microsoft-1",
    title: "Cloud Solutions Architect",
    company: "Microsoft",
    location: "Redmond, WA",
    type: "Full-time", 
    experience: "Senior",
    salary: "$170,000 - $230,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Design and implement cloud solutions for enterprise customers using Microsoft Azure. Lead technical discussions and architect scalable cloud systems.",
    requirements: ["7+ years of cloud architecture experience", "Microsoft Azure certifications", "Experience with enterprise solutions", "Strong communication skills"],
    benefits: ["Excellent work-life balance", "Comprehensive benefits package", "Career development opportunities", "Flexible hybrid work"]
  },
  {
    _id: "microsoft-2",
    title: "UX Designer",
    company: "Microsoft",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$130,000 - $180,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Create intuitive and engaging user experiences for Microsoft's productivity tools. Collaborate with product managers and engineers to design world-class software.",
    requirements: ["4+ years of UX design experience", "Proficiency in Figma and Adobe Creative Suite", "Portfolio demonstrating design thinking", "Experience with user research"],
    benefits: ["Creative work environment", "Design tools and resources", "Mentorship programs", "Inclusive culture"]
  },

  // Apple Jobs
  {
    _id: "apple-1",
    title: "iOS Software Engineer",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$160,000 - $210,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Develop innovative iOS applications and features for Apple's ecosystem. Work on cutting-edge mobile technologies that delight millions of users.",
    requirements: ["3+ years of iOS development experience", "Proficiency in Swift and Objective-C", "Experience with iOS SDK", "Strong problem-solving skills"],
    benefits: ["Employee discounts on Apple products", "Premium health benefits", "On-site fitness facilities", "Stock purchase plan"]
  },
  {
    _id: "apple-2",
    title: "Hardware Engineer",
    company: "Apple",
    location: "Cupertino, CA", 
    type: "Full-time",
    experience: "Senior",
    salary: "$175,000 - $240,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Design and develop next-generation Apple hardware products. Work on revolutionary consumer electronics that shape the future of technology.",
    requirements: ["5+ years of hardware engineering experience", "Experience with circuit design and PCB layout", "Knowledge of manufacturing processes", "Electrical Engineering degree"],
    benefits: ["Cutting-edge technology projects", "Collaborative work environment", "Professional development opportunities", "Generous paid time off"]
  },

  // Amazon Jobs
  {
    _id: "amazon-1",
    title: "Software Development Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Entry-level",
    salary: "$120,000 - $160,000", 
    industry: "E-commerce",
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Build scalable systems and services for Amazon's e-commerce platform. Work on high-impact projects that serve millions of customers worldwide.",
    requirements: ["Bachelor's degree in Computer Science", "Proficiency in Java, Python, or C++", "Understanding of algorithms and data structures", "Strong problem-solving skills"],
    benefits: ["Career advancement opportunities", "Comprehensive benefits", "Employee discounts", "Flexible spending accounts"]
  },
  {
    _id: "amazon-2",
    title: "Operations Manager",
    company: "Amazon",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$95,000 - $130,000",
    industry: "E-commerce", 
    postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Lead operations teams in Amazon fulfillment centers. Drive operational excellence and customer satisfaction through process improvement and team leadership.",
    requirements: ["3+ years of operations management experience", "Bachelor's degree", "Leadership experience", "Data analysis skills"],
    benefits: ["Performance-based bonuses", "Health and dental insurance", "401(k) matching", "Parental leave benefits"]
  },

  // Meta Jobs  
  {
    _id: "meta-1",
    title: "Full Stack Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    type: "Full-time",
    experience: "Mid-level", 
    salary: "$155,000 - $200,000",
    industry: "Social Media",
    postedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Develop features for Meta's family of apps including Facebook, Instagram, and WhatsApp. Work on systems that connect billions of people worldwide.",
    requirements: ["4+ years of full-stack development experience", "Proficiency in React, Node.js, and PHP", "Experience with GraphQL", "Computer Science degree preferred"],
    benefits: ["Generous compensation package", "Free meals and transportation", "Wellness programs", "Learning stipend"]
  },
  {
    _id: "meta-2",
    title: "Data Scientist",
    company: "Meta", 
    location: "New York, NY",
    type: "Full-time",
    experience: "Senior",
    salary: "$170,000 - $230,000",
    industry: "Social Media",
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Analyze user behavior data to improve Meta's products and user experience. Work with large datasets to drive product decisions and business strategy.",
    requirements: ["5+ years of data science experience", "Proficiency in Python, R, and SQL", "Experience with machine learning", "PhD in quantitative field preferred"],
    benefits: ["Equity compensation", "Flexible work arrangements", "Professional development budget", "Mental health support"]
  },

  // Tesla Jobs
  {
    _id: "tesla-1",
    title: "Mechanical Engineer",
    company: "Tesla",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$110,000 - $150,000",
    industry: "Automotive",
    postedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Design and develop mechanical systems for Tesla vehicles. Work on sustainable transportation solutions that are reshaping the automotive industry.",
    requirements: ["3+ years of mechanical engineering experience", "Experience with CAD software", "Knowledge of automotive systems", "Mechanical Engineering degree"],
    benefits: ["Mission-driven work", "Stock options", "Health benefits", "Employee vehicle discount"]
  },
  {
    _id: "tesla-2",
    title: "Battery Engineer",
    company: "Tesla",
    location: "Palo Alto, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$140,000 - $190,000",
    industry: "Automotive",
    postedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Develop cutting-edge battery technology for Tesla's vehicles and energy products. Lead innovations in battery chemistry, thermal management, and safety systems.",
    requirements: ["5+ years of battery engineering experience", "Knowledge of electrochemistry", "Experience with battery testing and validation", "Advanced degree preferred"],
    benefits: ["Revolutionary technology projects", "Rapid career growth", "Comprehensive benefits", "Innovative work environment"]
  },

  // Netflix Jobs
  {
    _id: "netflix-1", 
    title: "Content Strategist",
    company: "Netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$130,000 - $170,000",
    industry: "Entertainment",
    postedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Shape Netflix's content strategy and programming decisions. Analyze viewer data and market trends to guide content acquisition and production.",
    requirements: ["4+ years of content strategy experience", "Data analysis skills", "Understanding of entertainment industry", "Bachelor's degree in relevant field"],
    benefits: ["Creative freedom", "Flexible work culture", "High compensation", "Unlimited vacation policy"]
  },
  {
    _id: "netflix-2",
    title: "DevOps Engineer", 
    company: "Netflix",
    location: "Los Angeles, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$165,000 - $220,000",
    industry: "Entertainment",
    postedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Build and maintain Netflix's cloud infrastructure that serves content to millions of users globally. Work on large-scale distributed systems and automation.",
    requirements: ["5+ years of DevOps experience", "Experience with AWS and Kubernetes", "Proficiency in scripting languages", "Experience with monitoring tools"],
    benefits: ["Netflix content perks", "Top-tier compensation", "Learning budget", "Inclusive work environment"]
  },

  // Salesforce Jobs
  {
    _id: "salesforce-1",
    title: "Solutions Engineer",
    company: "Salesforce",
    location: "San Francisco, CA", 
    type: "Full-time",
    experience: "Mid-level",
    salary: "$125,000 - $165,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Help customers implement Salesforce solutions and drive digital transformation. Work with sales teams to demonstrate technical capabilities and architect solutions.",
    requirements: ["3+ years of solutions engineering experience", "Salesforce certifications", "Strong presentation skills", "Technical consulting experience"],
    benefits: ["Strong company values", "Career development programs", "Volunteer time off", "Comprehensive benefits"]
  },
  {
    _id: "salesforce-2",
    title: "Account Executive",
    company: "Salesforce", 
    location: "Chicago, IL",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$90,000 - $140,000 + Commission",
    industry: "Technology",
    postedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Drive new business development and manage strategic customer relationships. Sell Salesforce's cloud solutions to enterprise clients.",
    requirements: ["3+ years of B2B sales experience", "Experience selling to enterprise customers", "Strong communication skills", "Bachelor's degree preferred"],
    benefits: ["Uncapped commission potential", "Sales training and development", "Recognition programs", "Flexible work options"]
  },

  // LinkedIn Jobs
  {
    _id: "linkedin-1",
    title: "Product Marketing Manager",
    company: "LinkedIn",
    location: "San Francisco, CA",
    type: "Full-time", 
    experience: "Mid-level",
    salary: "$140,000 - $180,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Drive go-to-market strategies for LinkedIn's professional tools and services. Work cross-functionally to launch products that help professionals succeed.",
    requirements: ["4+ years of product marketing experience", "Experience in B2B technology", "Strong analytical skills", "MBA preferred"],
    benefits: ["Professional networking opportunities", "Learning and development budget", "Comprehensive health benefits", "InDay monthly volunteer day"]
  },
  {
    _id: "linkedin-2",
    title: "Software Engineer - Backend",
    company: "LinkedIn",
    location: "Mountain View, CA",
    type: "Full-time",
    experience: "Senior", 
    salary: "$175,000 - $240,000",
    industry: "Technology",
    postedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Build scalable backend systems that power LinkedIn's platform for 900+ million members. Work on distributed systems, data processing, and API development.",
    requirements: ["5+ years of backend development experience", "Proficiency in Java or Scala", "Experience with distributed systems", "Computer Science degree"],
    benefits: ["Stock options", "Flexible work arrangements", "Career coaching", "Wellness programs"]
  },

  // Uber Jobs
  {
    _id: "uber-1",
    title: "Operations Analyst",
    company: "Uber", 
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Entry-level",
    salary: "$85,000 - $115,000",
    industry: "Transportation",
    postedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Analyze operational data to optimize Uber's marketplace efficiency. Work with cross-functional teams to improve driver and rider experiences.",
    requirements: ["Bachelor's degree in Analytics, Economics, or related field", "Proficiency in SQL and Excel", "Strong analytical thinking", "Experience with data visualization tools"],
    benefits: ["Fast-paced environment", "Global impact", "Learning opportunities", "Commuter benefits"]
  },
  {
    _id: "uber-2",
    title: "Senior Mobile Engineer",
    company: "Uber",
    location: "New York, NY", 
    type: "Full-time",
    experience: "Senior",
    salary: "$170,000 - $220,000",
    industry: "Transportation",
    postedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Develop and maintain Uber's mobile applications for riders and drivers. Build features that improve the transportation experience for millions of users.",
    requirements: ["5+ years of mobile development experience", "Proficiency in iOS or Android development", "Experience with cross-platform frameworks", "Strong system design skills"],
    benefits: ["Equity participation", "Flexible work options", "Professional development", "Global mobility opportunities"]
  },

  // Airbnb Jobs
  {
    _id: "airbnb-1",
    title: "Trust & Safety Specialist",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$95,000 - $125,000", 
    industry: "Travel",
    postedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Ensure the safety and security of Airbnb's community of hosts and guests. Investigate issues, develop safety policies, and improve trust systems.",
    requirements: ["3+ years of trust & safety experience", "Experience in investigations or risk management", "Strong judgment and decision-making", "Bachelor's degree preferred"],
    benefits: ["Annual travel credit", "Flexible work arrangements", "Belonging programs", "Comprehensive health benefits"]
  },
  {
    _id: "airbnb-2", 
    title: "Growth Marketing Manager",
    company: "Airbnb",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$120,000 - $155,000",
    industry: "Travel",
    postedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Drive user acquisition and engagement through data-driven marketing campaigns. Work on growth strategies to expand Airbnb's global community.",
    requirements: ["4+ years of growth marketing experience", "Experience with digital marketing channels", "Strong analytical skills", "A/B testing experience"],
    benefits: ["Travel perks", "Creative work culture", "Stock options", "Diversity and inclusion programs"]
  },

  // Spotify Jobs
  {
    _id: "spotify-1",
    title: "Audio Engineer",
    company: "Spotify",
    location: "New York, NY", 
    type: "Full-time",
    experience: "Mid-level",
    salary: "$110,000 - $145,000",
    industry: "Music",
    postedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Develop audio technologies and algorithms that power Spotify's music streaming platform. Work on audio processing, compression, and quality optimization.",
    requirements: ["4+ years of audio engineering experience", "Knowledge of digital signal processing", "Experience with audio codecs", "Computer Science or Engineering degree"],
    benefits: ["Music-focused culture", "Spotify Premium for family", "Flexible work arrangements", "Learning and development opportunities"]
  },
  {
    _id: "spotify-2",
    title: "Data Engineer", 
    company: "Spotify",
    location: "Stockholm, Sweden",
    type: "Full-time",
    experience: "Senior",
    salary: "$140,000 - $180,000",
    industry: "Music",
    postedAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Build data infrastructure and pipelines that power Spotify's recommendation systems and analytics. Work with petabytes of user listening data.",
    requirements: ["5+ years of data engineering experience", "Proficiency in Python, Scala, or Java", "Experience with big data technologies", "Strong system design skills"],
    benefits: ["International work environment", "Relocation assistance", "Music industry connections", "Wellness programs"]
  },

  // Stripe Jobs
  {
    _id: "stripe-1",
    title: "Payment Operations Specialist", 
    company: "Stripe",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Entry-level",
    salary: "$90,000 - $120,000",
    industry: "FinTech",
    postedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Monitor and optimize payment processing operations for Stripe's global payment platform. Ensure high availability and performance of payment systems.",
    requirements: ["2+ years of operations experience", "Understanding of payment systems", "Strong analytical skills", "Bachelor's degree in relevant field"],
    benefits: ["Technical excellence focus", "Learning opportunities", "Comprehensive benefits", "Equity participation"]
  },
  {
    _id: "stripe-2",
    title: "Software Engineer - Infrastructure",
    company: "Stripe",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Senior",
    salary: "$185,000 - $250,000",
    industry: "FinTech", 
    postedAt: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Build and maintain the infrastructure that powers Stripe's global payment processing. Work on distributed systems, reliability, and performance optimization.",
    requirements: ["6+ years of infrastructure engineering experience", "Experience with distributed systems", "Proficiency in Go, Ruby, or similar languages", "Strong system design skills"],
    benefits: ["Cutting-edge technology", "Smart colleagues", "Significant equity upside", "Remote-friendly culture"]
  },

  // Finance Industry Jobs
  {
    _id: "jpmorgan-1",
    title: "Investment Banking Analyst",
    company: "JPMorgan Chase",
    location: "New York, NY",
    type: "Full-time",
    experience: "Entry-level",
    salary: "$150,000 - $180,000",
    industry: "Finance", 
    postedAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Support senior bankers in executing M&A transactions, capital raising, and financial advisory services for corporate clients.",
    requirements: ["Bachelor's degree in Finance, Economics, or related field", "Strong analytical and Excel skills", "Excellent communication abilities", "Internship experience preferred"],
    benefits: ["Competitive compensation", "Comprehensive training program", "Career advancement opportunities", "Global exposure"]
  },
  {
    _id: "goldmansachs-1", 
    title: "Quantitative Researcher",
    company: "Goldman Sachs",
    location: "New York, NY", 
    type: "Full-time",
    experience: "Mid-level",
    salary: "$180,000 - $250,000",
    industry: "Finance",
    postedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Develop mathematical models and algorithms for trading strategies and risk management. Work with large datasets to identify market opportunities.",
    requirements: ["PhD in Mathematics, Physics, or related quantitative field", "Strong programming skills in Python or C++", "Knowledge of financial markets", "Research experience"],
    benefits: ["Top-tier compensation", "Intellectual challenges", "Research opportunities", "Performance bonuses"]
  },

  // Healthcare Industry Jobs  
  {
    _id: "kaiser-1",
    title: "Registered Nurse",
    company: "Kaiser Permanente",
    location: "Los Angeles, CA",
    type: "Full-time",
    experience: "Mid-level", 
    salary: "$85,000 - $110,000",
    industry: "Healthcare",
    postedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Provide direct patient care in a fast-paced hospital environment. Work as part of a multidisciplinary healthcare team to deliver quality patient outcomes.",
    requirements: ["Current RN license", "BSN degree preferred", "2+ years of clinical experience", "BLS and ACLS certification"],
    benefits: ["Comprehensive health benefits", "Retirement plan", "Continuing education support", "Flexible scheduling"]
  },
  {
    _id: "pfizer-1",
    title: "Clinical Research Associate",
    company: "Pfizer", 
    location: "New York, NY",
    type: "Full-time",
    experience: "Entry-level",
    salary: "$70,000 - $90,000",
    industry: "Healthcare",
    postedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Monitor clinical trials to ensure compliance with protocols and regulatory requirements. Support the development of life-saving medications.",
    requirements: ["Bachelor's degree in Life Sciences", "Understanding of GCP and FDA regulations", "Strong attention to detail", "Willingness to travel"],
    benefits: ["Mission-driven work", "Professional development", "Health and wellness programs", "Global opportunities"]
  },

  // Education Industry Jobs
  {
    _id: "stanford-1", 
    title: "Software Development Manager",
    company: "Stanford University",
    location: "Palo Alto, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$140,000 - $180,000",
    industry: "Education",
    postedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Lead a team of developers building educational technology platforms and systems that support Stanford's academic mission.",
    requirements: ["5+ years of software development management experience", "Experience with educational technology", "Strong leadership skills", "Computer Science degree"],
    benefits: ["University benefits package", "Tuition assistance", "Sabbatical opportunities", "Collaborative environment"]
  },
  {
    _id: "pearson-1",
    title: "Product Manager - EdTech",
    company: "Pearson Education", 
    location: "Boston, MA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$110,000 - $140,000",
    industry: "Education",
    postedAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Drive product strategy for digital learning platforms that serve millions of students and educators worldwide.",
    requirements: ["4+ years of product management experience", "Experience in education technology", "Understanding of learning analytics", "MBA preferred"],
    benefits: ["Impact on education", "Professional development", "Flexible work options", "Innovation opportunities"]
  },

  // Construction Industry Jobs
  {
    _id: "bechtel-1",
    title: "Project Manager", 
    company: "Bechtel Corporation",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Senior",
    salary: "$120,000 - $160,000",
    industry: "Construction",
    postedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Manage large-scale infrastructure construction projects from planning through completion. Coordinate with multiple stakeholders and ensure project success.",
    requirements: ["PMP certification", "8+ years of construction project management", "Engineering degree", "Experience with large infrastructure projects"],
    benefits: ["Project variety", "Global opportunities", "Competitive compensation", "Professional development"]
  },
  {
    _id: "turner-1",
    title: "Civil Engineer",
    company: "Turner Construction", 
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$80,000 - $110,000",
    industry: "Construction",
    postedAt: new Date(Date.now() - 34 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Design and oversee construction of commercial buildings and infrastructure. Work on exciting projects that shape city skylines.",
    requirements: ["Civil Engineering degree", "PE license preferred", "3+ years of construction experience", "AutoCAD proficiency"],
    benefits: ["Variety of projects", "Career advancement", "Comprehensive benefits", "Skills development"]
  },

  // Retail Industry Jobs
  {
    _id: "target-1",
    title: "Store Manager",
    company: "Target Corporation", 
    location: "Minneapolis, MN",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$65,000 - $85,000",
    industry: "Retail",
    postedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Lead store operations and team management for a high-volume Target location. Drive sales performance and create exceptional guest experiences.",
    requirements: ["3+ years of retail management experience", "Leadership and team building skills", "Bachelor's degree preferred", "Flexible schedule availability"],
    benefits: ["Employee discounts", "Health benefits", "Career advancement", "Training and development"]
  },
  {
    _id: "walmart-1",
    title: "Supply Chain Analyst",
    company: "Walmart",
    location: "Bentonville, AR", 
    type: "Full-time",
    experience: "Entry-level",
    salary: "$55,000 - $70,000",
    industry: "Retail",
    postedAt: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Analyze supply chain data to optimize inventory management and distribution efficiency across Walmart's global network.",
    requirements: ["Bachelor's degree in Supply Chain, Business, or related field", "Strong analytical skills", "Proficiency in Excel and SQL", "Understanding of logistics"],
    benefits: ["Fortune #1 company", "Stock purchase plan", "Health benefits", "Career growth opportunities"]
  },

  // Food Service Industry Jobs
  {
    _id: "mcdonalds-1",
    title: "Restaurant General Manager",
    company: "McDonald's Corporation", 
    location: "Chicago, IL",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$50,000 - $65,000",
    industry: "Food Service",
    postedAt: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Oversee daily operations of a McDonald's restaurant. Lead crew members, ensure food quality, and drive customer satisfaction.",
    requirements: ["2+ years of restaurant management experience", "Food safety certification", "Strong leadership skills", "High school diploma required"],
    benefits: ["Franchise opportunities", "Tuition assistance", "Health benefits", "Advancement opportunities"]
  },
  {
    _id: "starbucks-1",
    title: "Store Manager",
    company: "Starbucks",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Mid-level", 
    salary: "$55,000 - $70,000",
    industry: "Food Service",
    postedAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Create the Starbucks Experience for customers by leading a team of baristas and ensuring operational excellence.",
    requirements: ["2+ years of retail or food service management", "Customer service focus", "Team leadership abilities", "Bachelor's degree preferred"],
    benefits: ["Stock options", "Free coffee and food", "Health benefits", "Flexible scheduling"]
  }
];

// Function to get jobs by company
export const getJobsByCompany = (companyName) => {
  return dummyJobs.filter(job => job.company.toLowerCase() === companyName.toLowerCase());
};

// Function to get jobs by industry
export const getJobsByIndustry = (industry) => {
  return dummyJobs.filter(job => job.industry.toLowerCase() === industry.toLowerCase());
};

// Function to get all jobs with optional filters
export const getJobs = (filters = {}) => {
  let filteredJobs = [...dummyJobs];
  
  if (filters.title) {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(filters.title.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.title.toLowerCase())
    );
  }
  
  if (filters.location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  if (filters.industry) {
    filteredJobs = filteredJobs.filter(job => 
      job.industry.toLowerCase() === filters.industry.toLowerCase()
    );
  }
  
  if (filters.company) {
    filteredJobs = filteredJobs.filter(job => 
      job.company.toLowerCase() === filters.company.toLowerCase()
    );
  }
  
  return filteredJobs;
};