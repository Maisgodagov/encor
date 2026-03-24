import type { MetadataRoute } from "next";
import { seoDescription, siteName, siteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — электромонтаж в Краснодаре`,
    short_name: siteName,
    description: seoDescription,
    start_url: siteUrl,
    display: "standalone",
    background_color: "#f1f1f1",
    theme_color: "#f1f1f1",
    lang: "ru",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
