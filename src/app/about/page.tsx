import React from 'react';
import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Kundaliwaale — a renowned Vedic astrologer with 15+ years of experience, guiding millions towards clarity and purpose.',
};

const milestones = [
  { year: '2010', title: 'Journey Begins', description: 'Started practicing Vedic Jyotish after completing Kundaliwaale certification from Banaras Hindu University.' },
  { year: '2013', title: 'First 10,000 Kundlis', description: 'Crossed the milestone of delivering 10,000 handwritten Kundli reports.' },
  { year: '2016', title: 'Vastu Expertise', description: 'Earned certification in Vastu Shastra and began offering home & office consultations.' },
  { year: '2019', title: 'Digital Expansion', description: 'Launched the online platform, making services accessible to clients across India and abroad.' },
  { year: '2022', title: '5 Lakh Reports', description: 'Delivered over 5 lakh personalized reports with a 4.9/5 customer satisfaction rating.' },
  { year: '2026', title: '10 Lakh+ & Growing', description: 'Crossed 10 lakh reports delivered. Serving clients in 15+ countries worldwide.' },
];

import { GraduationCap, FileText, Medal, Star, User, Sparkles } from 'lucide-react';

const certifications = [
  { icon: <GraduationCap size={24} />, title: 'Jyotish Acharya', institution: 'Banaras Hindu University' },
  { icon: <FileText size={24} />, title: 'Vastu Shastra Expert', institution: 'Indian Council of Astrological Sciences' },
  { icon: <Medal size={24} />, title: 'Jyotish Ratna Award', institution: 'All India Federation of Astrologers' },
  { icon: <Star size={24} />, title: 'International Recognition', institution: 'World Astrology Council' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className="font-serif">About <em>Kundaliwaale</em></h1>
          <p className="font-sans">
            Dedicated to illuminating lives through the ancient wisdom of Vedic astrology.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className={styles.missionInner}>
          <div className={styles.missionIcon}><Sparkles size={40} color="var(--primary-gold)" /></div>
          <h2 className="font-serif">Our Mission</h2>
          <p className="font-sans">
            To make authentic Vedic astrology accessible to everyone. We believe that the ancient
            science of Jyotish holds the power to transform lives — bringing clarity to confusion,
            hope to despair, and direction to the lost. Every report we craft, every consultation we
            offer, is guided by this mission.
          </p>
        </div>
      </section>

      {/* About the Kundaliwaale */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutImage}>
            <div className={styles.imagePlaceholder}><User size={64} color="var(--primary-gold)" /></div>
          </div>
          <div className={styles.aboutContent}>
            <h2 className="font-serif">The Kundaliwaale&apos;s <em>Story</em></h2>
            <p className="font-sans">
              Born into a family of Vedic scholars in Varanasi, Kundaliwaale was introduced
              to Jyotish Shastra at the age of 12. Under the guidance of his grandfather, a
              respected Pandit, he studied the ancient texts — Brihat Parashara Hora Shastra,
              Jataka Parijata, and Phaladeepika — mastering the art of reading planetary
              positions and their influence on human life.
            </p>
            <p className="font-sans">
              After completing his formal education in Jyotish Acharya from Banaras Hindu
              University, he dedicated his life to helping individuals navigate life&apos;s
              challenges through the lens of Vedic astrology. What began as a small practice
              in Varanasi has grown into a trusted platform serving over 10 lakh clients
              across 15 countries.
            </p>
            <p className="font-sans">
              His unique approach combines deep scriptural knowledge with a practical,
              compassionate understanding of modern-day challenges — making astrology
              not just predictive, but genuinely actionable.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timeline}>
        <h2 className="font-serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-light)' }}>
          Our <em style={{ color: 'var(--primary-gold)', fontStyle: 'normal' }}>Journey</em>
        </h2>
        <div className={styles.timelineTrack}>
          {milestones.map((m, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineYear}>
                <span className="font-sans">{m.year}</span>
              </div>
              <div className={styles.timelineContent}>
                <h3 className="font-serif">{m.title}</h3>
                <p className="font-sans">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className={styles.certs}>
        <h2 className="font-serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
          <em>Certifications</em> & Awards
        </h2>
        <div className={styles.certsGrid}>
          {certifications.map((c, i) => (
            <div key={i} className={styles.certCard}>
              <span className={styles.certIcon}>{c.icon}</span>
              <h3 className="font-serif">{c.title}</h3>
              <p className="font-sans">{c.institution}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
