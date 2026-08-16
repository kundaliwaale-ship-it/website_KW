import React from 'react';
import styles from './FeaturedServices.module.css';
import ServiceCoverflow from './ServiceCoverflow';

export default function FeaturedServices() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className="font-serif thread-heading">
          Our <em>Featured</em> Services
        </h2>
        <p className="font-sans">
          Discover the ancient wisdom of Vedic astrology through our premium, personalized services.
        </p>
      </div>

      <ServiceCoverflow />
    </section>
  );
}
