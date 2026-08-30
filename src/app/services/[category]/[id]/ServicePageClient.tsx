'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Sparkles, Target, Gift, ScrollText } from 'lucide-react';
import BookingModal from './BookingModal';
import styles from './service.module.css';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ServicePageClient({
  category,
  tier,
}: {
  category: string;
  tier: { id: string; name: string; price: number; originalPrice?: number; description: string; popular?: boolean; features: string[] };
}) {
  const { dict } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getTierTranslation = () => {
    // We can assume category and tier.id are valid keys based on our structure
    try {
      // @ts-ignore
      return dict.services_data[category]?.[tier.id] || tier;
    } catch {
      return tier;
    }
  };
  const transTier = getTierTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroBgMap: Record<string, string> = {
    kundali: '/images/Astral BG/download (13).jpg',
    consultation: '/images/Astral BG/download (11).jpg',
    vastu: '/images/Astral BG/download (14).jpg',
  };

  return (
    <div className={`${styles.page} ambient-glow-wrapper`}>
      <div className="orb-primary"></div>
      <div className="orb-secondary"></div>

      {/* Cinematic Hero */}
      <section className={styles.cinematicHero}>
        <div className={`${styles.heroContent} relative-z`}>
          <div className={`${styles.heroGlassPanel} glass-card`}>
            <div className={`${styles.badge} font-sans`}>
              {tier.popular ? <><Sparkles size={14} /> {dict.service_page.most_popular}</> : <><Sparkles size={14} /> {dict.service_page.premium_service}</>}
            </div>
            <h1 className="font-serif">{transTier.name}</h1>
            <p className="font-sans">{transTier.description}</p>
            
            <div className={styles.heroCtaArea}>
              <div className={styles.priceContainer}>
                <span className={`${styles.price} font-serif`}>₹{tier.price}</span>
                {tier.originalPrice && <span className={`${styles.originalPrice} font-sans`}>₹{tier.originalPrice}</span>}
              </div>
              <Button variant="primary" onClick={() => setIsModalOpen(true)} className={styles.heroButton}>
                {dict.service_page.book_now} <ArrowRight size={20} />
              </Button>
            </div>
            <div className={styles.heroTrust}>
              <ShieldCheck size={18} className={styles.trustIcon} />
              <span className="font-sans">{dict.service_page.trust}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features */}
      <section className={`${styles.bentoSection} relative-z`}>
        <div className={styles.sectionHeader}>
          <span className={`${styles.sectionLabel} font-sans`}>{dict.service_page.everything}</span>
          <h2 className="font-serif">{dict.service_page.whats_included_1} <em>{dict.service_page.whats_included_em}</em></h2>
        </div>

        <div className={styles.bentoGrid}>
          {transTier.features.map((feature: string, i: number) => {
            // Make the first item span wider
            return (
              <div key={i} className={styles.bentoCard}>
                <div className={styles.bentoIcon}>
                  {i % 3 === 0 ? <ScrollText size={24} /> : i % 3 === 1 ? <Target size={24} /> : <Gift size={24} />}
                </div>
                <div className={styles.bentoText}>
                  <p className="font-sans">{feature}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Glowing Vertical Timeline */}
      <section className={`${styles.processSection} relative-z`}>
        <div className={styles.sectionHeader}>
          <h2 className="font-serif">{dict.service_page.journey_1} <em>{dict.service_page.journey_em}</em></h2>
          <p className="font-sans">{dict.service_page.journey_desc}</p>
        </div>

        <div className={styles.verticalTimeline}>
          <div className={styles.timelineLine}></div>
          
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>1</div>
            <div className={styles.timelineContent}>
              <h3 className="font-serif">{dict.service_page.timeline.t1_title}</h3>
              <p className="font-sans">
                {category === 'kundali' && dict.service_page.timeline.t1_kundali}
                {category === 'vastu' && dict.service_page.timeline.t1_vastu}
                {category === 'consultation' && dict.service_page.timeline.t1_consultation}
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>2</div>
            <div className={styles.timelineContent}>
              <h3 className="font-serif">{dict.service_page.timeline.t2_title}</h3>
              <p className="font-sans">
                {dict.service_page.timeline.t2_desc}
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}>3</div>
            <div className={styles.timelineContent}>
              <h3 className="font-serif">{dict.service_page.timeline.t3_title}</h3>
              <p className="font-sans">
                {dict.service_page.timeline.t3_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Booking Bar */}
      <div className={`${styles.stickyBar} ${isScrolled ? styles.stickyVisible : ''}`}>
        <div className={styles.stickyInner}>
          <div className={styles.stickyInfo}>
            <h4 className="font-serif">{transTier.name}</h4>
            <span className="font-serif">₹{tier.price}</span>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)} className={styles.stickyButton}>
            {dict.service_page.book_now}
          </Button>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={category}
        tier={tier.id}
        price={tier.price}
        serviceName={tier.name}
      />
    </div>
  );
}
