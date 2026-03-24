import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/styled-components-registry";

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

export const metadata: Metadata = {
  title: {
    default: "Энкор - электромонтаж в Краснодаре",
    template: "%s | Энкор",
  },
  description:
    "Электромонтаж в Краснодаре: квартиры, дома, частные дома, новостройки. Проводка, электрощит, проект, расчет нагрузок, штробление.",
  keywords: [
    "электромонтаж Краснодар",
    "электрик Краснодар",
    "электромонтаж в квартире Краснодар",
    "электромонтаж в частном доме Краснодар",
    "прокладка проводки Краснодар",
    "сборка электрощита Краснодар",
    "штробление под проводку Краснодар",
  ],
  metadataBase: new URL("https://encor-krd.ru"),
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Энкор - электромонтаж в Краснодаре",
    description:
      "Электромонтажные работы под ключ в Краснодаре: проводка, электрощит, проект и расчет нагрузок.",
    type: "website",
    locale: "ru_RU",
    url: "https://encor-krd.ru",
    siteName: "Энкор",
  },
  twitter: {
    card: "summary_large_image",
    title: "Энкор - электромонтаж в Краснодаре",
    description:
      "Электромонтажные работы под ключ в Краснодаре: проводка, электрощит, проект и расчет нагрузок.",
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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
