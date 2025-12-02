import React, { useState } from "react";
import {
  FaBookOpen,
  FaLightbulb,
  FaChartLine,
  FaUsers,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaTag,
  FaTimes,
  FaCheckCircle
} from "react-icons/fa";

const CareerAdvice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  const categories = [
    "All", "Interview Tips", "Resume Writing", "Career Growth", "Salary Negotiation", 
    "Remote Work", "Leadership", "Networking", "Job Search", "Skills Development"
  ];

  const articles = [
    {
      id: 1,
      title: "10 Most Common Interview Questions and How to Answer Them",
      excerpt: "Master these frequently asked questions to ace your next job interview and land your dream position.",
      category: "Interview Tips",
      readTime: "8 min read",
      author: "Sarah Johnson",
      publishedDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      trending: true
    },
    {
      id: 2,
      title: "The Complete Guide to Remote Work Success",
      excerpt: "Learn essential strategies for productivity, communication, and work-life balance in remote positions.",
      category: "Remote Work",
      readTime: "12 min read",
      author: "Mike Chen",
      publishedDate: "2024-01-12",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
      trending: true
    },
    {
      id: 3,
      title: "How to Negotiate Your Salary Like a Pro",
      excerpt: "Proven tactics and scripts to help you negotiate better compensation and benefits packages.",
      category: "Salary Negotiation",
      readTime: "10 min read",
      author: "Jessica Martinez",
      publishedDate: "2024-01-10",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      trending: false
    },
    {
      id: 4,
      title: "Building Your Personal Brand on LinkedIn",
      excerpt: "Step-by-step guide to creating a compelling LinkedIn profile that attracts recruiters.",
      category: "Networking",
      readTime: "7 min read",
      author: "David Park",
      publishedDate: "2024-01-08",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
      trending: true
    },
    {
      id: 5,
      title: "Resume Red Flags That Kill Your Chances",
      excerpt: "Common mistakes that instantly turn off hiring managers and how to avoid them.",
      category: "Resume Writing",
      readTime: "6 min read",
      author: "Emily Davis",
      publishedDate: "2024-01-05",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400",
      trending: false
    },
    {
      id: 6,
      title: "The Art of Following Up After an Interview",
      excerpt: "Master the delicate balance of staying top-of-mind without being annoying.",
      category: "Interview Tips",
      readTime: "5 min read",
      author: "Alex Thompson",
      publishedDate: "2024-01-03",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
      trending: false
    },
    {
      id: 7,
      title: "Career Pivot: How to Change Industries Successfully",
      excerpt: "Strategic approach to transitioning your career into a completely new field.",
      category: "Career Growth",
      readTime: "15 min read",
      author: "Rachel Green",
      publishedDate: "2024-01-01",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
      trending: false
    },
    {
      id: 8,
      title: "Essential Skills Every Professional Needs in 2024",
      excerpt: "Future-proof your career with these in-demand skills and competencies.",
      category: "Skills Development",
      readTime: "11 min read",
      author: "Tom Wilson",
      publishedDate: "2023-12-28",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      trending: true
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }

    // Show success state
    setIsSubscribed(true);
    setEmail("");
  };

  const readArticle = (article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  // Generate article content based on the article data
  const getArticleContent = (article) => {
    const contentByCategory = {
      "Interview Tips": `
        <h2>Preparing for Your Interview</h2>
        <p>Success in interviews comes down to preparation, confidence, and authenticity. Here's how to master each aspect.</p>

        <h3>Before the Interview</h3>
        <ul>
          <li>Research the company thoroughly - know their mission, products, and recent news</li>
          <li>Review the job description and prepare examples that match required skills</li>
          <li>Prepare thoughtful questions to ask the interviewer</li>
          <li>Practice your responses out loud, but don't memorize scripts</li>
        </ul>

        <h3>During the Interview</h3>
        <ul>
          <li>Arrive 10-15 minutes early (or log in early for virtual interviews)</li>
          <li>Use the STAR method: Situation, Task, Action, Result</li>
          <li>Be specific with examples from your experience</li>
          <li>Show enthusiasm for the role and company</li>
        </ul>

        <h3>After the Interview</h3>
        <ul>
          <li>Send a thank-you email within 24 hours</li>
          <li>Reference specific topics discussed in your follow-up</li>
          <li>Follow up professionally if you haven't heard back within the expected timeframe</li>
        </ul>
      `,
      "Remote Work": `
        <h2>Thriving in Remote Work</h2>
        <p>Remote work offers incredible flexibility, but success requires intentional strategies for productivity and well-being.</p>

        <h3>Setting Up Your Workspace</h3>
        <ul>
          <li>Designate a specific area for work to create mental boundaries</li>
          <li>Invest in ergonomic equipment - your body will thank you</li>
          <li>Ensure reliable internet and have backup options</li>
          <li>Minimize distractions with noise-canceling headphones or quiet hours</li>
        </ul>

        <h3>Staying Productive</h3>
        <ul>
          <li>Maintain regular working hours to establish routine</li>
          <li>Use time-blocking to focus on deep work</li>
          <li>Take regular breaks - try the Pomodoro technique</li>
          <li>Set clear boundaries with household members</li>
        </ul>

        <h3>Staying Connected</h3>
        <ul>
          <li>Over-communicate with your team - don't assume people know what you're working on</li>
          <li>Schedule regular video calls for face-to-face interaction</li>
          <li>Participate actively in virtual team activities</li>
        </ul>
      `,
      "Salary Negotiation": `
        <h2>Mastering Salary Negotiation</h2>
        <p>Negotiating your salary is one of the most impactful financial decisions you can make. Here's how to do it confidently.</p>

        <h3>Research and Preparation</h3>
        <ul>
          <li>Know your market value using Glassdoor, LinkedIn, and industry reports</li>
          <li>Consider the total compensation package, not just base salary</li>
          <li>Document your achievements and quantify your impact</li>
          <li>Know your walkaway point before entering negotiations</li>
        </ul>

        <h3>During the Negotiation</h3>
        <ul>
          <li>Let the employer make the first offer when possible</li>
          <li>Express enthusiasm for the role before discussing compensation</li>
          <li>Use silence effectively - don't rush to fill gaps</li>
          <li>Frame requests in terms of value you bring</li>
        </ul>

        <h3>Beyond Base Salary</h3>
        <ul>
          <li>Consider negotiating signing bonus, equity, or additional PTO</li>
          <li>Ask about professional development budgets</li>
          <li>Discuss remote work flexibility</li>
          <li>Get the final offer in writing</li>
        </ul>
      `,
      "Resume Writing": `
        <h2>Crafting a Standout Resume</h2>
        <p>Your resume is your first impression. Make it count with these proven strategies.</p>

        <h3>Format and Structure</h3>
        <ul>
          <li>Keep it to 1-2 pages depending on experience level</li>
          <li>Use a clean, professional design with plenty of white space</li>
          <li>Choose readable fonts like Arial, Calibri, or Garamond</li>
          <li>Save as PDF to preserve formatting</li>
        </ul>

        <h3>Content That Converts</h3>
        <ul>
          <li>Start each bullet with strong action verbs</li>
          <li>Quantify achievements whenever possible (increased sales by 25%)</li>
          <li>Tailor your resume for each application</li>
          <li>Include relevant keywords from the job description</li>
        </ul>

        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li>Don't include personal information like age or marital status</li>
          <li>Avoid generic objectives - use a targeted summary instead</li>
          <li>Don't list every job ever held - focus on relevant experience</li>
          <li>Proofread multiple times for typos and errors</li>
        </ul>
      `,
      "Networking": `
        <h2>Building Professional Relationships</h2>
        <p>Networking isn't about collecting contacts - it's about building genuine relationships that benefit everyone.</p>

        <h3>Online Networking</h3>
        <ul>
          <li>Optimize your LinkedIn profile with a professional photo and compelling headline</li>
          <li>Engage thoughtfully with others' content before reaching out</li>
          <li>Personalize connection requests with specific context</li>
          <li>Share valuable insights and content regularly</li>
        </ul>

        <h3>In-Person Networking</h3>
        <ul>
          <li>Attend industry events and conferences</li>
          <li>Prepare a concise elevator pitch about yourself</li>
          <li>Focus on learning about others rather than promoting yourself</li>
          <li>Follow up within 48 hours with new connections</li>
        </ul>

        <h3>Maintaining Relationships</h3>
        <ul>
          <li>Schedule regular check-ins with key contacts</li>
          <li>Offer help and value before asking for favors</li>
          <li>Celebrate others' achievements publicly</li>
          <li>Be genuine - people can sense inauthenticity</li>
        </ul>
      `
    };

    return contentByCategory[article.category] || `
      <h2>${article.title}</h2>
      <p>${article.excerpt}</p>

      <h3>Key Takeaways</h3>
      <ul>
        <li>Stay focused on your goals and maintain a growth mindset</li>
        <li>Continuously invest in your skills and knowledge</li>
        <li>Build meaningful professional relationships</li>
        <li>Take calculated risks and embrace new opportunities</li>
      </ul>

      <h3>Next Steps</h3>
      <p>Apply these insights to your career journey. Remember, success is a marathon, not a sprint. Stay committed to your professional development and the results will follow.</p>
    `;
  };

  return (
    <main className="pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Career{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Advice
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Expert insights, tips, and strategies to accelerate your career growth
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search career advice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <p className="text-gray-600">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <FaBookOpen className="text-6xl text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or browse different categories
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  onClick={() => readArticle(article)}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {article.trending && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Trending
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <FaClock />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaTag className="text-blue-600 text-sm" />
                      <span className="text-sm font-medium text-blue-600">
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <p className="font-medium">{article.author}</p>
                        <p>{formatDate(article.publishedDate)}</p>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          readArticle(article);
                        }}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        <span>Read More</span>
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Ahead in Your Career
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get weekly career tips, industry insights, and job market updates delivered to your inbox
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white outline-none"
              required
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isSubscribed
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-blue-600 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isSubscribed ? (
                <span className="flex items-center space-x-2">
                  <FaCheckCircle />
                  <span>Subscribed!</span>
                </span>
              ) : 'Subscribe'}
            </button>
          </form>
          {isSubscribed && (
            <p className="mt-4 text-blue-100 text-sm">
              Thanks for subscribing! Check your inbox for career tips.
            </p>
          )}
        </div>
      </section>

      {/* Article Modal */}
      {showArticleModal && selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={closeArticleModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <FaTimes className="text-gray-700" />
              </button>
              {selectedArticle.trending && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Trending
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center text-gray-500 text-sm">
                  <FaClock className="mr-1" />
                  {selectedArticle.readTime}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6 pb-6 border-b">
                <span className="font-medium">{selectedArticle.author}</span>
                <span className="mx-2">|</span>
                <span>{formatDate(selectedArticle.publishedDate)}</span>
              </div>

              <div
                className="prose prose-lg max-w-none text-gray-700
                  prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:mt-6 prose-headings:mb-3
                  prose-h2:text-2xl prose-h3:text-xl
                  prose-p:mb-4 prose-p:leading-relaxed
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:mb-4
                  prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: getArticleContent(selectedArticle) }}
              />

              <div className="mt-8 pt-6 border-t flex justify-between items-center">
                <button
                  onClick={closeArticleModal}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Back to Articles
                </button>
                <button
                  onClick={closeArticleModal}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CareerAdvice;