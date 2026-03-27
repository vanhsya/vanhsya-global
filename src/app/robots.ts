import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/api/',
        '/_next/',
        '/client-portal/private/',
      ],
    },
    sitemap: 'https://vanhsya.com/sitemap.xml',
  }
}
