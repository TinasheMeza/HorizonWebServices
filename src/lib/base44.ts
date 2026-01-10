// Base44 SDK integration
// Note: The @base44/sdk package may need to be installed or replaced with actual SDK
// For now, we'll create a mock implementation that works without the SDK

interface Base44Entity {
  id?: string
  [key: string]: unknown
}

interface Base44SDK {
  entities: {
    create: (entityName: string, data: Record<string, unknown>) => Promise<Base44Entity>
  }
  integrations: {
    trigger: (type: string, data: Record<string, unknown>) => Promise<boolean>
  }
}

// Try to initialize Base44 SDK
// eslint-disable-next-line prefer-const
let base44Instance: Base44SDK | null = null

try {
  // Dynamic import for Base44 SDK (if available)
  const projectId = import.meta.env.VITE_BASE44_PROJECT_ID || ''
  const apiKey = import.meta.env.VITE_BASE44_API_KEY || ''
  
  if (projectId && apiKey) {
    // Note: Replace this with actual Base44 SDK import when available
    // When uncommented, this will reassign base44Instance:
    // const { Base44 } = await import('@base44/sdk')
    // base44Instance = new Base44({ projectId, apiKey })
  }
} catch (error) {
  console.warn('Base44 SDK not available, using mock implementation')
}

// Mock implementation for development/testing
const mockBase44: Base44SDK = {
  entities: {
    create: async (entityName: string, data: Record<string, unknown>) => {
      console.log('Mock: Creating entity', entityName, data)
      return { id: 'mock-id', ...data, createdAt: new Date().toISOString() }
    },
  },
  integrations: {
    trigger: async (type: string, data: Record<string, unknown>) => {
      console.log('Mock: Triggering integration', type, data)
      return true
    },
  },
}

const base44 = base44Instance || mockBase44

// QuoteRequest entity type
export interface QuoteRequest {
  id?: string
  name: string
  email: string
  phone: string
  service: string
  budgetRange: string
  projectDescription: string
  fileUrl?: string
  status?: 'pending' | 'contacted' | 'quoted' | 'completed'
  createdAt?: string
  updatedAt?: string
}

// Create a quote request
export async function createQuoteRequest(data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<QuoteRequest> {
  try {
    const response = await base44.entities.create('QuoteRequest', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      budgetRange: data.budgetRange,
      projectDescription: data.projectDescription,
      fileUrl: data.fileUrl || '',
      status: 'pending',
    })
    
    return {
      id: response.id as string | undefined,
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      budgetRange: data.budgetRange,
      projectDescription: data.projectDescription,
      fileUrl: data.fileUrl,
      status: 'pending',
      createdAt: (response.createdAt as string | undefined) || new Date().toISOString(),
    } as QuoteRequest
  } catch (error) {
    console.error('Error creating quote request:', error)
    throw error
  }
}

// Send email notification (using Base44 integrations)
export async function sendQuoteRequestEmail(data: QuoteRequest): Promise<void> {
  try {
    await base44.integrations.trigger('email', {
      to: 'info@horizonwebservices.co.za', // Replace with actual email
      subject: `New Quote Request: ${data.service}`,
      body: `
        New quote request received:
        
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Service: ${data.service}
        Budget Range: ${data.budgetRange}
        Description: ${data.projectDescription}
        ${data.fileUrl ? `File: ${data.fileUrl}` : ''}
      `,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    // Don't throw - email failure shouldn't block the form submission
  }
}
