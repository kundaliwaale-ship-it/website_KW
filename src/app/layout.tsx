import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
    default: "Kundaliwaale — Your Cosmic Guide | Vedic Astrology & Vastu",
    template: "%s | Kundaliwaale",
  },
  description:
    "Now you can have the best possible authentic Handwritten Kundlis delivered directly to your home. Personalized Vedic astrology, expert Vastu consultations, and honest guidance from Kundaliwaale.",
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
      <body className={`${jakarta.variable} ${cormorant.variable} ${lora.variable} font-body`}>
        <AuthProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}
