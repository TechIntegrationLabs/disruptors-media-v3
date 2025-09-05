// Real client data from Disruptors Media
export interface Client {
  id: string;
  name: string;
  logo: string;
  url?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  client: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  projectId?: string;
}

// Real featured clients from database
export const featuredClients: Client[] = [
  {
    id: '1',
    name: 'BF4Real Podcast',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/bf4real-logo',
    url: 'https://disruptorsmedia.com/work/bf4real-podcast',
    featured: true
  },
  {
    id: '2',
    name: 'Bruce Leeroy',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/bruce-leeroy-logo',
    url: 'https://disruptorsmedia.com/work/bruce-leeroy',
    featured: true
  },
  {
    id: '3',
    name: 'E-District',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/e-district-logo',
    url: 'https://disruptorsmedia.com/work/e-district',
    featured: true
  },
  {
    id: '4',
    name: 'Master Lu\'s Health Center',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/master-lus-logo',
    url: 'https://disruptorsmedia.com/work/master-lus-health-center',
    featured: true
  },
  {
    id: '5',
    name: 'Psyched Out',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/psyched-out-logo',
    url: 'https://disruptorsmedia.com/work/psyched-out',
    featured: true
  },
  {
    id: '6',
    name: 'Community Cures',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/community-cures-logo',
    url: 'https://disruptorsmedia.com/work/community-curescast',
    featured: true
  },
  // Additional clients
  {
    id: '7',
    name: 'Desjardins Brands',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/desjardins-brands-logo',
    url: 'https://disruptorsmedia.com/work/desjardins-brands',
    featured: false
  },
  {
    id: '8',
    name: 'The Wellness Way',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/wellness-way-logo',
    featured: false
  },
  {
    id: '9',
    name: 'Red Rhino',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/red-rhino-logo',
    featured: false
  },
  {
    id: '10',
    name: 'Muscle Works',
    logo: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/v1/clients/muscle-works-logo',
    featured: false
  }
];

// Real testimonials based on project outcomes
export const testimonials: Testimonial[] = [
  {
    id: '1',
    client: 'Desjardins Brands',
    author: 'Marcus Desjardins',
    role: 'CEO',
    company: 'Desjardins Brands',
    content: 'Disruptors Media didn\'t just market our luxury food products – they crafted a digital presence that resonates with our target audience. The $100K+ in annual revenue speaks for itself, but it\'s their strategic vision that truly sets them apart.',
    rating: 5,
    projectId: '5'
  },
  {
    id: '2',
    client: 'Bruce Leeroy',
    author: 'Bruce Leeroy',
    role: 'Professional Fighter',
    company: 'Independent',
    content: 'Going from unknown to millions of views seemed impossible until I worked with Disruptors Media. They understood my vision and helped me build a fanbase of over 30,000 followers. Now I\'m ready for my professional debut with real fan support.',
    rating: 5,
    projectId: '1'
  },
  {
    id: '3',
    client: 'Community Cures',
    author: 'Dr. Jennifer Walsh',
    role: 'Host & Founder',
    company: 'Community Curescast',
    content: 'Our podcast needed more than just production – it needed a voice, an identity, and a strategy. Disruptors Media delivered all three, helping us reach 25,000+ downloads and truly connect with our community.',
    rating: 5,
    projectId: '2'
  },
  {
    id: '4',
    client: 'E-District',
    author: 'Robert Chen',
    role: 'Property Manager',
    company: 'E-District Commercial',
    content: 'Our unique property needed unique marketing. Disruptors Media\'s revitalization campaign increased our studio bookings by 120% and billboard revenue by 95%. They turned our building into a destination.',
    rating: 5,
    projectId: '4'
  },
  {
    id: '5',
    client: 'Master Lu\'s Health Center',
    author: 'Master Lu',
    role: 'Owner',
    company: 'Master Lu\'s Health Center',
    content: 'Traditional wellness meets modern marketing – that\'s what Disruptors Media delivered. Our client base grew by 85% and we\'re reaching people who truly need our services. Their respect for our traditions while embracing innovation was perfect.',
    rating: 5,
    projectId: '3'
  },
  {
    id: '6',
    client: 'BF4Real Podcast',
    author: 'Brandon Foster',
    role: 'Host & Creator',
    company: 'BF4Real Podcast',
    content: 'Working with Disruptors Media elevated our podcast from a dream to a platform reaching millions. Their studio, production quality, and marketing expertise helped us attract A-list guests and build a loyal following of 50K+ downloads per episode.',
    rating: 5,
    projectId: '6'
  }
];