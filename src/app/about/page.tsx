import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Discover Kundaliwaale — bringing the finest authentic, handwritten Vedic Kundlis and genuine astrology guidance directly to your doorstep.',
};

const milestones = [
  { year: '01', title: 'Birth Chart Computation', description: 'Accurate mathematical calculation of Lagna, planetary degrees, and houses using authentic Ephemeris tables.' },
  { year: '02', title: 'Handwritten Inscription', description: 'Every chart and planetary position is personally penned with sacred care into a traditional manuscript format.' },
  { year: '03', title: 'Dasha & Dosha Analysis', description: 'Detailed evaluation of Vimshottari Dasha cycles, planetary combinations, strengths, and practical remedies.' },
  { year: '04', title: 'Vastu & Guidance Synthesis', description: 'Holistic synthesis connecting planetary influences with your home energy and life path.' },
  { year: '05', title: 'Sacred Packaging', description: 'Carefully consecrated and safely packed in premium archival materials to preserve your chart for decades.' },
  { year: '06', title: 'Doorstep Delivery', description: 'Dispatched directly to your address across India with real-time courier tracking updates.' },
];

import { GraduationCap, FileText, Medal, Star, User, Sparkles } from 'lucide-react';

const certifications = [
  { icon: <GraduationCap size={24} />, title: 'Jyotish Acharya', institution: 'Banaras Hindu University' },
  { icon: <FileText size={24} />, title: 'Vastu Shastra Expert', institution: 'Indian Council of Astrological Sciences' },
  { icon: <Medal size={24} />, title: 'Classical Jyotish Authority', institution: 'All India Federation of Astrologers' },
  { icon: <Star size={24} />, title: '100% Handcrafted Assurance', institution: 'Authentic Vedic Manuscript Standards' },
];

export default function AboutPage() {
  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className="font-serif">About <em>Kundaliwaale</em></h1>
          <p className="font-sans">
            Now you can have the best possible Handwritten Kundlis crafted with Vedic precision and delivered directly to your home.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={`${styles.mission} relative-z`}>
        <div className={`${styles.missionInner} glass-card`}>
          <div className={styles.missionIcon}><Sparkles size={40} color="var(--color-gold)" /></div>
          <h2 className="font-serif">Our Mission</h2>
          <p className="font-sans">
            To revive the sacred tradition of handwritten Janam Kundlis and deliver authentic Vedic wisdom directly to your home. We believe everyone deserves genuine, personally calculated astrological insights rather than automated, computer-generated PDFs. Every chart we pen and every consultation we offer is guided by this commitment to authenticity and clarity.
          </p>
        </div>
      </section>

      {/* About the Kundaliwaale */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutImageCol}>
            <div className={styles.imagePlaceholder}>
              <img 
                src="/images/acharya_portrait.png" 
                alt="Acharya Ji" 
                className={styles.portraitImg}
              />
            </div>
          </div>
          <div className={`${styles.manuscriptBox} glass-card`}>
            <div className={styles.aboutContent}>
              <h2 className="font-serif">The Kundaliwaale <em>Vision</em></h2>
              <p className="font-sans">
                In an era dominated by instant algorithmic generators and generic printouts, the sacred depth of Vedic Jyotish was losing its human touch. Kundaliwaale was started to bring back what truly matters: authentic, personalized, handwritten Kundlis crafted with devotion and mathematical precision.
              </p>
              <p className="font-sans">
                Rooted in classical texts including Brihat Parashara Hora Shastra, Jataka Parijata, and Phaladeepika, our certified Jyotish Acharyas compute every planetary position, house cusp, and Dasha period by hand. Each chart is a unique spiritual manuscript prepared exclusively for you.
              </p>
              <p className="font-sans">
                We believe in genuine clarity over fear, and craftsmanship over shortcuts. When your Kundli arrives at your doorstep, you hold a sacred guide created to illuminate your life&apos;s journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Process */}
      <section className={styles.timeline}>
        <h2 className="font-serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>
          The <em style={{ color: 'var(--color-gold)', fontStyle: 'normal' }}>Crafting & Delivery Process</em>
        </h2>
        <div className={styles.timelineMarquee}>
          <div className={styles.timelineTrack}>
            {[...milestones, ...milestones].map((m, i) => (
              <div key={i} className={styles.timelineStepHorizontal}>
                <div className={styles.timelineNodeHorizontal}>{m.year}</div>
                <div className={styles.timelineContentHorizontal}>
                  <h3 className="font-serif">{m.title}</h3>
                  <p className="font-sans">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className={styles.certs}>
        <h2 className="font-serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
          <em>Certifications</em> & Awards
        </h2>
        <div className={styles.certsGrid}>
          {certifications.map((c, i) => (
            <div key={i} className={`${styles.certCard} glass-card`}>
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
