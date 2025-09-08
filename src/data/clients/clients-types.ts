/**
 * TypeScript interfaces for client data management
 * Auto-generated from Google Sheets sync
 */

export type ProjectStatus = 'completed' | 'in_progress' | 'proposal_sent' | 'cancelled';

export type ProjectType = 
  | 'website_redesign'
  | 'website_development' 
  | 'brand_identity'
  | 'ecommerce_development'
  | 'social_media_management'
  | 'seo_optimization'
  | 'digital_marketing'
  | 'content_creation'
  | 'mobile_app'
  | 'custom_development';

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Client {
  // Core Information
  clientId: number;
  companyName: string;
  industry: string;
  
  // Contact Information
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  websiteUrl?: string;
  
  // Visual Assets
  logoUrl?: string;
  
  // Project Information
  projectStartDate?: string; // YYYY-MM-DD format
  projectEndDate?: string;   // YYYY-MM-DD format
  projectStatus: ProjectStatus;
  projectType?: ProjectType;
  budgetRange?: string; // e.g., "25000-50000"
  
  // Marketing Content
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialPosition?: string;
  
  // Portfolio Integration
  caseStudyUrl?: string;
  portfolioUrl?: string;
  workExamples?: string; // Comma-separated services
  
  // Social Media
  socialMedia: SocialMediaLinks;
  
  // Metadata
  notes?: string;
  tags?: string[]; // Parsed from comma-separated string
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientsData {
  clients: Client[];
  lastSyncDate: string;
  totalCount: number;
}

export interface ClientFilter {
  industry?: string;
  projectStatus?: ProjectStatus;
  projectType?: ProjectType;
  tags?: string[];
  budgetMin?: number;
  budgetMax?: number;
}

export interface TestimonialData {
  clientId: number;
  companyName: string;
  quote: string;
  author: string;
  position: string;
  logoUrl?: string;
}

export interface PortfolioItem {
  clientId: number;
  companyName: string;
  projectType: ProjectType;
  description: string;
  imageUrl?: string;
  caseStudyUrl?: string;
  portfolioUrl?: string;
  completedDate?: string;
}