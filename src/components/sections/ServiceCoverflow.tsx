'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ServiceCoverflow.module.css';

interface CarouselItem {
  id: string;
  title: string;
  shortDescription: string;
  href: string;
  bgImage: string;
}

const items: CarouselItem[] = [
  {
    id: 'kundali',
    title: 'Handwritten Kundli',
    shortDescription: 'Detailed handwritten Janam Kundli analysis for career, love, and life insights.',
    href: '/services/kundali',
    bgImage: '/images/Featured/kundli.jpg',
  },
  {
    id: 'consultation',
    title: 'Consultation',
    shortDescription: 'Book a 1-on-1 session with Kundaliwaale for personalized guidance.',
    href: '/services/consultation',
    bgImage: '/images/Featured/consultation.jpg',
  },
  {
    id: 'vastu',
    title: 'Vastu Analysis',
    shortDescription: 'Transform your home or office energy with expert Vastu assessment.',
    href: '/services/vastu',
    bgImage: '/images/Featured/vastu.jpg',
  }
];

export default function ServiceCoverflow() {
  return (
    <div className={styles.gridContainer}>
      {items.map((item) => (
        <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }}>
          <div className={styles.cardWrapper}>
            <div 
              className={styles.cardImageSection}
              style={{ backgroundImage: `url('${item.bgImage}')` }}
            />
            <div className={styles.cardTextSection}>
              <div className={styles.textContent}>
                <h3 className="font-body">{item.title}</h3>
                <p className="font-sans">{item.shortDescription}</p>
              </div>
              <span className={styles.arrowIcon}>→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
