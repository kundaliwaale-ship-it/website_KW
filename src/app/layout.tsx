import type { Metadata } from "next";
import { Italianno, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const italianno = Italianno({
  weight: "400",
  variable: "--font-serif-main",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  variable: "--font-body-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kundaliwaale — Your Cosmic Guide | Vedic Astrology & Vastu",
    template: "%s | Kundaliwaale",
  },
  description:
    "Get premium personalized Kundli reports, expert Vastu consultations, and 1-on-1 astrology guidance from Kundaliwaale. 10 lakh+ reports delivered. 4.9/5 rating.",
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
  openGraph: {
    title: "Kundaliwaale — Your Cosmic Guide",
    description:
      "Premium Vedic Astrology & Vastu consultations. Get your personalized Kundli today.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${italianno.variable} ${cormorant.variable} font-sans`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
