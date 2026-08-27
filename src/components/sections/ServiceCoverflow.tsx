'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ServiceCoverflow.module.css';

interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  href: string;
  icon: React.ReactNode;
}

const items: ServiceItem[] = [
  {
    id: 'kundali',
    title: 'Handwritten Kundli',
    shortDescription: 'Our signature offering. A beautifully handcrafted Janam Kundli analysis covering career, love, and life purpose.',
    href: '/services/kundali',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m22 12-10 10"/>
        <path d="m12 22-10-10"/>
        <path d="m2 12 10-10"/>
        <path d="m12 2 10 10"/>
      </svg>
    )
  },
  {
    id: 'consultation',
    title: 'Consultation',
    shortDescription: 'Direct 1-on-1 guidance from expert astrologers for your most pressing questions and cosmic clarity.',
    href: '/services/consultation',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        <circle cx="19" cy="4" r="1" fill="currentColor"/>
        <path d="m19 1-1 1m2 0-1-1m0 3 1 1m-2 0 1-1"/>
      </svg>
    )
  },
  {
    id: 'vastu',
    title: 'Vastu Analysis',
    shortDescription: 'Harmonize your living or workspace to attract prosperity, peace, and positive energetic alignment.',
    href: '/services/vastu',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5"/>
        <path d="M6 13v8h12v-8"/>
        <circle cx="12" cy="15" r="4"/>
        <path d="M12 11v8"/>
        <path d="M8 15h8"/>
      </svg>
    )
  }
];

export default function ServiceCoverflow() {
  return (
    <div className={styles.listContainer}>
      {items.map((item) => (
        <Link key={item.id} href={item.href} className={styles.card}>
          <div className={styles.headerRow}>
            <div className={styles.iconWrapper}>
              {item.icon}
            </div>
            <h3 className="font-serif">{item.title}</h3>
          </div>
          <p className="font-sans">{item.shortDescription}</p>
          <div className={styles.cardFooter}>
            <span className={styles.exploreText}>Explore Service</span>
            <span className={styles.arrowIcon}>→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
