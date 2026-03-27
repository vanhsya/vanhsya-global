import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vanhsya.com'
  
  const countries = [
    'canada', 'australia', 'uk', 'usa', 'germany', 'new-zealand', 'singapore', 'uae'
  ]

  const aiTools = [
    'checklist-assistant', 'cv-builder', 'document-wizard', 'eligibility', 
    'embassy-alerts', 'scam-detector', 'sop-generator',
    'visa-timeline-predictor', 'entry-requirements-radar', 'travel-itinerary-ai'
  ]

  const services = [
    'study-visa', 'work-visa', 'business-visa', 'family-visa', 
    'permanent-residence', 'tourist-visa'
  ]

  const countryUrls: MetadataRoute.Sitemap = countries.map(country => ({
    url: `${baseUrl}/countries/${country}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const aiToolUrls: MetadataRoute.Sitemap = aiTools.map(tool => ({
    url: `${baseUrl}/ai-tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const serviceUrls: MetadataRoute.Sitemap = services.map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: `${baseUrl}/countries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...countryUrls,
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...aiToolUrls,
    {
      url: `${baseUrl}/referral-program`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/referral-program/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expose`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/card`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
