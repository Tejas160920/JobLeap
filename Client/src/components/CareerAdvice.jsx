import React, { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaTag,
  FaExternalLinkAlt,
  FaSpinner,
  FaHeart,
  FaComment,
  FaStar,
  FaFire
} from "react-icons/fa";

const CareerAdvice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("career");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { label: "Career", tag: "career" },
    { label: "Productivity", tag: "productivity" },
    { label: "Interview", tag: "interview" },
    { label: "Remote Work", tag: "remote" },
    { label: "Leadership", tag: "leadership" },
    { label: "Resume", tag: "resume" },
    { label: "Networking", tag: "networking" },
    { label: "Job Search", tag: "jobsearch" }
  ];

  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  const fetchArticles = async (tag) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dev.to/api/articles?tag=${tag}&per_page=12`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      // Filter to only show articles with cover images
      const articlesWithImages = data.filter(article => article.cover_image);
      setArticles(articlesWithImages);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get featured article (highest engagement)
  const featuredArticle = articles.length > 0
    ? articles.reduce((max, article) => {
        const maxScore = (max.public_reactions_count || 0) + (max.comments_count || 0) * 2;
        const articleScore = (article.public_reactions_count || 0) + (article.comments_count || 0) * 2;
        return articleScore > maxScore ? article : max;
      }, articles[0])
    : null;

  // Filter out featured article from the grid
  const regularArticles = articles.filter(article => article.id !== featuredArticle?.id);

  const filteredArticles = regularArticles.filter(article => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      article.title?.toLowerCase().includes(search) ||
      article.description?.toLowerCase().includes(search) ||
      article.user?.name?.toLowerCase().includes(search)
    );
  });

  // Check if featured article matches search
  const showFeatured = featuredArticle && (!searchTerm ||
    featuredArticle.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    featuredArticle.description?.toLowerCase().includes(searchTerm.toLowerCase()));

  const openArticle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Career <span className="text-[#0d6d6e]">Advice</span>
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
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
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
            {categories.map((category) => (
              <button
                key={category.tag}
                onClick={() => setSelectedCategory(category.tag)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.tag
                    ? "bg-[#0d6d6e] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {!isLoading && !error && showFeatured && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <FaFire className="text-orange-500 text-xl" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
            </div>

            <article
              onClick={() => openArticle(featuredArticle.url)}
              className="relative bg-gradient-to-r from-[#0d6d6e] to-[#095555] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                {featuredArticle.cover_image && (
                  <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
                    <img
                      src={featuredArticle.cover_image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0d6d6e]/90" />
                  </div>
                )}

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      <FaStar className="text-yellow-400" />
                      Editor's Pick
                    </span>
                    {featuredArticle.reading_time_minutes && (
                      <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        <FaClock />
                        {featuredArticle.reading_time_minutes} min read
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {featuredArticle.tag_list && featuredArticle.tag_list.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredArticle.tag_list.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium text-white/80 bg-white/10 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-yellow-200 transition-colors">
                    {featuredArticle.title}
                  </h3>

                  {/* Description */}
                  {featuredArticle.description && (
                    <p className="text-white/80 text-lg mb-6 line-clamp-3">
                      {featuredArticle.description}
                    </p>
                  )}

                  {/* Author & Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {featuredArticle.user?.profile_image_90 && (
                        <img
                          src={featuredArticle.user.profile_image_90}
                          alt={featuredArticle.user.name}
                          className="w-10 h-10 rounded-full border-2 border-white/30"
                        />
                      )}
                      <div>
                        <p className="text-white font-medium">{featuredArticle.user?.name}</p>
                        <p className="text-white/60 text-sm">{featuredArticle.readable_publish_date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-white/80">
                      {featuredArticle.public_reactions_count > 0 && (
                        <span className="flex items-center gap-1.5">
                          <FaHeart className="text-red-400" />
                          <span>{featuredArticle.public_reactions_count}</span>
                        </span>
                      )}
                      {featuredArticle.comments_count > 0 && (
                        <span className="flex items-center gap-1.5">
                          <FaComment />
                          <span>{featuredArticle.comments_count}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 bg-white text-[#0d6d6e] px-6 py-3 rounded-lg font-semibold group-hover:bg-yellow-400 group-hover:text-gray-900 transition-colors">
                      Read Full Article
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {categories.find(c => c.tag === selectedCategory)?.label || "Career"} Articles
            </h2>
            {!isLoading && !error && (
              <p className="text-gray-600">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSpinner className="animate-spin text-4xl text-[#0d6d6e] mb-4" />
              <p className="text-gray-600">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <FaBookOpen className="text-6xl text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unable to load articles</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => fetchArticles(selectedCategory)}
                className="bg-[#0d6d6e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <FaBookOpen className="text-6xl text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or browse different categories
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-[#0d6d6e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => openArticle(article.url)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Cover Image */}
                  {article.cover_image && (
                    <div className="relative">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {article.reading_time_minutes && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <FaClock />
                            <span>{article.reading_time_minutes} min read</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {/* Tags */}
                    {article.tag_list && article.tag_list.length > 0 && (
                      <div className="flex items-center flex-wrap gap-2 mb-3">
                        <FaTag className="text-[#0d6d6e] text-sm" />
                        {article.tag_list.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs font-medium text-[#0d6d6e] bg-[#e6f3f3] px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0d6d6e] transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Description */}
                    {article.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        {article.user?.profile_image_90 && (
                          <img
                            src={article.user.profile_image_90}
                            alt={article.user.name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div className="text-sm">
                          {article.user?.name && (
                            <p className="font-medium text-gray-900">{article.user.name}</p>
                          )}
                          {article.readable_publish_date && (
                            <p className="text-gray-500">{article.readable_publish_date}</p>
                          )}
                        </div>
                      </div>

                      {/* Engagement */}
                      <div className="flex items-center space-x-3 text-gray-500 text-sm">
                        {article.public_reactions_count > 0 && (
                          <span className="flex items-center space-x-1">
                            <FaHeart className="text-red-400" />
                            <span>{article.public_reactions_count}</span>
                          </span>
                        )}
                        {article.comments_count > 0 && (
                          <span className="flex items-center space-x-1">
                            <FaComment />
                            <span>{article.comments_count}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center justify-end">
                      <span className="flex items-center space-x-2 text-[#0d6d6e] hover:text-[#095555] font-medium transition-colors">
                        <span>Read Article</span>
                        <FaExternalLinkAlt className="text-sm" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="text-gray-500 text-sm">
            Articles powered by the Dev.to community. Click any article to read the full content.
          </p>
        </div>
      </section>
    </main>
  );
};

export default CareerAdvice;
