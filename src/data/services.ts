// Detailed service data from old site database
export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  category?: string;
  features?: string[];
}

// 8 detailed services from old Disruptors Media site
export const detailedServices: ServiceDetail[] = [
  {
    id: '1',
    name: 'Digital',
    slug: 'digital-marketing',
    description: 'We orchestrate your entire digital presence, from website management to paid advertising and more.',
    category: 'core',
    features: [
      'Comprehensive digital strategy',
      'Multi-channel campaign management',
      'Performance tracking and optimization',
      'Brand consistency across platforms'
    ]
  },
  {
    id: '2',
    name: 'SEO',
    slug: 'search-engine-optimization',
    description: 'We unlock the power of search engines, driving organic traffic and boosting your visibility online.',
    category: 'core',
    features: [
      'Technical SEO audits',
      'Keyword research and strategy',
      'Content optimization',
      'Local search optimization'
    ]
  },
  {
    id: '3',
    name: 'Podcast',
    slug: 'podcast-production',
    description: 'We provide the platform for you to capture your audio and visuals in stunning detail.',
    category: 'content',
    features: [
      'Professional studio recording',
      'Full production and editing',
      'Distribution strategy',
      'Guest booking and coordination'
    ]
  },
  {
    id: '4',
    name: 'Strategy',
    slug: 'marketing-strategy',
    description: 'We craft personalized, AI-driven strategies that bridge the gap between your goals and tangible results.',
    category: 'core',
    features: [
      'AI-powered market analysis',
      'Customer journey mapping',
      'Competitive analysis',
      'ROI-focused planning'
    ]
  },
  {
    id: '5',
    name: 'Creative',
    slug: 'creative-services',
    description: 'We captivate audiences with compelling content and design, fueled by the power of AI-assisted creativity.',
    category: 'content',
    features: [
      'Brand identity design',
      'Video and photo production',
      'AI-enhanced content creation',
      'Visual storytelling'
    ]
  },
  {
    id: '6',
    name: 'Web Development',
    slug: 'web-development',
    description: 'We build stunning, high-performing websites that serve as the foundation for your online success.',
    category: 'technical',
    features: [
      'Custom website development',
      'Mobile-first responsive design',
      'Performance optimization',
      'CMS integration'
    ]
  },
  {
    id: '7',
    name: 'Social Management',
    slug: 'social-media-management',
    description: 'We engage your audience and build vibrant communities across all major social media platforms.',
    category: 'engagement',
    features: [
      'Multi-platform content strategy',
      'Community management',
      'Influencer partnerships',
      'Social commerce integration'
    ]
  },
  {
    id: '8',
    name: 'E-commerce',
    slug: 'ecommerce-solutions',
    description: 'We design and implement seamless online shopping experiences that convert visitors into loyal customers.',
    category: 'technical',
    features: [
      'E-commerce platform development',
      'Payment gateway integration',
      'Inventory management systems',
      'Conversion rate optimization'
    ]
  }
];

// Service categories for organization
export const serviceCategories = [
  {
    key: 'core',
    label: 'Core Services',
    description: 'Foundation services for digital marketing success'
  },
  {
    key: 'content',
    label: 'Content & Creative',
    description: 'Engaging content that captivates your audience'
  },
  {
    key: 'technical',
    label: 'Technical Solutions',
    description: 'Robust technical infrastructure and development'
  },
  {
    key: 'engagement',
    label: 'Engagement & Growth',
    description: 'Building communities and driving engagement'
  }
];