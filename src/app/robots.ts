import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 86400;
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/private/",
        "/admin/",
        "/api/",
        "/_next/",
        "/client-portal/private/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
