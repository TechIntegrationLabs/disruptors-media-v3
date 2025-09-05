// Real blog content based on Disruptors Media expertise
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  author: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How We Generated 2M+ Views for an MMA Fighter Using AI-Driven Content Strategy',
    excerpt: 'Learn the exact strategies we used to help Bruce Leeroy go from unknown to viral, generating millions of views and 30K+ followers across social platforms.',
    category: 'Case Study',
    date: 'December 15, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/bruce-leeroy-case-study.jpg',
    slug: 'mma-fighter-viral-content-strategy',
    author: 'Tyler Gordon',
    readTime: 8,
    tags: ['Social Media', 'Content Strategy', 'Sports Marketing', 'Viral Marketing'],
    featured: true
  },
  {
    id: '2',
    title: 'From Startup to $100K Revenue: The Desjardins Brands Digital Transformation',
    excerpt: 'Discover how we helped a luxury food distributor break into the competitive B2B market and achieve six-figure annual revenue through strategic digital marketing.',
    category: 'Case Study',
    date: 'December 10, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/desjardins-transformation.jpg',
    slug: 'luxury-food-brand-digital-transformation',
    author: 'Moe',
    readTime: 12,
    tags: ['B2B Marketing', 'Brand Development', 'Revenue Growth', 'Digital Strategy'],
    featured: true
  },
  {
    id: '3',
    title: 'The Complete Guide to Professional Podcast Production in 2024',
    excerpt: 'Everything you need to know about creating broadcast-quality podcasts, from our studio setup to post-production secrets that attract A-list guests.',
    category: 'Production Tips',
    date: 'December 5, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/podcast-production-guide.jpg',
    slug: 'professional-podcast-production-guide-2024',
    author: 'Carson Ireland',
    readTime: 15,
    tags: ['Podcast Production', 'Audio Engineering', 'Studio Setup', 'Content Creation'],
    featured: false
  },
  {
    id: '4',
    title: 'Why Traditional Wellness Businesses Need Modern Marketing: Master Lu\'s Success Story',
    excerpt: 'See how we bridged ancient healing practices with digital marketing to increase client acquisition by 85% for a martial arts and acupuncture center.',
    category: 'Industry Insights',
    date: 'November 28, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/wellness-marketing.jpg',
    slug: 'traditional-wellness-modern-marketing',
    author: 'Tyler Gordon',
    readTime: 10,
    tags: ['Healthcare Marketing', 'Traditional Business', 'Digital Transformation', 'Local Marketing'],
    featured: false
  },
  {
    id: '5',
    title: 'Building Community Through Podcasting: The Community Curescast Approach',
    excerpt: 'Learn how we helped a mission-driven podcast develop a compelling brand identity and reach 25K+ downloads while staying true to their community values.',
    category: 'Brand Strategy',
    date: 'November 20, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/community-podcast-strategy.jpg',
    slug: 'building-community-through-podcasting',
    author: 'Bailey Latimer',
    readTime: 7,
    tags: ['Podcast Marketing', 'Brand Identity', 'Community Building', 'Mission-Driven Marketing'],
    featured: false
  },
  {
    id: '6',
    title: 'Real Estate Marketing Revolution: How E-District Increased Revenue by 120%',
    excerpt: 'Discover the innovative marketing strategies that transformed a commercial property into a thriving business destination with podcast studios and digital billboards.',
    category: 'Case Study',
    date: 'November 15, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/e-district-success.jpg',
    slug: 'commercial-real-estate-marketing-transformation',
    author: 'Carson Ireland',
    readTime: 9,
    tags: ['Real Estate Marketing', 'Commercial Properties', 'Revenue Growth', 'Innovative Marketing'],
    featured: false
  },
  {
    id: '7',
    title: 'Fashion E-commerce Launch Strategy: Psyched Out Clothing\'s $15K First Month',
    excerpt: 'Step-by-step breakdown of how we launched a Florida-based clothing brand and achieved $15K in first-month sales through strategic branding and web development.',
    category: 'E-commerce',
    date: 'November 8, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/fashion-ecommerce-launch.jpg',
    slug: 'fashion-brand-ecommerce-launch-strategy',
    author: 'Bailey Latimer',
    readTime: 11,
    tags: ['E-commerce', 'Fashion Marketing', 'Brand Launch', 'Conversion Optimization'],
    featured: true
  },
  {
    id: '8',
    title: 'The Power of High-Profile Guests: BF4Real Podcast\'s Growth Strategy',
    excerpt: 'Learn how we helped BF4Real Podcast attract A-list guests with millions of followers and build a loyal audience of 50K+ downloads per episode.',
    category: 'Podcast Strategy',
    date: 'October 25, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/high-profile-podcast-guests.jpg',
    slug: 'attract-high-profile-podcast-guests-strategy',
    author: 'Tyler Gordon',
    readTime: 13,
    tags: ['Podcast Growth', 'Guest Booking', 'Audience Building', 'Content Strategy'],
    featured: false
  },
  {
    id: '9',
    title: '12 Years of Digital Marketing Evolution: What We\'ve Learned Since 2012',
    excerpt: 'Reflect on the major shifts in digital marketing over the past decade and how staying ahead of trends has helped us generate $50M+ in client revenue.',
    category: 'Industry Insights',
    date: 'October 15, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/digital-marketing-evolution.jpg',
    slug: 'digital-marketing-evolution-12-years',
    author: 'Moe',
    readTime: 16,
    tags: ['Digital Marketing', 'Industry Evolution', 'Business Growth', 'Marketing Trends'],
    featured: false
  },
  {
    id: '10',
    title: 'Behind the Scenes: Our North Salt Lake Studio Setup and Why Location Matters',
    excerpt: 'Take a virtual tour of our professional studio facility and learn why we chose North Salt Lake as our base for serving clients across the country.',
    category: 'Studio Insights',
    date: 'October 1, 2024',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/v1/blog/studio-behind-scenes.jpg',
    slug: 'north-salt-lake-studio-setup-location',
    author: 'Carson Ireland',
    readTime: 6,
    tags: ['Studio Production', 'Behind the Scenes', 'Location Strategy', 'Equipment'],
    featured: false
  }
];