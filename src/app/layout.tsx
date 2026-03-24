import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import {
  ogImageUrl,
  seoDescription,
  seoJsonLd,
  seoKeywords,
  seoTitle,
  siteName,
  siteUrl,
} from "@/lib/seo";

const mulish = localFont({
  src: [
    { path: "../../public/fonts/Mulish-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Mulish-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Mulish-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Mulish-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Mulish-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-mulish",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f1f1f1",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: "%s | Энкор",
  },
  description: seoDescription,
  applicationName: siteName,
  keywords: seoKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "home services",
  classification: "Электромонтажные работы в Краснодаре",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: siteUrl,
    languages: {
      "ru-RU": siteUrl,
    },
  },
  verification: {
    google: "_jVZ1ZrHPHIi3QEbwVpZWu9xOru0I2OLaHeFrISh-X8",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName,
    title: seoTitle,
    description: seoDescription,
    countryName: "Россия",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Электромонтаж в Краснодаре от Энкор",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [ogImageUrl],
  },
  other: {
    "geo.region": "RU-KDA",
    "geo.placename": "Краснодар",
    "geo.position": "45.035470;38.975313",
    ICBM: "45.035470, 38.975313",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={mulish.variable} suppressHydrationWarning>
        <StyledComponentsRegistry>
          {seoJsonLd.map((item, index) => (
            <script
              key={`seo-jsonld-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
            />
          ))}
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
