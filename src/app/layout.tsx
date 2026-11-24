import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import LayoutShell from "@/components/layout/LayoutShell";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-montserrat", /* Keeping the variable name the same so CSS doesn't break */
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-main",
  subsets: ["latin"],
});

const lora = Lora({
  weight: ["400", "500", "600"],
  variable: "--font-body-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dashakundli — Your Cosmic Guide | Vedic Astrology & Vastu",
    template: "%s | Dashakundli",
  },
  description:
    "Now you can have the best possible authentic Handwritten Kundlis delivered directly to your home. Personalized Vedic astrology, expert Vastu consultations, and honest guidance from Dashakundli.",
  keywords: [
    "astrology",
    "kundli",
    "janam kundli",
    "vastu consultation",
    "vedic astrology",
    "horoscope",
    "birth chart",
    "astrologer",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Dashakundli — Your Cosmic Guide",
    description:
      "Premium Vedic Astrology & Vastu consultations. Get your personalized Kundli today.",
    url: "https://dashakundli.com",
    siteName: "Dashakundli",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dashakundli — Your Cosmic Guide",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashakundli — Your Cosmic Guide | Vedic Astrology & Vastu",
    description:
      "Now you can have the best possible authentic Handwritten Kundlis delivered directly to your home. Personalized Vedic astrology, expert Vastu consultations, and honest guidance from Dashakundli.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${cormorant.variable} ${lora.variable} font-body`}>
        <AuthProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}
