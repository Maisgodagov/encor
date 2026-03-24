import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://encor-krd.ru/sitemap.xml",
    host: "https://encor-krd.ru",
  };
}
