import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ClockIcon,
  UserIcon,
  CalendarDaysIcon,
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { blogPosts as staticBlogPosts } from '../data/blog';
import { fetchBlogPostsFromAirtable } from '../services/airtableService';
import { fetchGoogleDocsContent } from '../services/contentService';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);
  const [postContent, setPostContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  
  const post = blogPosts.find(p => p.slug === slug);

  // Load blog posts and specific post content
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Try to load posts from Google Sheets
        const dynamicPosts = await fetchBlogPostsFromAirtable();
        if (dynamicPosts && dynamicPosts.length > 0) {
          setBlogPosts(dynamicPosts);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Load post content from Google Docs if available
  useEffect(() => {
    const loadPostContent = async () => {
      if (!post || !post.content) return;

      try {
        setContentLoading(true);
        
        // If the content field contains a Google Docs URL, fetch the content
        if (post.content.includes('docs.google.com')) {
          const content = await fetchGoogleDocsContent(post.content);
          setPostContent(content.html);
        } else {
          // Use the content field as-is (for static content)
          setPostContent(post.content);
        }
      } catch (error) {
        console.error('Error loading post content:', error);
        setPostContent(post.content || 'Content not available.');
      } finally {
        setContentLoading(false);
      }
    };

    if (post) {
      loadPostContent();
    }
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-300 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-sophisticated">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back to Blog */}
            <Link 
              to="/blog" 
              className="inline-flex items-center text-gold hover:text-gold-light mb-6 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {/* Category and Reading Time */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-gold text-dark text-sm font-medium rounded-full">
                {post.category}
              </span>
              <div className="flex items-center text-gray-300 text-sm">
                <ClockIcon className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center text-gray-300">
                <UserIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                <span>{post.date}</span>
              </div>
              <button
                onClick={shareOnTwitter}
                className="flex items-center text-gray-300 hover:text-gold transition-colors"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                    <TagIcon className="h-3 w-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 md:h-[500px] rounded-xl overflow-hidden"
          >
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-dark-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            {/* Dynamic Content from Google Docs or Static Content */}
            {contentLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
                <p className="text-gray-300">Loading content...</p>
              </div>
            ) : postContent ? (
              <div 
                className="text-gray-300 space-y-6 leading-relaxed prose-content"
                dangerouslySetInnerHTML={{ __html: postContent }}
              />
            ) : (
              <div className="text-gray-300 space-y-6 leading-relaxed">
                <p className="text-xl text-white font-medium">
                  {post.excerpt}
                </p>
                
                {/* Show link to Google Docs if available */}
                {post.content && post.content.includes('docs.google.com') && (
                  <div className="bg-dark p-6 rounded-lg my-8 border border-gold/20">
                    <div className="flex items-center mb-4">
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gold mr-2" />
                      <h3 className="text-lg font-bold text-gold">Read Full Article</h3>
                    </div>
                    <p className="text-gray-300 mb-4">
                      This article is available as a detailed document. Click below to read the complete content.
                    </p>
                    <a 
                      href={post.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center"
                    >
                      Open Full Article
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                )}
                
                <p>
                  This comprehensive case study dives deep into the strategies, challenges, and remarkable results 
                  we achieved with our client. Through innovative approaches and data-driven decision making, 
                  we were able to transform their digital presence and drive significant business growth.
                </p>
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mt-12 pt-8 border-t border-white/20">
              <span className="text-gray-300 font-medium">Share this article:</span>
              <button
                onClick={shareOnTwitter}
                className="btn-secondary text-sm"
              >
                Twitter
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="btn-secondary text-sm"
              >
                LinkedIn
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gold/10 to-transparent rounded-t-lg overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-dark-light text-gold text-xs font-medium rounded">
                        {relatedPost.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {relatedPost.readTime}m
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>

                    <Link 
                      to={`/blog/${relatedPost.slug}`} 
                      className="btn-secondary w-full inline-flex items-center justify-center text-sm"
                    >
                      Read More
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-sophisticated">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help transform your business with proven strategies and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get Your Free Strategy Session
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              View More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;