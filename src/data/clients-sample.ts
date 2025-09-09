// Sample client data - Replace with actual data from Google Sheets sync
export interface Client {
  clientId: number;
  companyName: string;
  logoUrl: string;
  industry?: string;
  testimonialQuote?: string;
}

// Sample clients with placeholder logos - replace with actual client logos
export const sampleClients: Client[] = [
  {
    clientId: 1,
    companyName: "Tech Innovators Inc",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Tech+Innovators",
    industry: "Technology"
  },
  {
    clientId: 2,
    companyName: "Global Marketing Co",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Global+Marketing",
    industry: "Marketing"
  },
  {
    clientId: 3,
    companyName: "Creative Studios LLC",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Creative+Studios",
    industry: "Media"
  },
  {
    clientId: 4,
    companyName: "Finance Partners",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Finance+Partners",
    industry: "Financial Services"
  },
  {
    clientId: 5,
    companyName: "Retail Solutions",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Retail+Solutions",
    industry: "Retail"
  },
  {
    clientId: 6,
    companyName: "Healthcare Plus",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Healthcare+Plus",
    industry: "Healthcare"
  },
  {
    clientId: 7,
    companyName: "Educational Systems",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Educational+Systems",
    industry: "Education"
  },
  {
    clientId: 8,
    companyName: "Manufacturing Corp",
    logoUrl: "https://via.placeholder.com/200x100/000000/FFFFFF?text=Manufacturing+Corp",
    industry: "Manufacturing"
  }
];