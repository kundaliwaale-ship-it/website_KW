import type { Metadata } from "next";
import { Tangerine, Lora, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";

const outfit = Outfit({
  variable: "--font-montserrat", /* Keeping the variable name the same so CSS doesn't break */
  subsets: ["latin"],
});

const tangerine = Tangerine({
  weight: ["400", "700"],
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
      <body className={`${outfit.variable} ${tangerine.variable} ${lora.variable} font-sans`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
