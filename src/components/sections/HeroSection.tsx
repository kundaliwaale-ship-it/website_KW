import React from 'react';
import styles from './HeroSection.module.css';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Sun, Star } from 'lucide-react';

const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function HeroSection() {
  return (
    <div className="ambient-glow-wrapper">
      <div className="orb-primary" style={{ top: '10%', left: '-5%' }}></div>
      <div className="orb-secondary" style={{ bottom: '10%', right: '-5%' }}></div>
      <section className={`${styles.hero} relative-z`}>
        <div className={styles.heroInner}>
          <div className={`${styles.heroContent} slide-in-left`}>
            <div className={`${styles.heroLabel} font-sans`}>
              <span></span>
              Sacred Vedic Tradition, Delivered
            </div>
            <h1 className="font-serif">
              The Best <em>Handwritten Kundlis</em> Delivered to Your Home
            </h1>
            <p className="font-sans">
              Now you can have the finest authentic, handwritten Janam Kundlis crafted with precise Vedic calculations and delivered directly to your doorstep. Genuine guidance, clear remedies, and no computer-generated shortcuts.
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
    </div>
  );
}
