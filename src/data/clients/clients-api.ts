/**
 * API functions for client data management and Google Sheets integration
 */

import { Client, ClientsData, ClientFilter, TestimonialData, PortfolioItem, ProjectStatus, ProjectType } from './clients-types';

// Cache for client data
let clientsCache: ClientsData | null = null;
let cacheExpiry: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Parse CSV row to Client object
 */
function parseClientFromCsv(row: any): Client {
  // Parse social media links
  const socialMedia = {
    facebook: row.social_media_facebook || undefined,
    instagram: row.social_media_instagram || undefined,
    linkedin: row.social_media_linkedin || undefined,
    twitter: row.social_media_twitter || undefined,
  };

  // Parse tags from comma-separated string
  const tags = row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [];

  return {
    clientId: parseInt(row.client_id),
    companyName: row.company_name,
    industry: row.industry,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone || undefined,
    websiteUrl: row.website_url || undefined,
    logoUrl: row.logo_url || undefined,
    projectStartDate: row.project_start_date || undefined,
    projectEndDate: row.project_end_date || undefined,
    projectStatus: row.project_status as ProjectStatus || 'proposal_sent',
    projectType: row.project_type as ProjectType || undefined,
    budgetRange: row.budget_range || undefined,
    testimonialQuote: row.testimonial_quote || undefined,
    testimonialAuthor: row.testimonial_author || undefined,
    testimonialPosition: row.testimonial_position || undefined,
    caseStudyUrl: row.case_study_url || undefined,
    portfolioUrl: row.portfolio_url || undefined,
    workExamples: row.work_examples || undefined,
    socialMedia,
    notes: row.notes || undefined,
    tags,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Sync data from Google Sheets
 */
export async function syncFromGoogleSheets(): Promise<ClientsData> {
  if (!process.env.GOOGLE_SHEETS_API_KEY || !process.env.CLIENTS_GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets API credentials not configured in environment variables');
  }

  const sheetId = process.env.CLIENTS_GOOGLE_SHEET_ID;
  const range = process.env.CLIENTS_GOOGLE_SHEET_RANGE || 'Sheet1!A1:Z1000';
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length === 0) {
      return { clients: [], lastSyncDate: new Date().toISOString(), totalCount: 0 };
    }

    // First row is headers
    const headers = rows[0];
    const clients: Client[] = [];

    // Parse data rows
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length === 0) continue; // Skip empty rows

      // Convert row array to object using headers
      const rowObject: any = {};
      headers.forEach((header: string, index: number) => {
        rowObject[header] = row[index] || '';
      });

      // Parse and validate client data
      try {
        const client = parseClientFromCsv(rowObject);
        clients.push(client);
      } catch (error) {
        console.warn(`Failed to parse client row ${i + 1}:`, error);
      }
    }

    const clientsData: ClientsData = {
      clients,
      lastSyncDate: new Date().toISOString(),
      totalCount: clients.length,
    };

    // Update cache
    clientsCache = clientsData;
    cacheExpiry = Date.now() + CACHE_DURATION;

    return clientsData;
  } catch (error) {
    console.error('Error syncing from Google Sheets:', error);
    throw error;
  }
}

/**
 * Get all clients with caching
 */
export async function getClients(): Promise<Client[]> {
  // Check cache first
  if (clientsCache && Date.now() < cacheExpiry) {
    return clientsCache.clients;
  }

  // Sync from Google Sheets
  const data = await syncFromGoogleSheets();
  return data.clients;
}

/**
 * Get client by ID
 */
export async function getClientById(clientId: number): Promise<Client | null> {
  const clients = await getClients();
  return clients.find(client => client.clientId === clientId) || null;
}

/**
 * Filter clients by criteria
 */
export async function filterClients(filter: ClientFilter): Promise<Client[]> {
  const clients = await getClients();
  
  return clients.filter(client => {
    // Filter by industry
    if (filter.industry && client.industry !== filter.industry) {
      return false;
    }

    // Filter by project status
    if (filter.projectStatus && client.projectStatus !== filter.projectStatus) {
      return false;
    }

    // Filter by project type
    if (filter.projectType && client.projectType !== filter.projectType) {
      return false;
    }

    // Filter by tags
    if (filter.tags && filter.tags.length > 0) {
      const hasMatchingTag = filter.tags.some(tag => 
        client.tags?.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Filter by budget range
    if ((filter.budgetMin || filter.budgetMax) && client.budgetRange) {
      const budgetParts = client.budgetRange.split('-');
      if (budgetParts.length === 2) {
        const clientMin = parseInt(budgetParts[0]);
        const clientMax = parseInt(budgetParts[1]);
        
        if (filter.budgetMin && clientMax < filter.budgetMin) {
          return false;
        }
        
        if (filter.budgetMax && clientMin > filter.budgetMax) {
          return false;
        }
      }
    }

    return true;
  });
}

/**
 * Get clients by tag
 */
export async function getClientsByTag(tag: string): Promise<Client[]> {
  return filterClients({ tags: [tag] });
}

/**
 * Get clients by industry
 */
export async function getClientsByIndustry(industry: string): Promise<Client[]> {
  return filterClients({ industry });
}

/**
 * Get testimonials from completed projects
 */
export async function getTestimonials(): Promise<TestimonialData[]> {
  const clients = await filterClients({ projectStatus: 'completed' });
  
  return clients
    .filter(client => client.testimonialQuote && client.testimonialAuthor)
    .map(client => ({
      clientId: client.clientId,
      companyName: client.companyName,
      quote: client.testimonialQuote!,
      author: client.testimonialAuthor!,
      position: client.testimonialPosition || 'Client',
      logoUrl: client.logoUrl,
    }));
}

/**
 * Get portfolio items from completed projects
 */
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const clients = await filterClients({ projectStatus: 'completed' });
  
  return clients
    .filter(client => client.portfolioUrl || client.caseStudyUrl)
    .map(client => ({
      clientId: client.clientId,
      companyName: client.companyName,
      projectType: client.projectType || 'website_development',
      description: client.workExamples || `${client.projectType} for ${client.companyName}`,
      imageUrl: client.logoUrl,
      caseStudyUrl: client.caseStudyUrl,
      portfolioUrl: client.portfolioUrl,
      completedDate: client.projectEndDate,
    }));
}

/**
 * Get unique industries from all clients
 */
export async function getIndustries(): Promise<string[]> {
  const clients = await getClients();
  const industries = clients.map(client => client.industry);
  return [...new Set(industries)].sort();
}

/**
 * Get unique tags from all clients
 */
export async function getTags(): Promise<string[]> {
  const clients = await getClients();
  const allTags = clients.flatMap(client => client.tags || []);
  return [...new Set(allTags)].sort();
}

/**
 * Force cache refresh
 */
export function clearCache(): void {
  clientsCache = null;
  cacheExpiry = 0;
}