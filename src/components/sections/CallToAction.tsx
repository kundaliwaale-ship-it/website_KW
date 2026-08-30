'use client';

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import styles from './CallToAction.module.css';
import Button from '@/components/ui/Button';

export default function CallToAction() {
  const { dict } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className="font-serif">
          {dict.call_to_action.title_1} <em>{dict.call_to_action.title_em}</em> {dict.call_to_action.title_2}
        </h2>
        <p className="font-sans">
          {dict.call_to_action.subtitle}
        </p>
        <div className={styles.ctas}>
          <Link href="/services/kundali">
            <Button variant="primary">{dict.call_to_action.cta_primary}</Button>
          </Link>
          <Link href="/services/consultation">
            <Button variant="outline">{dict.call_to_action.cta_secondary}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
