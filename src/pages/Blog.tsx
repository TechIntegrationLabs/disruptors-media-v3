import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  TagIcon,
  CalendarDaysIcon,
  UserIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { blogPosts as staticBlogPosts } from '../data/blog';
import { fetchBlogPostsFromSheet } from '../services/googleSheetsService';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from Google Sheets on component mount
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const dynamicPosts = await fetchBlogPostsFromSheet();
        
        if (dynamicPosts && dynamicPosts.length > 0) {
          setBlogPosts(dynamicPosts);
          console.log('Successfully loaded blog posts from Google Sheets:', dynamicPosts.length);
        } else {
          console.log('No posts from Google Sheets, using static data');
          setBlogPosts(staticBlogPosts);
        }
      } catch (err) {
        console.error('Error loading blog posts from Google Sheets:', err);
        setError('Failed to load latest blog posts. Showing cached content.');
        setBlogPosts(staticBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, blogPosts]);

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured === true);
  const regularPosts = filteredPosts.filter(post => post.featured !== true);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-sophisticated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Insights, case studies, and industry expertise from our team of digital marketing professionals.
              </p>
              <div className="flex items-center justify-center text-gray-300">
                <TagIcon className="h-6 w-6 mr-2" />
                <span>Over {blogPosts.length} articles on marketing, strategy, and growth</span>
              </div>
              
              {/* Status indicator */}
              {loading && (
                <div className="mt-4 flex items-center justify-center text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold mr-2"></div>
                  <span className="text-sm">Loading latest articles...</span>
                </div>
              )}
              
              {error && (
                <div className="mt-4 flex items-center justify-center text-yellow-400">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-lg mb-4 lg:mb-0">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-light border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
              {selectedCategory !== 'all' && (
                <span className="ml-2 px-2 py-1 bg-gold text-dark text-xs rounded-full">Active</span>
              )}
            </button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex flex-wrap gap-4 items-center">
                <label className="text-sm font-medium text-gray-300">
                  Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-dark-light border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <div className="ml-auto flex items-center gap-4">
                  <span className="text-gray-300">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-gold hover:text-gold-light text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="section-padding bg-dark-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Featured Articles
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-64 bg-gradient-to-br from-gold/20 to-transparent rounded-t-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gold text-dark text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-dark-light text-gold text-sm font-medium rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {post.readTime} min read
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <CalendarDaysIcon className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-dark text-gray-300 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="btn-primary w-full inline-flex items-center justify-center"
                    >
                      Read Article
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {featuredPosts.length > 0 ? 'All Articles' : 'Latest Articles'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-gold/10 to-transparent rounded-t-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-dark-light text-gold text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {post.readTime}m
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-400 text-xs">
                      <UserIcon className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <CalendarDaysIcon className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-dark text-gray-400 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="btn-secondary w-full inline-flex items-center justify-center text-sm"
                  >
                    Read More
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-300 mb-6">
                Try adjusting your search terms or clearing filters.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-sophisticated">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get our newest articles, case studies, and marketing tips delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            />
            <button className="btn-primary">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;