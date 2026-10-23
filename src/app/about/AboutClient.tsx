'use client';

import React from 'react';
import Image from 'next/image';
import styles from './about.module.css';
import { 
  GraduationCap, 
  Medal, 
  Sparkles, 
  Compass, 
  Scroll, 
  HeartHandshake, 
  ShieldCheck, 
  BookOpen, 
  Truck, 
  Award, 
  CheckCircle2, 
  Quote
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import CallToAction from '@/components/sections/CallToAction';

export default function AboutClient() {
  const { locale, dict } = useLanguage();

  const stats = [
    { value: '15+', label: locale === 'hi' ? 'वर्षों की पवित्र साधना' : 'Years of Sacred Practice' },
    { value: '10,000+', label: locale === 'hi' ? 'हस्तलिखित जन्म कुंडलियां' : 'Handwritten Kundlis Inscribed' },
    { value: '100%', label: locale === 'hi' ? 'शुद्ध पंचांग गणितीय गणना' : 'Manual Ephemeris Calculations' },
    { value: '4.9 ★', label: locale === 'hi' ? 'विश्वसनीय ग्राहक संतुष्टि' : 'Client Trust Rating' },
  ];

  const pillars = [
    {
      icon: <Compass size={26} />,
      title: locale === 'hi' ? 'सटीक खगोलीय गणना' : 'Ephemeris Mathematical Precision',
      desc: locale === 'hi' 
        ? 'लग्न, भाव चलित और नवमांश की सटीक गणना पारंपरिक पंचांग तालिकाओं से की जाती है।'
        : 'Exact mathematical calculation of Lagna, Bhava Chalit, and planetary degrees using classical Ephemeris tables.',
    },
    {
      icon: <Scroll size={26} />,
      title: locale === 'hi' ? '100% हस्तलिखित परंपरा' : '100% Handwritten Tradition',
      desc: locale === 'hi'
        ? 'प्रत्येक कुंडली को हमारे प्रमाणित ज्योतिषी पारंपरिक स्याही और उच्च गुणवत्ता वाले अभिलेखीय कागज पर हाथ से लिखते हैं।'
        : 'Every single chart is individually penned with sacred devotion on archival parchment meant to last generations.',
    },
    {
      icon: <HeartHandshake size={26} />,
      title: locale === 'hi' ? 'सच्चा मार्गदर्शन, शून्य अंधविश्वास' : 'Constructive Vedic Guidance',
      desc: locale === 'hi'
        ? 'बिना किसी भय या भ्रामक उपायों के, जीवन को सकारात्मक दिशा देने वाले व्यावहारिक और प्रामाणिक उपाय।'
        : 'Empowering remedies and honest cosmic clarity, completely free from fear-mongering and shortcuts.',
    },
    {
      icon: <ShieldCheck size={26} />,
      title: locale === 'hi' ? 'गोपनीयता और सुरक्षित डिलीवरी' : 'Confidential & Consecrated Delivery',
      desc: locale === 'hi'
        ? 'आपकी व्यक्तिगत जानकारी पूर्णतः सुरक्षित रहती है। प्रत्येक कुंडली पवित्र रूप से पैक होकर आपके द्वार तक पहुंचती है।'
        : 'Strict confidentiality of your birth details, consecrated packaging, and safe tracked delivery across India.',
    },
  ];

  const processIcons = [
    <Compass key="1" size={22} />,
    <Scroll key="2" size={22} />,
    <Sparkles key="3" size={22} />,
    <BookOpen key="4" size={22} />,
    <ShieldCheck key="5" size={22} />,
    <Truck key="6" size={22} />,
  ];

  const certIcons = [
    <GraduationCap key="1" size={26} />,
    <Award key="2" size={26} />,
    <Medal key="3" size={26} />,
    <CheckCircle2 key="4" size={26} />,
  ];

  const getMilestoneTranslation = (i: number) => {
    switch (i) {
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
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            <span>{locale === 'hi' ? 'पवित्र वैदिक परंपरा और विरासत' : 'Sacred Vedic Tradition & Heritage'}</span>
          </div>
          <h1 className="font-serif">
            {dict.about_page.hero.title_1} <em>{dict.about_page.hero.title_em}</em>
          </h1>
          <p className="font-sans">
            {dict.about_page.hero.desc}
          </p>

          {/* Stats Bar */}
          <div className={styles.statsContainer}>
            {stats.map((stat, idx) => (
              <React.Fragment key={idx}>
                <div className={styles.statItem}>
                  <div className={`${styles.statValue} font-serif`}>{stat.value}</div>
                  <div className={`${styles.statLabel} font-sans`}>{stat.label}</div>
                </div>
                {idx < stats.length - 1 && <div className={styles.statDivider} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionInner}>
          <div className={styles.missionLeft}>
            <div className={styles.missionBadge}>
              <Sparkles size={14} />
              <span>{dict.about_page.mission.title}</span>
            </div>
            <h2 className="font-serif">
              {locale === 'hi' 
                ? 'वैदिक परंपरा का पुनरुद्धार' 
                : 'Reviving the Sacred'} <em>{locale === 'hi' ? 'एवं शुद्ध ज्योतिष' : 'Manuscript Tradition'}</em>
            </h2>
            <div className={styles.missionAssurances}>
              <div className={styles.assuranceItem}>
                <CheckCircle2 size={18} className={styles.assuranceIcon} />
                <span className="font-sans">
                  {locale === 'hi' ? '100% व्यक्तिगत एवं हस्तलिखित गणना' : '100% Personally Calculated & Hand-Inscribed'}
                </span>
              </div>
              <div className={styles.assuranceItem}>
                <CheckCircle2 size={18} className={styles.assuranceIcon} />
                <span className="font-sans">
                  {locale === 'hi' ? 'शून्य स्वचालित सॉफ्टवेयर या कंप्यूटर पीडीएफ' : 'Zero Automated Generators or Generic PDFs'}
                </span>
              </div>
              <div className={styles.assuranceItem}>
                <CheckCircle2 size={18} className={styles.assuranceIcon} />
                <span className="font-sans">
                  {locale === 'hi' ? 'भय-मुक्त, सकारात्मक एवं प्रामाणिक वैदिक उपाय' : 'Practical Vedic Remedies & Life-Affirming Clarity'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.missionRight}>
            <div className={styles.missionQuoteBox}>
              <Quote size={28} className={styles.missionQuoteIcon} />
              <p className="font-sans">{dict.about_page.mission.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Vision Story */}
      <section className={styles.aboutStory}>
        <div className={styles.storyInner}>
          <div className={styles.storyImageCol}>
            <div className={styles.imagePlaceholder}>
              <Image 
                src="/images/acharya_portrait.png" 
                alt="Acharya Ji" 
                width={500}
                height={650}
                className={styles.portraitImg}
                priority
              />
            </div>
            <div className={styles.floatingSeal}>
              <div className={styles.sealIcon}><CheckCircle2 size={20} /></div>
              <div>
                <div className={styles.sealTitle}>{locale === 'hi' ? '100% हस्तलिखित गारंटी' : '100% Handwritten'}</div>
                <div className={styles.sealSubtitle}>{locale === 'hi' ? 'प्रामाणिक वैदिक पांडुलिपि' : 'Authentic Vedic Manuscript'}</div>
              </div>
            </div>
          </div>

          <div className={styles.storyContentBox}>
            <h2 className="font-serif">
              {dict.about_page.vision.title_1} <em>{dict.about_page.vision.title_em}</em>
            </h2>
            
            <p className="font-sans">{dict.about_page.vision.p1}</p>
            <p className="font-sans">{dict.about_page.vision.p2}</p>
            <p className="font-sans">{dict.about_page.vision.p3}</p>

            {/* Stylized Quote Callout */}
            <div className={styles.quoteCallout}>
              <Quote className={styles.quoteIcon} size={28} />
              <p className="font-serif">
                {locale === 'hi' 
                  ? 'ज्योतिष केवल गणना नहीं है; यह ब्रह्मांडीय ऊर्जा का एक पवित्र मानचित्र है जो हर व्यक्ति के जीवन को प्रकाशित करता है।'
                  : 'Astrology is not an algorithmic generator; it is the sacred resonance of the cosmos inscribed for a living soul.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Vedic Pillars */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.subTitle}>
            {locale === 'hi' ? 'हमारी विशेषता' : 'Why Dashakundli'}
          </div>
          <h2 className="font-serif">
            {locale === 'hi' ? 'हमारे चार' : 'Our Four'} <em>{locale === 'hi' ? 'पवित्र स्तंभ' : 'Sacred Pillars'}</em>
          </h2>
        </div>

        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, idx) => (
            <div key={idx} className={styles.pillarCard}>
              <div className={styles.pillarIcon}>{pillar.icon}</div>
              <h3 className="font-serif">{pillar.title}</h3>
              <p className="font-sans">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Step Crafting Journey */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.subTitle}>
            {locale === 'hi' ? 'चरणबद्ध विधि' : 'Step-by-Step Excellence'}
          </div>
          <h2 className="font-serif">
            {dict.about_page.process.title_1} <em>{dict.about_page.process.title_em}</em>
          </h2>
        </div>

        <div className={styles.processGrid}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const trans = getMilestoneTranslation(i);
            return (
              <div key={i} className={styles.processCard}>
                <div className={styles.processHeader}>
                  <div className={styles.stepNumber}>0{i + 1}</div>
                  <div className={styles.stepIcon}>{processIcons[i]}</div>
                </div>
                <h3 className="font-serif">{trans.title}</h3>
                <p className="font-sans">{trans.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certifications & Accreditations */}
      <section className={styles.certsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.subTitle}>
            {locale === 'hi' ? 'प्रामाणिकता' : 'Recognized Authority'}
          </div>
          <h2 className="font-serif">
            <em>{dict.about_page.certs.title_em}</em> {dict.about_page.certs.title_2}
          </h2>
        </div>

        <div className={styles.certsGrid}>
          {certIcons.map((icon, i) => {
            const trans = getCertTranslation(i);
            return (
              <div key={i} className={styles.certCard}>
                <div className={styles.certIconBadge}>{icon}</div>
                <h3 className="font-serif">{trans.title}</h3>
                <p className="font-sans">{trans.inst}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call To Action */}
      <CallToAction />
    </div>
  );
}
