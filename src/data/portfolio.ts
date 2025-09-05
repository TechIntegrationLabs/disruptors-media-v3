// Real portfolio data from Disruptors Media database
export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  serviceType: string;
  projectSize: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  timeline: string;
  image: string;
  featured: boolean;
  credits: {
    role: string;
    names: string[];
  }[];
  categories: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'bruce-leeroy',
    title: 'Building a Fighter\'s Digital Empire',
    client: 'Bruce Leeroy',
    industry: 'Sports/Entertainment',
    serviceType: 'Social Media Marketing',
    projectSize: 'SMB',
    description: 'Bruce Leeroy is an up and coming MMA fighter out of Los Angeles, California. With the help of Disruptors Media, he saw millions of views on both TikTok and Instagram. Now with over 30,000 followers combined on multiple platforms, he aims to make his professional debut later this year.',
    challenge: 'Breaking through the saturated MMA social media landscape to build a genuine fanbase before professional debut',
    solution: 'Created viral content strategy focusing on training footage, personality-driven content, and strategic collaborations',
    results: [
      { metric: 'Social Media Views', value: '2M+' },
      { metric: 'Combined Followers', value: '30K+' },
      { metric: 'Engagement Rate', value: '+450%' }
    ],
    timeline: '6 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/portfolio/bruce-leeroy',
    featured: true,
    credits: [
      { role: 'Creative Direction', names: ['Tyler Gordon'] },
      { role: 'Media Production', names: ['Tyler Gordon'] },
      { role: 'Marketing', names: ['Tyler Gordon'] }
    ],
    categories: ['Branding', 'Photography', 'Marketing', 'Videography']
  },
  {
    id: '2',
    slug: 'community-cures',
    title: 'Amplifying Community Voices Through Podcasting',
    client: 'Community Curescast',
    industry: 'Media/Nonprofit',
    serviceType: 'Full Brand Development',
    projectSize: 'SMB',
    description: 'In the heart of Salt Lake City, Utah, lies Community Curescast, a podcast with a powerful mission: to weave riveting stories that bridge divides and foster connection within communities. But their vision needed a voice, a visual identity, and a strategic path to reach the hearts and minds they aimed to touch.',
    challenge: 'Creating a compelling brand identity and marketing strategy for a community-focused podcast in a crowded media landscape',
    solution: 'Developed comprehensive branding, engaging marketing campaigns, and professional video production to amplify their message',
    results: [
      { metric: 'Brand Recognition', value: '+320%' },
      { metric: 'Podcast Downloads', value: '25K+' },
      { metric: 'Community Engagement', value: '+180%' }
    ],
    timeline: '4 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/portfolio/community-cures',
    featured: true,
    credits: [
      { role: 'Creative Direction', names: ['Bailey Latimer', 'Tyler Gordon'] },
      { role: 'Marketing', names: ['Tyler Gordon', 'Carson Ireland'] },
      { role: 'Website', names: ['Bailey Latimer', 'Mustafa Qureshi'] }
    ],
    categories: ['Branding', 'UX/UI', 'Marketing', 'Web Development', 'Videography']
  },
  {
    id: '3',
    slug: 'master-lus-health-center',
    title: 'Ancient Wisdom Meets Modern Marketing',
    client: 'Master Lu\'s Health Center',
    industry: 'Healthcare/Wellness',
    serviceType: 'Digital Marketing',
    projectSize: 'SMB',
    description: 'Master Lu\'s Health Center sought out Disruptors Media to increase clients for their martial arts studio and acupuncture practice. From our campaign, we have been able to generate thousands of engagements and a significant increase in clients.',
    challenge: 'Attracting new clients to traditional martial arts and acupuncture services in a digital age',
    solution: 'Created targeted digital marketing campaigns showcasing the benefits of traditional wellness practices through modern storytelling',
    results: [
      { metric: 'New Client Acquisition', value: '+85%' },
      { metric: 'Social Engagement', value: '5K+' },
      { metric: 'ROI on Ad Spend', value: '4.2x' }
    ],
    timeline: '3 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/portfolio/master-lus',
    featured: false,
    credits: [
      { role: 'Marketing', names: ['Tyler Gordon'] },
      { role: 'Creative Direction', names: ['Carson Ireland'] },
      { role: 'Videography', names: ['Chad Coleman'] },
      { role: 'Photography', names: ['Matheus Barbosa-Costa'] }
    ],
    categories: ['Photography', 'Videography', 'Branding', 'Marketing', 'Podcast']
  },
  {
    id: '4',
    slug: 'e-district',
    title: 'Revitalizing Commercial Space Through Digital Innovation',
    client: 'E-District',
    industry: 'Real Estate/Commercial',
    serviceType: 'Brand Revitalization',
    projectSize: 'Enterprise',
    description: 'E-District is a commercial building located just north of Salt Lake City International Airport. Disruptors Media was tasked with helping them grow more clients for their podcast studio and LED billboard. Through this collaboration, we have revitalized their branding and helped increase clientele.',
    challenge: 'Attracting tenants and clients to a commercial space with unique offerings like podcast studios and LED advertising',
    solution: 'Complete brand revitalization with modern web presence and targeted marketing for their unique amenities',
    results: [
      { metric: 'Studio Bookings', value: '+120%' },
      { metric: 'Billboard Revenue', value: '+95%' },
      { metric: 'Occupancy Rate', value: '+40%' }
    ],
    timeline: '6 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/portfolio/e-district',
    featured: false,
    credits: [
      { role: 'Creative Direction', names: ['Carson Ireland'] },
      { role: 'Marketing', names: ['Tyler Gordon', 'Carson Ireland'] },
      { role: 'Web Development', names: ['Tyler Gordon', 'Bailey Latimer'] }
    ],
    categories: ['Branding', 'Photography', 'Marketing', 'Videography']
  },
  {
    id: '5',
    slug: 'desjardins-brands',
    title: 'Luxury Food Distribution Goes Digital',
    client: 'Desjardins Brands',
    industry: 'Food & Beverage',
    serviceType: 'Digital Marketing Strategy',
    projectSize: 'Enterprise',
    description: 'Desjardins Brands, a LA-based luxury food and beverage distributor, sought our expertise to elevate their brand and amplify their reach. Our strategic guidance and viral digital campaigns fueled their success, propelling them to generate over $100,000 in revenue per year.',
    challenge: 'Breaking into the competitive luxury food distribution market with limited brand recognition',
    solution: 'Developed strategic viral marketing campaigns targeting high-end restaurants and retailers',
    results: [
      { metric: 'Annual Revenue', value: '$100K+' },
      { metric: 'B2B Leads', value: '+220%' },
      { metric: 'Brand Awareness', value: '+380%' }
    ],
    timeline: '8 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/portfolio/desjardins-brands',
    featured: true,
    credits: [
      { role: 'Creative Direction', names: ['Tyler Gordon'] },
      { role: 'Marketing', names: ['Tyler Gordon'] },
      { role: 'UX/UI', names: ['Bailey Latimer'] }
    ],
    categories: ['Branding', 'Social Media', 'Marketing', 'Creative', 'Design']
  },
  {
    id: '6',
    slug: 'bf4real-podcast',
    title: 'High-Profile Podcasting Platform',
    client: 'BF4Real Podcast',
    industry: 'Media/Entertainment',
    serviceType: 'Podcast Production',
    projectSize: 'SMB',
    description: 'The BF4Real Podcast transcends borders by featuring high-profile guests with millions of followers. From acclaimed artists and cultural leaders to captivating storytellers and everyday heroes, the podcast offers a unique space for diverse perspectives to come together.',
    challenge: 'Creating a professional podcast platform capable of attracting A-list guests and building a loyal audience',
    solution: 'Leveraged our studio facilities and production expertise to create broadcast-quality content with strategic guest booking',
    results: [
      { metric: 'Guest Reach', value: '10M+' },
      { metric: 'Episode Downloads', value: '50K+' },
      { metric: 'Subscriber Growth', value: '+400%' }
    ],
    timeline: '12 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/portfolio/bf4real-podcast',
    featured: true,
    credits: [
      { role: 'Media Production', names: ['Carson Ireland', 'Tyler Gordon'] },
      { role: 'Creative Direction', names: ['Tyler Gordon', 'Carson Ireland'] }
    ],
    categories: ['Photography', 'Videography', 'Branding', 'Marketing', 'Podcast']
  },
  {
    id: '7',
    slug: 'psyched-out',
    title: 'Fashion Brand Digital Transformation',
    client: 'Psyched Out Clothing',
    industry: 'Fashion/E-commerce',
    serviceType: 'Web Development & Branding',
    projectSize: 'Startup',
    description: 'Psyched Out Clothing is an up and coming clothing brand based out of Florida. They specialize in custom pieces tailored to everyday fashion. Disruptors Media was tasked with creating a beautiful website and developing the branding for the company.',
    challenge: 'Launching a new fashion brand in the highly competitive streetwear market',
    solution: 'Created distinctive brand identity with e-commerce platform optimized for conversion and brand storytelling',
    results: [
      { metric: 'Launch Month Sales', value: '$15K' },
      { metric: 'Site Conversion Rate', value: '3.8%' },
      { metric: 'Social Following', value: '8K+' }
    ],
    timeline: '3 months',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/portfolio/psyched-out',
    featured: false,
    credits: [
      { role: 'Creative Direction', names: ['Tyler Gordon'] },
      { role: 'UX/UI', names: ['Tyler Gordon'] },
      { role: 'Web Development', names: ['Bailey Latimer'] },
      { role: 'Marketing', names: ['Tyler Gordon'] }
    ],
    categories: ['Branding', 'UI/UX', 'Marketing', 'Web Development', 'Photography']
  }
];