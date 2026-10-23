'use client';

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './TestimonialsPreview.module.css';
import Button from '@/components/ui/Button';
import { testimonials } from '@/data/testimonials';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

export default function TestimonialsPreview() {
  const { dict } = useLanguage();
  const displayed = testimonials.slice(0, 4);

  return (
    <section className={`${styles.section} ambient-glow-wrapper`}>
      <div className={`${styles.header} relative-z`}>
        <h2 className="font-serif thread-heading">
          <span>{dict.testimonials_preview.title_1} <em>{dict.testimonials_preview.title_em}</em> {dict.testimonials_preview.title_2}</span>
        </h2>
        <p className="font-sans">
          {dict.testimonials_preview.subtitle}
        </p>
      </div>

      <div className={`${styles.grid} relative-z`}>
        {displayed.map((t) => (
          <div key={t.id} className={styles.card}>
            <div className={styles.cardInner}>

              {/* Header: Avatar + Name + Stars */}
              <div className={styles.cardTop}>
                <div className={styles.cardTopLeft}>
                  <div className={styles.avatarWrap}>
                    <div className={styles.avatar}>
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={52}
                        height={52}
                        className={styles.avatarImg}
                      />
                    </div>
                    <span className={styles.verifiedBadge} aria-label="Verified customer">✓</span>
                  </div>
                  <div className={styles.cardName}>
                    <h4 className="font-serif">{t.name}</h4>
                    <span className="font-sans">{t.location}</span>
                  </div>
                </div>
                <div className={styles.stars} aria-label={`${t.rating} stars`}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
              </div>

              {/* Gold accent divider */}
              <div className={styles.divider} />

              {/* Review text */}
              <p className={`${styles.cardText} font-sans`}>
                {t.text}
              </p>

              {/* Footer: badge + date */}
              <div className={styles.cardFooter}>
                <span className={`${styles.serviceBadge} font-sans`}>{t.service}</span>
                <span className={`${styles.cardDate} font-sans`}>{formatDate(t.date)}</span>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className={styles.viewAll}>
        <Link href="/testimonials">
          <Button variant="outline">{dict.testimonials_preview.view_all}</Button>
        </Link>
      </div>
    </section>
  );
}
