'use client';

import React from 'react';
import Image from 'next/image';
import styles from './about.module.css';
import { GraduationCap, FileText, Medal, Star, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const milestones = [
  { year: '01' },
  { year: '02' },
  { year: '03' },
  { year: '04' },
  { year: '05' },
  { year: '06' },
];

const certifications = [
  { icon: <GraduationCap size={24} /> },
  { icon: <FileText size={24} /> },
  { icon: <Medal size={24} /> },
  { icon: <Star size={24} /> },
];

export default function AboutClient() {
  const { dict } = useLanguage();

  const getMilestoneTranslation = (i: number) => {
    switch (i % 6) {
      case 0: return dict.about_page.process.steps.s1;
      case 1: return dict.about_page.process.steps.s2;
      case 2: return dict.about_page.process.steps.s3;
      case 3: return dict.about_page.process.steps.s4;
      case 4: return dict.about_page.process.steps.s5;
      case 5: return dict.about_page.process.steps.s6;
      default: return dict.about_page.process.steps.s1;
    }
  };

  const getCertTranslation = (i: number) => {
    switch (i) {
      case 0: return dict.about_page.certs.items.c1;
      case 1: return dict.about_page.certs.items.c2;
      case 2: return dict.about_page.certs.items.c3;
      case 3: return dict.about_page.certs.items.c4;
      default: return dict.about_page.certs.items.c1;
    }
  };

  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className="font-serif">{dict.about_page.hero.title_1} <em>{dict.about_page.hero.title_em}</em></h1>
          <p className="font-sans">
            {dict.about_page.hero.desc}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={`${styles.mission} relative-z`}>
        <div className={`${styles.missionInner} glass-card`}>
          <div className={styles.missionIcon}><Sparkles size={40} color="var(--color-gold)" /></div>
          <h2 className="font-serif">{dict.about_page.mission.title}</h2>
          <p className="font-sans">
            {dict.about_page.mission.desc}
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
              <h2 className="font-serif">{dict.about_page.vision.title_1} <em>{dict.about_page.vision.title_em}</em></h2>
              <p className="font-sans">{dict.about_page.vision.p1}</p>
              <p className="font-sans">{dict.about_page.vision.p2}</p>
              <p className="font-sans">{dict.about_page.vision.p3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Process */}
      <section className={styles.timeline}>
        <h2 className="font-serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>
          {dict.about_page.process.title_1} <em style={{ color: 'var(--color-gold)', fontStyle: 'normal' }}>{dict.about_page.process.title_em}</em>
        </h2>
        <div className={styles.timelineMarquee}>
          <div className={styles.timelineTrack}>
            {[...milestones, ...milestones].map((m, i) => {
              const trans = getMilestoneTranslation(i);
              return (
                <div key={i} className={styles.timelineStepHorizontal}>
                  <div className={styles.timelineNodeHorizontal}>{m.year}</div>
                  <div className={styles.timelineContentHorizontal}>
                    <h3 className="font-serif">{trans.title}</h3>
                    <p className="font-sans">{trans.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className={styles.certs}>
        <h2 className="font-serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
          <em>{dict.about_page.certs.title_em}</em> {dict.about_page.certs.title_2}
        </h2>
        <div className={styles.certsGrid}>
          {certifications.map((c, i) => {
            const trans = getCertTranslation(i);
            return (
              <div key={i} className={`${styles.certCard} glass-card`}>
                <span className={styles.certIcon}>{c.icon}</span>
                <h3 className="font-serif">{trans.title}</h3>
                <p className="font-sans">{trans.inst}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
