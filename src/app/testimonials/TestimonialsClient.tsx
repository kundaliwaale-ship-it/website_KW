'use client';

import React from 'react';
import styles from './testimonials.module.css';
import { useLanguage } from '@/i18n/LanguageContext';

export default function TestimonialsClient() {
  const { dict, locale } = useLanguage();
  const tData = dict.testimonials_data || [];

  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      <section className={`${styles.hero} relative-z`}>
        <h1 className="font-serif">
          {dict.testimonials_page.title_1} <em>{dict.testimonials_page.title_em}</em>
        </h1>
        <p className="font-sans">
          {dict.testimonials_page.subtitle}
        </p>
      </section>

      <section className={`${styles.content} relative-z`}>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeGroup}>
              {tData.map((t: any) => (
                <div key={t.id} className={`${styles.card} glass-card`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                      <img src={t.avatar} alt={t.name} className={styles.avatarImg} />
                    </div>
                    <div>
                      <h3 className="font-serif">{t.name}</h3>
                      <span className="font-sans">{t.location}</span>
                    </div>
                  </div>
                  <div className={styles.stars}>
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  <p className={`${styles.reviewText} font-sans`}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={`${styles.serviceBadge} font-sans`}>{t.service}</span>
                    <span className={`${styles.date} font-sans`}>
                      {new Date(t.date).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicated group for seamless infinite scroll */}
            <div className={styles.marqueeGroup}>
              {tData.map((t: any) => (
                <div key={`dup-${t.id}`} className={`${styles.card} glass-card`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                      <img src={t.avatar} alt={t.name} className={styles.avatarImg} />
                    </div>
                    <div>
                      <h3 className="font-serif">{t.name}</h3>
                      <span className="font-sans">{t.location}</span>
                    </div>
                  </div>
                  <div className={styles.stars}>
                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                  </div>
                  <p className={`${styles.reviewText} font-sans`}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={`${styles.serviceBadge} font-sans`}>{t.service}</span>
                    <span className={`${styles.date} font-sans`}>
                      {new Date(t.date).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
