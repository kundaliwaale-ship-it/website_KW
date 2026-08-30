'use client';

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './AboutAcharya.module.css';
import { GraduationCap, Book, Globe, Star, User } from 'lucide-react';

export default function AboutAcharya() {
  const { dict } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.imageCol}>
          <div className={styles.imagePlaceholder}>
            <img 
              src="/images/acharya_portrait.png" 
              alt="Acharya Ji" 
              className={styles.portraitImg}
            />
          </div>
          <div className={styles.experienceBadge}>
            <h4 className="font-body">{dict.about_acharya.badge_1}</h4>
            <p className="font-sans">{dict.about_acharya.badge_2}</p>
          </div>
        </div>

        <div className={styles.manuscriptBox}>
          <div className={styles.content}>
          <h2 className="font-serif">
            {dict.about_acharya.title_1} <em>{dict.about_acharya.title_em}</em>
          </h2>
          <p className="font-sans">
            {dict.about_acharya.desc}
          </p>

          <div className={styles.credentials}>
            <div className={styles.credential}>
              <GraduationCap size={20} />
              <span className="font-sans">{dict.about_acharya.credentials.cert}</span>
            </div>
            <div className={styles.credential}>
              <Book size={20} />
              <span className="font-sans">{dict.about_acharya.credentials.manuscript}</span>
            </div>
            <div className={styles.credential}>
              <Globe size={20} />
              <span className="font-sans">{dict.about_acharya.credentials.delivery}</span>
            </div>
            <div className={styles.credential}>
              <Star size={20} />
              <span className="font-sans">{dict.about_acharya.credentials.personalized}</span>
            </div>
          </div>

          <Link href="/about" className={`${styles.readMore} font-sans`}>
            {dict.about_acharya.read_more} <span>→</span>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
