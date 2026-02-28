import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/styled-components-registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Encor",
    template: "%s | Encor",
  },
  description: "Landing page for Encor with lead form and SEO optimization.",
  metadataBase: new URL("https://encor-krd.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Encor",
    description: "Landing page for Encor with lead form and SEO optimization.",
    type: "website",
    locale: "ru_RU",
    url: "https://encor-krd.ru",
    siteName: "Encor",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
