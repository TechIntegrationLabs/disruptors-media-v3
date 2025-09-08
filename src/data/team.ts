// Real team data from Disruptors Media
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface CompanyInfo {
  founded: number;
  employees: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  social: {
    twitter: string;
    youtube: string;
    instagram: string;
    tiktok: string;
  };
}

// Real team members from database
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Moe',
    role: 'CEO & Founder',
    email: 'moe@disruptorsmedia.com',
    bio: 'Visionary leader with over 12 years of experience in digital marketing and business transformation. Moe founded Disruptors Media with the mission to help businesses harness the power of AI and cutting-edge marketing strategies.',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_400,h_400,c_fill/v1/team/moe-disruptors.jpg'
  },
  {
    id: '2',
    name: 'Tyler Gordon',
    role: 'Chief Creative Officer',
    email: 'tyler@disruptorsmedia.com',
    bio: 'Creative mastermind behind many of our viral campaigns. Tyler specializes in content strategy, brand development, and bringing innovative ideas to life through compelling storytelling.',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_400,h_400,c_fill/v1/team/tyler-gordon.jpg'
  },
  {
    id: '3',
    name: 'Josh',
    role: 'Head of Technology',
    email: 'josh@disruptorsmedia.com',
    bio: 'Technical expert driving our digital transformation initiatives. Josh leads our development team and ensures our clients stay ahead with the latest technology solutions.',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_400,h_400,c_fill/v1/team/josh-disruptors.jpg'
  },
  {
    id: '4',
    name: 'Bailey Latimer',
    role: 'Lead Developer & UX Designer',
    email: 'bailey@disruptorsmedia.com',
    bio: 'Full-stack developer and UX specialist creating seamless digital experiences. Bailey combines technical expertise with design thinking to build solutions that users love.',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_400,h_400,c_fill/v1/team/bailey-latimer.jpg'
  },
  {
    id: '5',
    name: 'Carson Ireland',
    role: 'Creative Director',
    email: 'carson@disruptorsmedia.com',
    bio: 'Award-winning creative director specializing in video production and brand storytelling. Carson brings concepts to life through powerful visual narratives.',
    image: 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_400,h_400,c_fill/v1/team/carson-ireland.jpg'
  }
];

// Company information
export const companyInfo: CompanyInfo = {
  founded: 2012,
  employees: '25+',
  location: 'North Salt Lake, Utah',
  address: '650 N MAIN ST, NORTH SALT LAKE, UT 84054',
  phone: '(801) 555-0123',
  email: 'hello@disruptorsmedia.com',
  social: {
    twitter: 'https://twitter.com/DisruptorsMedia',
    youtube: 'https://www.youtube.com/channel/UCIS7eKSZMJWnUT1dTLBjOWA',
    instagram: 'https://www.instagram.com/disruptorsmedia_',
    tiktok: 'https://www.tiktok.com/@disruptorsmedia'
  }
};

// Studio information
export const studioInfo = {
  name: 'Disruptors Media Studio',
  location: 'North Salt Lake, Utah',
  established: 2015,
  size: '2,000 sq ft',
  equipment: [
    '3x BlackMagic Cinema Cameras (4K)',
    '4x Shure SM7B Microphones',
    '3x HD TV Monitors',
    'Professional Lighting Grid',
    'Green Screen Setup',
    'Acoustic Treatment'
  ],
  pricing: {
    hourly: '$99/hour',
    minimum: '2 hour minimum',
    halfDay: '$350 (4 hours)',
    fullDay: '$650 (8 hours)',
    weekly: '$2,800 (5 days)'
  },
  bookingUrl: 'https://cal.com/disruptors-media/studio-booking'
};