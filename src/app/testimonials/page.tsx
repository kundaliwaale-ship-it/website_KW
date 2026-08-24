import React from 'react';
import type { Metadata } from 'next';
import styles from './testimonials.module.css';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read real reviews and success stories from our customers who have experienced the power of Vedic astrology.',
};

export default function TestimonialsPage() {
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      <section className={`${styles.hero} relative-z`}>
        <h1 className="font-serif">Customer <em>Reviews</em></h1>
        <p className="font-sans">
          Real stories from real people whose lives were transformed through Vedic astrology.
        </p>
      </section>

      <section className={`${styles.content} relative-z`}>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeGroup}>
              {testimonials.map((t) => (
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
                      {new Date(t.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicated group for seamless infinite scroll */}
            <div className={styles.marqueeGroup}>
              {testimonials.map((t) => (
                <div key={`dup-${t.id}`} className={`${styles.card} glass-card`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.avatar}>
                      <img src={t.avatar} alt={t.name} className={styles.avatarImg} />
                    </div>
                    <div>
                      <h3 className="font-sans">{t.name}</h3>
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
                      {new Date(t.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
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
