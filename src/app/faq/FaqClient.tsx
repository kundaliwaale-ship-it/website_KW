'use client';

import React from 'react';
import styles from './faq.module.css';
import { faqData } from '@/data/faq';
import AccordionItem from '@/components/ui/AccordionItem';
import { useLanguage } from '@/i18n/LanguageContext';

const categories = [
  { key: 'general' },
  { key: 'kundali' },
  { key: 'vastu' },
  { key: 'consultation' },
  { key: 'payment' },
  { key: 'delivery' },
] as const;

export default function FaqClient() {
  const { dict } = useLanguage();

  const getCategoryLabel = (key: string) => {
    switch (key) {
      case 'general': return dict.faq_page.categories.general;
      case 'kundali': return dict.faq_page.categories.kundali;
      case 'vastu': return dict.faq_page.categories.vastu;
      case 'consultation': return dict.faq_page.categories.consultation;
      case 'payment': return dict.faq_page.categories.payment;
      case 'delivery': return dict.faq_page.categories.delivery;
      default: return key;
    }
  };

  const getFaqItem = (id: number) => {
    switch (id) {
      case 1: return dict.faq_page.items.q1;
      case 2: return dict.faq_page.items.q2;
      case 3: return dict.faq_page.items.q3;
      case 4: return dict.faq_page.items.q4;
      case 5: return dict.faq_page.items.q5;
      case 6: return dict.faq_page.items.q6;
      case 7: return dict.faq_page.items.q7;
      case 8: return dict.faq_page.items.q8;
      case 9: return dict.faq_page.items.q9;
      case 10: return dict.faq_page.items.q10;
      case 11: return dict.faq_page.items.q11;
      case 12: return dict.faq_page.items.q12;
      default: return dict.faq_page.items.q1;
    }
  };

  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      <section className={`${styles.hero} relative-z`}>
        <h1 className="font-serif">{dict.faq_page.hero.title_1} <em>{dict.faq_page.hero.title_em}</em></h1>
        <p className="font-sans">
          {dict.faq_page.hero.desc}
        </p>
      </section>

      <section className={`${styles.content} relative-z`}>
        <div className={styles.contentInner}>
          {categories.map((cat) => {
            const items = faqData.filter((f) => f.category === cat.key);
            if (items.length === 0) return null;
            return (
              <div key={cat.key} className={styles.category}>
                <h2 className={`${styles.categoryTitle} font-serif`}>{getCategoryLabel(cat.key)}</h2>
                <div className={styles.accordionGroup}>
                  {items.map((item) => {
                    const trans = getFaqItem(item.id);
                    return (
                      <AccordionItem
                        key={item.id}
                        question={trans.q}
                        answer={trans.a}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
