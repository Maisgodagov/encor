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
    default: "Энкор",
    template: "%s | Энкор",
  },
  description: "Официальный сайт Энкор.",
  metadataBase: new URL("https://encor-krd.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Энкор",
    description: "Официальный сайт Энкор.",
    type: "website",
    locale: "ru_RU",
    url: "https://encor-krd.ru",
    siteName: "Энкор",
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
