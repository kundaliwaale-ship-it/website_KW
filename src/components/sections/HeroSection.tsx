import React from 'react';
import styles from './HeroSection.module.css';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Sun, Star } from 'lucide-react';

const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function HeroSection() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={`${styles.heroContent} slide-in-left`}>
            <div className={`${styles.heroLabel} font-sans`}>
              <span></span>
              Your Trusted Cosmic Guide
            </div>
            <h1 className="font-serif">
              Authentic Guidance for <br /> <em>Vastu, Consultations</em> & Handwritten Kundli
            </h1>
            <p className="font-sans">
              Experience genuine Vedic wisdom without the false promises. We specialize in handwritten Kundli making, expert Vastu analysis, and personalized astrology consultations to bring real, practical clarity to your life.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/services/kundali">
                <Button variant="primary">
                  Get Your Handwritten Kundli →
                </Button>
              </Link>
              <Link href="/services/consultation">
                <Button variant="outline">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>

          <div className={`${styles.heroVisual} slide-in-right`}>
            <div className={styles.chakraWrapper}>
              <img 
                src="/images/vedic_chakra.png" 
                alt="Vedic Astrology Chakra" 
                className={styles.chakraImage}
              />
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
