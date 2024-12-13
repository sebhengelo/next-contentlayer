const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '8301d609743354e8d17db4369793b396af35b02c861de926de360b258fb2d5ff0a90b8f5aa18862d92950a5d00a27501c7bcf931bb17c3f4ccd65695881d25b3311b27234fb634648e10658a97c00460c2e359f22dbfd865e51dbef9cf80e8f99476df883a8c7e35480065754698cc2257aeb1648ad187ac3d58fe71412028e2'

interface StrapiResponse<T> {
  data: Array<{
    id: number
    documentId: string
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    description: string
    slug: string
    checklists: any[]
    localizations: any[]
  }>
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface Category {
  id: number
  documentId: string
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  description: string
  slug: string
  checklists: any[]
  localizations: any[]
}

interface ContentBlock {
  type: string
  children: Array<{
    type: string
    text?: string
    // Add other possible properties based on your content structure
  }>
}

interface Checklist {
  id: number
  documentId: string
  title: string
  description: string
  content: ContentBlock[]
  items: Array<{
    label: string
    checked: boolean
  }>
  slug: string | null
  image?: {
    data: {
      attributes: {
        url: string
      }
    } | null
  }
}

async function fetchAPI<T>(endpoint: string): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api/${endpoint}`
  
  try {
    console.log(`Fetching from: ${url}`)
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Strapi API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url,
        token: STRAPI_TOKEN.substring(0, 10) + '...',
      })
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Strapi API Response:', data)
    return data
  } catch (error) {
    console.error('Strapi API Error:', error)
    throw new Error(`Failed to fetch from Strapi: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function getCategories() {
  try {
    const response = await fetchAPI<Category>('categories?populate=*')
    return response
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return { 
      data: [], 
      meta: { 
        pagination: { 
          page: 1, 
          pageSize: 25, 
          pageCount: 0, 
          total: 0 
        } 
      } 
    }
  }
}

export async function getCategory(documentId: string) {
  try {
    const response = await fetchAPI<Category>(`categories?filters[documentId][$eq]=${documentId}&populate=*`)
    
    if (!response.data?.[0]) {
      throw new Error('Category not found')
    }

    return {
      data: response.data[0],
      meta: response.meta
    }
  } catch (error) {
    console.error(`Failed to fetch category ${documentId}:`, error)
    throw error
  }
}

export async function getChecklist(categoryId: string, checklistId: string) {
  try {
    const response = await fetchAPI<Checklist>(`checklists?filters[documentId][$eq]=${checklistId}&populate=*`)
    
    if (!response.data?.[0]) {
      throw new Error('Checklist not found')
    }

    return {
      data: response.data[0],
      meta: response.meta
    }
  } catch (error) {
    console.error(`Failed to fetch checklist ${checklistId}:`, error)
    throw error
  }
} 