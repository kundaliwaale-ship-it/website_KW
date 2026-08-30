'use client';

import React from 'react';
import styles from './HeroSection.module.css';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Sun, Star } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function HeroSection() {
  const { dict } = useLanguage();

  return (
    <div className="ambient-glow-wrapper">
      <div className="orb-primary" style={{ top: '10%', left: '-5%' }}></div>
      <div className="orb-secondary" style={{ bottom: '10%', right: '-5%' }}></div>
      <section className={`${styles.hero} relative-z`}>
        <div className={styles.heroInner}>
          <div className={`${styles.heroContent} slide-in-left`}>
            <div className={`${styles.heroLabel} font-sans`}>
              <span></span>
              {dict.home.hero_badge}
            </div>
            <h1 className="font-serif">
              {dict.home.hero_title_1} <em>{dict.home.hero_title_em}</em> {dict.home.hero_title_2}
            </h1>
            <p className="font-sans">
              {dict.home.hero_subtitle}
            </p>
            <div className={styles.heroCtas}>
              <Link href="/services/kundali">
                <Button variant="primary">
                  {dict.home.cta_primary}
                </Button>
              </Link>
              <Link href="/services/consultation">
                <Button variant="outline">
                  {dict.home.cta_secondary}
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
