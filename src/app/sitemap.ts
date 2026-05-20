import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 86400;
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();
  
  const countries = [
    "canada",
    "australia",
    "uk",
    "usa",
    "germany",
    "new-zealand",
    "singapore",
    "uae",
  ];

  const aiTools = [
    "checklist-assistant",
    "cv-builder",
    "document-wizard",
    "eligibility",
    "embassy-alerts",
    "scam-detector",
    "sop-generator",
    "visa-timeline-predictor",
    "entry-requirements-radar",
    "travel-itinerary-ai",
  ];

  const services = [
    "study-visa",
    "work-visa",
    "business-visa",
    "family-visa",
    "permanent-residence",
    "tourist-visa",
  ];

  const countryUrls: MetadataRoute.Sitemap = countries.map(country => ({
    url: `${baseUrl}/countries/${country}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const aiToolUrls: MetadataRoute.Sitemap = aiTools.map(tool => ({
    url: `${baseUrl}/ai-tools/${tool}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: `${baseUrl}/countries`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...countryUrls,
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...aiToolUrls,
    {
      url: `${baseUrl}/consultation`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/referral-program`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/referral-program/stories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expose`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/card`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/next-era`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-innovations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/success-stories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
