'use client';

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import styles from './FeaturedServices.module.css';
import ServiceCoverflow from './ServiceCoverflow';

export default function FeaturedServices() {
  const { dict } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className="font-serif thread-heading">
          {dict.featured_services.title_1} <em>{dict.featured_services.title_em}</em> {dict.featured_services.title_2}
        </h2>
        <p className="font-sans">
          {dict.featured_services.subtitle}
        </p>
      </div>

      <ServiceCoverflow />
    </section>
  );
}
