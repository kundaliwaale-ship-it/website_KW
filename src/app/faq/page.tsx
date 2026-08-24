import React from 'react';
import type { Metadata } from 'next';
import styles from './faq.module.css';
import { faqData } from '@/data/faq';
import AccordionItem from '@/components/ui/AccordionItem';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our Kundli reports, Vastu consultations, astrology services, payments, and delivery.',
};

const categories = [
  { key: 'general', label: 'General' },
  { key: 'kundali', label: 'Kundali' },
  { key: 'vastu', label: 'Vastu' },
  { key: 'consultation', label: 'Consultation' },
  { key: 'payment', label: 'Payments' },
  { key: 'delivery', label: 'Delivery' },
] as const;

export default function FaqPage() {
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      <section className={`${styles.hero} relative-z`}>
        <h1 className="font-serif">Frequently Asked <em>Questions</em></h1>
        <p className="font-sans">
          Find answers to common questions about our services, payments, and delivery.
        </p>
      </section>

      <section className={`${styles.content} relative-z`}>
        <div className={styles.contentInner}>
          {categories.map((cat) => {
            const items = faqData.filter((f) => f.category === cat.key);
            if (items.length === 0) return null;
            return (
              <div key={cat.key} className={styles.category}>
                <h2 className={`${styles.categoryTitle} font-serif`}>{cat.label}</h2>
                <div className={styles.accordionGroup}>
                  {items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
