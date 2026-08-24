import React from 'react';
import Link from 'next/link';
import styles from './TestimonialsPreview.module.css';
import Button from '@/components/ui/Button';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsPreview() {
  return (
    <section className={`${styles.section} ambient-glow-wrapper`}>
      <div className={`${styles.header} relative-z`}>
        <h2 className="font-serif thread-heading">
          <span>What Our <em>Customers</em> Say</span>
        </h2>
        <p className="font-sans">
          Real stories from real people whose lives were transformed through our guidance.
        </p>
      </div>

      <div className={`${styles.grid} relative-z`}>
        {testimonials.slice(0, 4).map((t) => (
          <div key={t.id} className={`${styles.card} glass-card`}>
            <div className={styles.cardTop}>
              <div className={styles.cardTopLeft}>
                <div className={styles.avatar}>
                  <img src={t.avatar} alt={t.name} className={styles.avatarImg} />
                </div>
                <div className={styles.cardName}>
                  <h4 className="font-serif">{t.name}</h4>
                  <span className="font-sans">{t.location}</span>
                </div>
              </div>
              <div className={styles.stars}>
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
            </div>
            <p className={`${styles.cardText} font-sans`}>
              &ldquo;{t.text}&rdquo;
            </p>
            <span className={`${styles.serviceBadge} font-sans`}>{t.service}</span>
          </div>
        ))}
      </div>

      <div className={styles.viewAll}>
        <Link href="/testimonials">
          <Button variant="outline">View All Reviews →</Button>
        </Link>
      </div>
    </section>
  );
}
